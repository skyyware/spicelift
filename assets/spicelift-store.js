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

  document.querySelectorAll('[data-finder]').forEach((finder) => {
    const choices = Array.from(finder.querySelectorAll('[data-finder-target]'));
    const results = Array.from(finder.querySelectorAll('[data-finder-result]'));
    choices.forEach((choice) => {
      choice.addEventListener('click', () => {
        const target = choice.dataset.finderTarget;
        choices.forEach((item) => {
          const active = item === choice;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        results.forEach((result) => {
          const active = result.dataset.finderResult === target;
          result.hidden = !active;
          result.classList.toggle('is-active', active);
        });
      });
    });
  });

  document.querySelectorAll('[data-gift-finder]').forEach((finder) => {
    const choices = Array.from(finder.querySelectorAll('[data-gift-target]'));
    const results = Array.from(finder.querySelectorAll('[data-gift-result]'));
    choices.forEach((choice) => {
      choice.addEventListener('click', () => {
        const target = choice.dataset.giftTarget;
        choices.forEach((item) => {
          const active = item === choice;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        results.forEach((result) => {
          const active = result.dataset.giftResult === target;
          result.hidden = !active;
          result.classList.toggle('is-active', active);
        });
      });
    });
  });

  document.querySelectorAll('[data-bundle-add]').forEach((button) => {
    button.addEventListener('click', async () => {
      const note = button.parentElement.querySelector('[data-bundle-note]');
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = 'Wird hinzugefügt ...';

      try {
        const items = JSON.parse(button.dataset.items || '[]');
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ items }),
        });

        if (!response.ok) throw new Error('Cart add failed');

        await updateCartCount();

        button.textContent = 'Im Warenkorb';
        if (note) note.textContent = 'Rezeptkorb hinzugefügt. Du wirst zum Warenkorb weitergeleitet.';
        window.setTimeout(() => {
          window.location.href = '/cart';
        }, 650);
      } catch (error) {
        button.disabled = false;
        button.textContent = originalText;
        if (note) note.textContent = 'Der Rezeptkorb konnte nicht hinzugefügt werden. Bitte Produkte einzeln wählen.';
      }
    });
  });

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-quick-add-form]');
    if (!form) return;

    event.preventDefault();

    const button = form.querySelector('[data-quick-add-button]');
    const status = form.querySelector('[data-quick-add-status]');
    const initialText = button ? button.textContent : '';

    if (button) {
      button.disabled = true;
      button.classList.remove('is-added');
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

      if (button) {
        button.classList.add('is-added');
        button.textContent = 'Hinzugefügt';
      }
      if (status) status.textContent = 'Zum Warenkorb hinzugefügt.';

      window.setTimeout(() => {
        if (button) {
          button.disabled = false;
          button.textContent = 'Im Warenkorb';
        }
        if (status) status.textContent = 'Produkt ist im Warenkorb.';
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
