# Usuarios API

API REST para gestión de usuarios con Node.js, Express y MySQL, desplegada con Docker.

## 📋 Descripción

Aplicación backend que proporciona endpoints CRUD para administrar usuarios e información de sus perfiles profesionales. Incluye campos como nombre, edad, cargo, país, experiencia y tecnologías que maneja.

---

## 🏗️ Estructura del Proyecto

```
Usuarios/
├── docker-compose.yml       # Orquestación de contenedores
├── Dockerfile               # Imagen multistage del backend
├── Readme.md                # Este archivo
├── server/                  # Backend Node.js/Express
│   ├── app.js               # Punto de entrada
│   ├── package.json         # Dependencias
│   ├── config/
│   │   └── index.js         # Configuración (env variables)
│   ├── libs/
│   │   ├── database.js      # Pool de conexión MySQL
│   │   └── models/
│   │       └── users.model.js # Modelo de usuarios con operaciones CRUD
│   ├── routers/
│   │   └── users.router.js  # Endpoints de usuarios
│   ├── middlewares/         # Middlewares personalizados
│   └── services/            # Lógica de negocio
├── client/                  # Frontend (por desarrollar)
└── .env                     # Variables de entorno
```

---

## 🛠️ Tecnologías

- **Backend**: Node.js, Express.js
- **Base de datos**: MySQL 8.0
- **ORM/Queries**: mysql2/promise
- **Desarrollo**: Nodemon (hot-reload)
- **Containerización**: Docker, Docker Compose
- **Gestor DB**: phpMyAdmin

---

## 📦 Requisitos

- Docker
- Docker Compose

---

## 🚀 Instalación y Ejecución

### 1. Clonar o descargar el repositorio
```bash
git clone <[repository-url](https://github.com/DavidPerezNuma/Users.git)>
cd Usuarios
```

### 2. Levantar contenedores
```bash
docker-compose up --build
```

**Servicios disponibles:**
- **API Backend**: `http://localhost:3000`
- **phpMyAdmin**: `http://localhost:8081`
  - Usuario: `root`
  - Contraseña: `Admin123`
- **MySQL**: `localhost:3306`

---

## 📡 Endpoints de API

### Base URL
```
http://localhost:3000/api/usuarios
```

### 1. Obtener todos los usuarios
```http
GET /api/usuarios
```
**Respuesta (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "edad": 28,
      "cargo": "Developer",
      "pais": "Colombia",
      "experiencia": 5,
      "tecnologias": ["JavaScript", "Node.js", "Express"],
      "createdAt": "2026-03-05T10:30:00.000Z",
      "updatedAt": "2026-03-05T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### 2. Obtener usuario por ID
```http
GET /api/usuarios/:id
```

**Ejemplo**:
```bash
curl --location 'http://localhost:3000/api/usuarios/1'
```

### 3. Crear usuario
```http
POST /api/usuarios
Content-Type: application/json
```

**Body**:
```json
{
  "nombre": "Juan Pérez",
  "edad": 28,
  "cargo": "Developer",
  "pais": "Colombia",
  "experiencia": 5,
  "tecnologias": ["JavaScript", "Node.js", "Express", "MySQL"]
}
```

**Curl**:
```bash
curl --location 'http://localhost:3000/api/usuarios' \
--header 'Content-Type: application/json' \
--data '{
  "nombre": "Juan Pérez",
  "edad": 28,
  "cargo": "Developer",
  "pais": "Colombia",
  "experiencia": 5,
  "tecnologias": ["JavaScript", "Node.js", "Express", "MySQL"]
}'
```

### 4. Actualizar usuario
```http
PUT /api/usuarios/:id
Content-Type: application/json
```

**Body**:
```json
{
  "nombre": "Juan Actualizado",
  "edad": 29,
  "cargo": "Senior Developer",
  "pais": "Colombia",
  "experiencia": 6,
  "tecnologias": ["JavaScript", "TypeScript", "Node.js", "Express", "MySQL", "Docker"]
}
```

**Curl**:
```bash
curl --location --request PUT 'http://localhost:3000/api/usuarios/1' \
--header 'Content-Type: application/json' \
--data '{
  "nombre": "Juan Actualizado",
  "edad": 29,
  "cargo": "Senior Developer",
  "pais": "Colombia",
  "experiencia": 6,
  "tecnologias": ["JavaScript", "TypeScript", "Node.js", "Express", "MySQL", "Docker"]
}'
```

### 5. Eliminar usuario
```http
DELETE /api/usuarios/:id
```

**Curl**:
```bash
curl --location --request DELETE 'http://localhost:3000/api/usuarios/1'
```

### 6. Health Check
```http
GET /health
```

**Respuesta**:
```json
{
  "status": "ok"
}
```

---

## 🗄️ Modelo de Usuarios

**Tabla**: `users`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT (PK, Auto) | Identificador único |
| nombre | VARCHAR(255) | Nombre completo |
| edad | INT | Edad del usuario |
| cargo | VARCHAR(255) | Puesto de trabajo |
| pais | VARCHAR(255) | País de residencia |
| experiencia | INT | Años de experiencia |
| tecnologias | JSON | Array de tecnologías |
| createdAt | TIMESTAMP | Fecha de creación |
| updatedAt | TIMESTAMP | Fecha de última actualización |

---

## 🔧 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=dev
HOST=0.0.0.0
PORT=3000

DB_HOST=db
DB_USER=root
DB_PASSWORD=Admin123
DB_NAME=usuarios
DB_PORT=3306
```

---

## 🐳 Comandos Docker Útiles

```bash
# Levantar contenedores
docker-compose up

# Levantar en background
docker-compose up -d

# Detener contenedores
docker-compose down

# Ver logs
docker-compose logs -f usuarios_app

# Reconstruir imagen
docker-compose build --no-cache

# Ejecutar comando en contenedor
docker-compose exec usuarios_app npm run dev
```

---

## 📝 Desarrollo

El servidor corre en modo "watch" con **nodemon**, lo que significa que los cambios en el código se reflejan automáticamente sin reiniciar el contenedor.

Para desarrollar localmente:

```bash
cd server
npm install
npm run dev
```

---

## 🔐 Seguridad (Notas Importantes)

- Las contraseñas en `.env` son de **desarrollo únicamente**
- Para producción, usar variables de entorno seguras y validar inputs
- Implementar autenticación/autorización

---

## 👨‍💻 Autor

Proyecto de arquitectura de software - Universidad de la Salle

## 📄 Licencia

MIT