#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUT = ASSETS / "spicelift-social-share.jpg"
FONT_REGULAR = "/System/Library/Fonts/HelveticaNeue.ttc"
FONT_BRAND = "/System/Library/Fonts/Avenir Next.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize((int(image.width * scale), int(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


canvas = Image.new("RGB", (1200, 630), "#f4f1ea")
hero = cover(Image.open(ASSETS / "spice-hero-premium.jpg").convert("RGB"), (1200, 630))
hero = hero.filter(ImageFilter.GaussianBlur(radius=0.4))
canvas.paste(hero, (0, 0))

overlay = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)
draw.rectangle((0, 0, 760, 630), fill=(17, 16, 14, 205))
for x in range(760, 950):
    alpha = int(205 * (1 - (x - 760) / 190))
    draw.line((x, 0, x, 630), fill=(17, 16, 14, alpha))
canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)
draw = ImageDraw.Draw(canvas)

brand = font(FONT_BRAND, 52)
headline = font(FONT_BRAND, 58)
copy = font(FONT_REGULAR, 28)
small = font(FONT_REGULAR, 21)

draw.rounded_rectangle((74, 72, 130, 128), radius=18, fill="#f0ead6")
draw.text((92, 78), "S", font=font(FONT_BRAND, 38), fill="#191816")
draw.text((150, 78), "SPICELIFT", font=brand, fill="#f7f1de")

draw.text((78, 190), "Bio-Gewürze,", font=headline, fill="#ffffff")
draw.text((78, 252), "die Gerichte", font=headline, fill="#ffffff")
draw.text((78, 314), "klarer machen.", font=headline, fill="#ffffff")

draw.text((82, 415), "Premium Bio-Gewürze, kuratierte Sets,", font=copy, fill="#e8dcc9")
draw.text((82, 452), "Rezepte und Nachfüllpacks für jeden Tag.", font=copy, fill="#e8dcc9")

chips = ["Bio", "Nachfüllpacks", "Recipe-to-Cart", "B2B-Geschenke"]
x = 82
for chip in chips:
    text_w = draw.textbbox((0, 0), chip, font=small)[2]
    draw.rounded_rectangle((x, 532, x + text_w + 34, 574), radius=21, fill=(247, 241, 222, 232))
    draw.text((x + 17, 539), chip, font=small, fill="#191816")
    x += text_w + 48

canvas.convert("RGB").save(OUT, "JPEG", quality=92, optimize=True, progressive=True)
print(OUT)
