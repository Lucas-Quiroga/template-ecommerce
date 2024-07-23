# Plantilla E-commerce con Astro

Esta plantilla de e-commerce está construida con Astro, utilizando React para los componentes y Tailwind CSS junto con SHADCN para el estilo. Es ideal para empezar a construir tu tienda en línea de manera rápida y sencilla.

Utiliza Firebase para la base de datos, por lo que es necesario configurarla según tus necesidades. Te proporcionamos una base preconfigurada que puedes ajustar según tus productos.

## Imagen previa 👁

![app](https://res.cloudinary.com/dncmrwppr/image/upload/v1721185820/131shots_so_cmzoqs.png)

## Despliegue 📦

- [DEMO](https://template-ecommerce-rosy.vercel.app/) - Website

## 🚀 Cómo empezar

Para comenzar a utilizar esta plantilla, sigue estos pasos:

1. **Clonar el repositorio**

```sh
git clone https://github.com/Lucas-Quiroga/template-ecommerce.git
```

2. **Ingresar al proyecto**

```text
cd template-ecommerce
```

3. **Instalar las dependencias**

   Asegúrate de tener Node.js instalado en tu sistema. Luego, ejecuta el siguiente comando en tu terminal para instalar las dependencias necesarias:

```sh
 npm install
```

## 🛠️ Configuración

Para que la plantilla funcione correctamente, sigue estos pasos:

1. **Inicializar un proyecto web en firebase**

Visita [Firebase](https://firebase.google.com) para crear tu proyecto.

2. **Crear archivo .env en el IDE**

Completa la siguiente información extraída del SDK del cliente de Firebase. Estas credenciales serán utilizadas por el lado del cliente de tu aplicación. Tambien podes encontrarlas en la consola de Firebase en Project settings > General. Desplázate hacia abajo hasta la sección Your apps y haz clic en el icono de Web app.

```text
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=
```

Agrega una clave secreta para el administrador en el mismo archivo .env:

```text
SECRET_KEY="tu_clave_secreta"
```

3. **Inicializar firestore database**

En la consola de Firebase, inicializa una base de datos en Firestore. Configura las reglas de seguridad:

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. **En el archivo .env del IDE**

Completa la siguiente información extraída de las credenciales del proyecto: Estas credenciales serán utilizadas por el lado del servidor de tu aplicación. Puedes generarlas en la consola de Firebase en Project settings > Service accounts > Firebase Admin SDK > Generate new private key.

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

5. **Configurar categorías y almacenamiento local**

En src/constants, configura las categorías de tus productos:

```text
export const CATEGORY_SELECT = [
// Tus categorías aquí
];
```

Define el nombre para el carrito en almacenamiento local:

```text
export const LOCAL_STORAGE_KEY = 'nombre_del_carrito';
```

5. **Configurar datos de la tienda**

```text
export const PHONE_NUMBER = 'tu_numero_de_celular';

export const DATA_TIENDA = {
 header: {
     title: 'nombre_de_la_tienda',
  },
  faqs: [
    // Preguntas frecuentes aquí
  ],
};
```

6. **Crear administrador**

En la consola de Firebase, inicializa la autenticación en "Authentication". Agrega un proveedor de correo electrónico y contraseña. Luego, visita:

```text
http://localhost:4321/admin
```
para registrar y loguear al administrador.

7. **Carga de productos**

Inicializa el "Storage" en Firebase para manejar archivos. Configura las reglas de seguridad:

```text
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
Esto permitirá que el administrador registrado pueda gestionar los archivos en el storage.

## 🚀 Inicializar el proyecto en modo desarrollo

Para iniciar el servidor de desarrollo:

```sh
 npm run dev
```

Esto iniciará el servidor de desarrollo en localhost:4321. Puedes acceder a tu sitio en el navegador a través de esta dirección.

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
├── .env                   # Archivos de variables de entorno
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias y scripts del proyecto
└── tsconfig.json          # Configuración de TypeScript
```

## 🛒 Producción

Para construir tu sitio para producción:

```sh
 npm run build
```

Esto generará tu sitio en la carpeta ./dist/, listo para ser desplegado.

¡Listo! Ahora tienes todo lo necesario para comenzar a trabajar con tu plantilla de e-commerce usando Astro.

## Autor ✒️

- **Lucas Quiroga** - _Trabajo inicial_ - [Lucas Quiroga](https://github.com/Lucas-Quiroga)

## Licencia 📄

Este proyecto tiene licencia © LUCAS QUIROGA 2024, casi todos los derechos reservados.
