# Doble Tracción - Sitio Web

Sitio web corporativo para Doble Tracción, especialistas en vehículos 4x4.

## 🚀 Características

- Diseño moderno y responsive
- Carrusel automático de vehículos destacados
- Testimonios dinámicos
- Sección de equipo
- Optimizado para SEO
- Transiciones y animaciones suaves

## 🛠️ Tecnologías

- [Astro](https://astro.build/) - Framework web moderno
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- View Transitions API - Para transiciones suaves entre páginas

## 📦 Estructura del Proyecto

```
/
├── src/
│   ├── components/
│   │   ├── FeaturedVehicles.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Team.astro
│   │   └── Testimonials.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## 🚀 Inicio Rápido

1. **Instalación de dependencias**

   ```bash
   npm install
   ```

2. **Desarrollo local**

   ```bash
   npm run dev
   ```

   El sitio estará disponible en `http://localhost:4321`

3. **Construcción para producción**

   ```bash
   npm run build
   ```

4. **Vista previa de la construcción**
   ```bash
   npm run preview
   ```

## 🎯 Características Principales

### Carrusel de Vehículos

- Desplazamiento automático
- Responsive en todos los dispositivos
- Transiciones suaves
- Duplicación infinita de slides

### Testimonios Dinámicos

- Rotación automática
- Diseño moderno
- Transiciones fluidas

### Sección de Equipo

- Grid responsive
- Imágenes optimizadas
- Diseño profesional

## 🎨 Personalización

El sitio utiliza Tailwind CSS para los estilos. Los principales colores y estilos se pueden modificar en:

- `tailwind.config.mjs` - Configuración general de Tailwind
- `src/layouts/Layout.astro` - Estilos globales y variables CSS

## 📱 Responsive Design

El sitio está optimizado para:

- Móviles (< 768px)
- Tablets (768px - 1024px)
- Escritorio (> 1024px)

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el sitio para producción
- `npm run preview` - Vista previa de la construcción
- `npm run astro` - Ejecuta comandos de Astro CLI

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## ✨ Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
