# /img — Imágenes de Ancla & Go

Coloca en esta carpeta las imágenes reales del sitio.

## Imágenes clave

| Archivo                  | Uso                                        | Tamaño recomendado |
| ------------------------ | ------------------------------------------ | ------------------ |
| `og-image.jpg`           | Open Graph (compartir en redes sociales)   | 1200 × 630 px      |
| `hero-bg.jpg`            | Fondo sección Hero (opcional override CSS) | 1920 × 1080 px     |
| `yacht-azimut-50.jpg`    | Foto flota — Azimut 50                     | 640 × 440 px       |
| `yacht-sunseeker-60.jpg` | Foto flota — Sunseeker 60                  | 640 × 440 px       |
| `yacht-searay-38.jpg`    | Foto flota — Sea Ray 38 Pacha              | 640 × 440 px       |
| `yacht-malibu-24.jpg`    | Foto flota — Malibu 24 Explorer            | 640 × 440 px       |
| `yacht-marquis-65.jpg`   | Foto flota — Marquis 65 Oceanus            | 640 × 440 px       |
| `yacht-fairline-45.jpg`  | Foto flota — Fairline Targa 45             | 640 × 440 px       |
| `dest-isla-mujeres.jpg`  | Destino — Isla Mujeres                     | 800 × 600 px       |
| `dest-zona-hotelera.jpg` | Destino — Zona Hotelera                    | 600 × 500 px       |
| `dest-nichupte.jpg`      | Destino — Laguna Nichupté                  | 600 × 500 px       |
| `dest-playa-norte.jpg`   | Destino — Playa Norte                      | 600 × 500 px       |
| `dest-punta-sam.jpg`     | Destino — Punta Sam                        | 600 × 500 px       |
| `logo.svg`               | Logo vectorial para navbar/footer          | SVG                |
| `favicon.ico`            | Favicon del sitio                          | 32 × 32 px         |

## Cómo usar imágenes en el CSS

Para sobreescribir los fondos degradados placeholder con fotos reales,
añade esto al final de `css/styles.css`:

```css
.hero {
  background-image: url("../img/hero-bg.jpg");
}

/* Yates */
#fleet-grid .yacht-card:nth-child(1) .yacht-card__img-bg {
  background-image: url("../img/yacht-azimut-50.jpg");
  background-size: cover;
}

/* Destinos */
.destination-card__bg--1 {
  background-image: url("../img/dest-isla-mujeres.jpg");
  background-size: cover;
}
.destination-card__bg--2 {
  background-image: url("../img/dest-zona-hotelera.jpg");
  background-size: cover;
}
.destination-card__bg--3 {
  background-image: url("../img/dest-nichupte.jpg");
  background-size: cover;
}
.destination-card__bg--4 {
  background-image: url("../img/dest-playa-norte.jpg");
  background-size: cover;
}
.destination-card__bg--5 {
  background-image: url("../img/dest-punta-sam.jpg");
  background-size: cover;
}
```

O asigna la propiedad `image` en cada objeto del array `yachts[]` dentro de `js/main.js`
y usa `<img>` con `src` y `alt` para SEO óptimo.
