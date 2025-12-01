# 🛡️ ResolvIT - Backend API

Sistema de gestión de reclamos desarrollado con **NestJS** y **MongoDB**. Este backend provee la lógica de negocio, autenticación, gestión de archivos y análisis de datos para la plataforma ResolvIT.

## 📋 Características Principales

- **Arquitectura Modular:** Organizado por dominios (Reclamos, Usuarios, Clientes, etc.).
- **Autenticación Segura:** JWT (JSON Web Tokens) con hashing de contraseñas (Bcrypt).
- **RBAC (Role-Based Access Control):** Protección de rutas mediante Guardianes y Decoradores de Roles.
- **Base de Datos:** Conexión a MongoDB mediante Mongoose (ODM) y Docker.
- **Gestión de Archivos:** Carga local de evidencias con Multer.
- **Analytics & Reportes:** Endpoints optimizados con Aggregation Framework de Mongo y exportación a CSV.
- **Seeding:** Script automático para poblar la base de datos con datos de prueba masivos.

## 🛠️ Tecnologías

- [NestJS](https://nestjs.com/) - Framework de Node.js.
- [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL.
- [Mongoose](https://mongoosejs.com/) - Modelado de objetos.
- [Passport](http://www.passportjs.org/) - Autenticación.
- [Multer](https://github.com/expressjs/multer) - Carga de archivos.

## 🚀 Instalación y Configuración

1.  **Clonar el repositorio e instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Variables de Entorno:**
    Crea un archivo `.env` en la raíz basado en el siguiente ejemplo:
    ```env
    DB_HOST=localhost
    DB_PORT=27017
    DB_USERNAME=root
    DB_PASSWORD=example
    DB_DATABASE=gestor_reclamos
    JWT_SECRET=clave_secreta_super_segura
    ```

3.  **Levantar la Base de Datos (Docker):**
    ```bash
    docker-compose up -d
    ```

4.  **Crear carpeta de Cargas:**
    Asegúrate de que exista la carpeta `uploads` en la raíz del proyecto para guardar las evidencias e imagenes.
    ```bash
    mkdir uploads
    ```

## ▶️ Ejecución

### Modo Desarrollo
Para poblar la base de datos utilizaremos la seed
```bash
npm run seed
npm run start:dev