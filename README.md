# Plantilla E-commerce con Astro

Esta plantilla de e-commerce está construida con Astro, aprovechando tecnologías como React para los componentes y Tailwind CSS junto con SHADCN para componentes estilizados. Es perfecta para comenzar a construir tu tienda en línea con facilidad y rapidez.

Es importante recordar que esta plantilla utiliza Firebase para la base de datos. Debes configurarla según tus preferencias. Te proporcionamos una base preconfigurada que puedes editar según tus productos.

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

```text
https://firebase.google.com
```

2. **En el IDE crear un archivo .env.development**

Completa la siguiente información extraída del SDK del cliente de Firebase. Estas credenciales serán utilizadas por el lado del cliente de tu aplicación. Tambien podes encontrarlas en la consola de Firebase en Project settings > General. Desplázate hacia abajo hasta la sección Your apps y haz clic en el icono de Web app.

```text
PUBLIC_API_KEY=
PUBLIC_AUTH_DOMAIN=
PUBLIC_PROJECT_ID=
PUBLIC_STORAGE_BUCKET=
PUBLIC_MESSAGING_SENDER_ID=
PUBLIC_APP_ID=
PUBLIC_MEASUREMENT_ID=
```

Tambien para registrar a tu administrador, agrega una clave secreta en el mismo archivo .env.development:

```text
PUBLIC_SECRET_KEY="tu_clave_secreta"
```

3. **Inicializar firestore database**

En la consola de firebase, inicializar una base de datos en "firestore database".

4. **En el IDE crear un archivo .env**

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

5. **Configurar número de teléfono y datos de la tienda**

```text
export const PHONE_NUMBER=tu_numero_de_celular

y en DATA_TIENDA completar los campos de faqs (preguntas frecuentes) y title (nombre de la tienda)
```

6. **Crear administrador**

En la consola de firebase, inicializar la authenticación en "Authentication". Una vez adentro, en la sección de "Proveedores de acceso" agregar un proveedor nativo, en éste caso usamos correo electronico/contraseña, y habilitamos y guardamos.

Ahora en el navegador En la siguiente URL encontraras dos botones, uno para poder registrar al administrador y otro para poder logear al mismo.

```text
http://localhost:4321/admin
```

7. **Carga de productos**

Para la creacion de los productos necesitaremos en la consola de firebase inicializar el "Storage" para almacenar y recuperar archivos generados por el usuario.

Si iniciaste el proyecto en modo produccion, para que no te lance error al subir las imagenes, tenes que ingresar dentro de storage en la consola de firebase, ir a reglas y seguramente lo tengas asi:

```text
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=} {
      allow read, write: if false;
    }
  }
}
```
y lo tenes que cambiar al siguiente:

```text
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=} {
      allow read, write: if request.auth != null;
    }
  }
```
Esto permitira que cualquier usuario registrado, en éste caso sería el administrador ya que es el unico que posee el ingreso gracias a la clave secreta, pueda hacer cambios y agregar imagenes en el storage. Esto se puede modificar en base a las preferencias. El cambio tardara un poco segun la administracion de firebase.

## 🚀 Inicializar el proyecto en modo desarrollo

Para iniciar el servidor de desarrollo y trabajar en tu proyecto localmente, ejecuta:

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
├── .env, .env.development # Archivos de variables de entorno
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias y scripts del proyecto
└── tsconfig.json          # Configuración de TypeScript
```

## 🛒 Producción

Cuando estés listo para construir tu sitio para producción, ejecuta:

```sh
 npm run build
```

Esto generará tu sitio en la carpeta ./dist/, listo para ser desplegado.

¡Listo! Ahora tienes todo lo necesario para comenzar a trabajar con tu plantilla de e-commerce usando Astro.

## Autor ✒️

- **Lucas Quiroga** - _Trabajo inicial_ - [Lucas Quiroga](https://github.com/Lucas-Quiroga)

## Licencia 📄

Este proyecto tiene licencia © LUCAS QUIROGA 2024, casi todos los derechos reservados.
