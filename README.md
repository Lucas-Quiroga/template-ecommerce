# Plantilla E-commerce con Astro

Esta plantilla de e-commerce está construida con Astro, aprovechando tecnologías como React para los componentes y Tailwind CSS para el estilo. Es perfecta para comenzar a construir tu tienda en línea con facilidad y rapidez.

## Imagen previa 👁

![app](https://res.cloudinary.com/dncmrwppr/image/upload/v1721185820/131shots_so_cmzoqs.png)

## Despliegue 📦

- [DEMO](https://template-ecommerce-rosy.vercel.app/) - Website

## 🚀 Cómo empezar

Para comenzar a utilizar esta plantilla, sigue estos pasos:

1. **Instala las dependencias**

   Asegúrate de tener Node.js instalado en tu sistema. Luego, ejecuta el siguiente comando en tu terminal para instalar las dependencias necesarias:

```sh
 npm install
```

2. **Desarrollo local**

   Para iniciar el servidor de desarrollo y trabajar en tu proyecto localmente, ejecuta:

```sh
 npm run dev
```

Esto iniciará el servidor de desarrollo en localhost:4321. Puedes acceder a tu sitio en el navegador a través de esta dirección.

3. **Construye tu sitio**

   Cuando estés listo para construir tu sitio para producción, ejecuta:

```sh
 npm run build
```

Esto generará tu sitio en la carpeta ./dist/, listo para ser desplegado.

## 📁 Estructura del proyecto

La estructura de carpetas de este proyecto es la siguiente:

```text
/
├── .astro/                # Configuraciones de Astro
├── public/                # Archivos estáticos (imágenes, etc.)
├── src/
│   ├── components/        # Componentes de Astro y React
│   ├── constants/         # Constantes del proyecto
│   ├── firebase/          # Configuración y utilidades de Firebase
│   ├── layouts/           # Layouts de Astro
│   ├── pages/             # Páginas de Astro
│   ├── styles/            # Archivos de estilo Tailwind CSS
│   ├── types/             # Tipos TypeScript
│   ├── lib/               # Bibliotecas y utilidades compartidas
│   ├── schema/            # Esquemas de validación (por ejemplo, Joi, Yup)
│   ├── scripts/           # Scripts para tareas de desarrollo y construcción
│   ├── services/          # Servicios para manejar lógica de negocio y API
│   ├── middleware/        # Middleware para manejar lógica entre capas
│   └── cartStore/         # Estado y lógica del carrito de compras
├── .env, .env.development # Archivos de variables de entorno
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias y scripts del proyecto
└── tsconfig.json          # Configuración de TypeScript
```

## 🛠️ Configuración

Para que la plantilla funcione correctamente, sigue estos pasos:

1. **Crear archivo .env**

Completa la siguiente información extraída del servidor de Firebase:

```text
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_CERT_URL=
FIREBASE_CLIENT_CERT_URL=
```

2. **Crear archivo .env.development**

Completa la siguiente información extraída del cliente de Firebase:

```text
PUBLIC_API_KEY=
PUBLIC_AUTH_DOMAIN=
PUBLIC_PROJECT_ID=
PUBLIC_STORAGE_BUCKET=
PUBLIC_MESSAGING_SENDER_ID=
PUBLIC_APP_ID=
PUBLIC_MEASUREMENT_ID=
```

Para registrar a tu administrador, agrega una clave secreta en el mismo archivo .env.development:

```text
PUBLIC_SECRET_KEY=
```

3. **Configurar categorías y almacenamiento local**

En la carpeta src/constants, configura las categorías que tendrán tus productos:

```text
export const CATEGORY_SELECT = [
// Tus categorías aquí
];
```

Define el nombre para guardar el carrito en el almacenamiento local:

```text
export const LOCAL_STORAGE_KEY = 'nombre_del_carrito';
```

4. **Configurar número de teléfono y datos de la tienda**

```text
export const PHONE_NUMBER=tu_numero_de_celular

y en DATA_TIENDA completar los campos de faqs (preguntas frecuentes) y title (nombre de la tienda)
```

¡Listo! Ahora tienes todo lo necesario para comenzar a trabajar con tu plantilla de e-commerce usando Astro.

## Autor ✒️

- **Lucas Quiroga** - _Trabajo inicial_ - [Lucas Quiroga](https://github.com/Lucas-Quiroga)

## Licencia 📄

Este proyecto tiene licencia © LUCAS QUIROGA 2024, casi todos los derechos reservados.
