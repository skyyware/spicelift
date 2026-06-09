(() => {
  const updateCartCount = async () => {
    const response = await fetch('/cart.js', {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return;

    const cart = await response.json();
    document.querySelectorAll('.sf-cart__count').forEach((target) => {
      target.textContent = cart.item_count;
    });
  };

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-quick-add-form]');
    if (!form) return;

    event.preventDefault();

    const button = form.querySelector('[data-quick-add-button]');
    const status = form.querySelector('[data-quick-add-status]');
    const initialText = button ? button.textContent : '';

    if (button) {
      button.disabled = true;
      button.textContent = 'Wird hinzugefügt';
    }

    if (status) status.textContent = '';

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error('Quick add failed');

      await updateCartCount();

      if (button) button.textContent = 'Im Warenkorb';
      if (status) status.textContent = 'Zum Warenkorb hinzugefügt.';

      window.setTimeout(() => {
        if (button) {
          button.disabled = false;
          button.textContent = initialText;
        }
        if (status) status.textContent = '';
      }, 1600);
    } catch (error) {
      if (button) {
        button.disabled = false;
        button.textContent = initialText;
      }
      if (status) status.textContent = 'Bitte Produktseite öffnen und dort hinzufügen.';
    }
  });
})();
