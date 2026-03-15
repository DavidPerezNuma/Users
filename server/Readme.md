# Usuarios API Backend

API REST backend para gestión de usuarios con Node.js y Express, construida siguiendo los principios de **Clean Architecture** con una estructura de **4 capas**.

## 📋 ¿Qué es esta aplicación?

Este es un **servidor backend (API REST)** que proporciona endpoints CRUD para administrar usuarios e información de sus perfiles profesionales. El backend expone servicios HTTP que pueden ser consumidos por aplicaciones frontales o clientes.

**Campos gestionados por usuario:**
- Nombre, edad, cargo, país
- Experiencia profesional
- Tecnologías que domina (almacenadas en JSON)
- Timestamps de creación y actualización

---

## 🏗️ Arquitectura - Clean Architecture de 4 Capas

El proyecto sigue principios de **Clean Architecture**, donde cada capa tiene una responsabilidad específica y las dependencias siempre apuntan hacia adentro (desde capas externas hacia las internas).

### **Capa 1: Presentation Layer (Routers)**
```
routers/
├── index.js                 # Centralizador de rutas (versionamiento /api/v1)
├── users.router.js          # Endpoints CRUD de usuarios
└── healthCheck.router.js    # Health check del servidor
```
**Responsabilidad**: Manejo de peticiones HTTP, validación de entrada mediante middlewares, enrutamiento.

---

### **Capa 2: Business Logic Layer (Services)**
```
services/
└── users.service.js         # Lógica de negocio de usuarios
```
**Responsabilidad**: Contiene toda la lógica de negocio. Orquesta operaciones entre datos y presentación. Manejo de errores y validaciones de negocio.

---

### **Capa 3: Data Access Layer (Libs)**
```
libs/
├── database.js              # Pool de conexión MySQL (MySQLLib)
└── models/
    ├── index.js             # Inicializador centralizado de modelos
    └── users.model.js       # Definición de tabla y estructura
```
**Responsabilidad**: Acceso a la base de datos, operaciones CRUD genéricas, gestión de conexiones.

---

### **Capa 4: Shared/Infrastructure (Middlewares, Config)**
```
middlewares/
├── error.handler.js         # Manejo centralizado de errores
├── validator.handler.js     # Validación de requests (Joi)
└── users.dto.js             # Data Transfer Objects (esquemas)

config/
└── index.js                 # Variables de entorno y configuración global
```
**Responsabilidad**: Funcionalidades transversales (errores, validación, configuración).

---

## 📁 Estructura Completa del Proyecto

```
server/
├── app.js                   # Punto de entrada (servidor Express)
├── package.json             # Dependencias del proyecto
├── .env                     # Variables de entorno (desarrollo)
├── .gitignore               # Archivos ignorados en Git
├── Dockerfile               # Imagen Docker multistage
├── Readme.md                # Este archivo
│
├── config/
│   └── index.js             # Carga variables de entorno
│
├── libs/                    # Capa de acceso a datos
│   ├── database.js          # Pool MySQL y CRUD genérico
│   └── models/
│       ├── index.js         # Inicializador de modelos
│       └── users.model.js   # Tabla users y esquema
│
├── services/                # Capa de lógica de negocio
│   └── users.service.js     # Servicios de usuarios
│
├── routers/                 # Capa de presentación
│   ├── index.js             # Centralizador de rutas
│   ├── users.router.js      # Rutas CRUD /api/v1/users
│   └── healthCheck.router.js # Verificación de salud
│
└── middlewares/             # Componentes transversales
    ├── error.handler.js     # Manejo de errores
    ├── validator.handler.js # Validación de requests
    └── users.dto.js         # Esquemas Joi
```

---

## 🛠️ Tecnologías

| Tecnología | Rol |
|-----------|-----|
| **Node.js 24** | Runtime JavaScript |
| **Express.js** | Framework web |
| **MySQL 2/Promise** | Cliente MySQL asincrónico |
| **Joi** | Validación de esquemas |
| **@hapi/boom** | Manejo de errores HTTP |
| **Nodemon** | Hot-reload en desarrollo |
| **Docker** | Containerización |

---

## 📦 Requisitos

- Docker y Docker Compose (recomendado)
- O Node.js 20+ + MySQL 8.0 (para desarrollo local)

---

## 🚀 Arranque Rápido

### Con Docker Compose (recomendado)

```bash
cd ..  # Ir a la raíz del proyecto
docker-compose up --build
```

**Servicios activos:**
- **API Backend**: `http://localhost:3000`
- **Database**: `localhost:3306` (MySQL)
- **phpMyAdmin**: `http://localhost:8081`

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Crear archivo .env (ver sección Variables de Entorno)
npm run dev
```

---

## 📡 Endpoints de API

### Base URL
```
http://localhost:3000/api/v1
```

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **GET** | `/users` | Obtener todos los usuarios |
| **GET** | `/users/:id` | Obtener usuario por ID |
| **POST** | `/users` | Crear nuevo usuario |
| **PUT** | `/users/:id` | Actualizar usuario |
| **DELETE** | `/users/:id` | Eliminar usuario |
| **GET** | `/health` | Health check del servidor |

### Ejemplos de Uso

#### 1. Obtener todos los usuarios
```bash
curl http://localhost:3000/api/v1/users
```

#### 2. Crear usuario
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "edad": 28,
    "cargo": "Developer",
    "pais": "Colombia",
    "experiencia": 5,
    "tecnologias": ["JavaScript", "Node.js", "MySQL"]
  }'
```

#### 3. Actualizar usuario
```bash
curl -X PUT http://localhost:3000/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Actualizado",
    "cargo": "Senior Developer"
  }'
```

#### 4. Eliminar usuario
```bash
curl -X DELETE http://localhost:3000/api/v1/users/1
```

#### 5. Health Check
```bash
curl http://localhost:3000/health
# Respuesta: {"status":"ok"}
```

---

## 🗄️ Esquema de Base de Datos

**Tabla**: `users`

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | INT | Primary Key, Auto Increment |
| `nombre` | VARCHAR(255) | NOT NULL |
| `edad` | INT | Opcional |
| `cargo` | VARCHAR(255) | NOT NULL |
| `pais` | VARCHAR(255) | NOT NULL |
| `experiencia` | INT | Opcional |
| `tecnologias` | JSON | Opcional (array de strings) |
| `createdAt` | TIMESTAMP | Default CURRENT_TIMESTAMP |
| `updatedAt` | TIMESTAMP | Auto-update |

---

## 🔧 Configuración - Variables de Entorno

Crea un archivo `.env` en esta carpeta (server/):

```env
# Aplicación
NODE_ENV=dev
HOST=0.0.0.0
PORT=3000

# Base de Datos
DB_HOST=db              # 'db' si usas Docker, 'localhost' si es local
DB_USER=root
DB_PASSWORD=Admin123
DB_NAME=users
DB_PORT=3306
```

---

## 📝 Flujo de una Petición

Ejemplo: `POST /api/v1/users`

```
1. Cliente HTTP
   ↓
2. Router (users.router.js)
   - Valida request con DTO (users.dto.js)
   ↓
3. Controlador (users.router.js handler)
   - Llama al servicio
   ↓
4. Service (users.service.js)
   - Lógica de negocio
   - Valida existencia de datos
   ↓
5. Database Layer (database.js)
   - Ejecuta query CREATE
   ↓
6. Response
   - Service retorna datos
   - Router envía respuesta HTTP
```

---

## 🔄 Flujo de Errores

```
Error en cualquier capa
   ↓
Lanzo Boom error (ej: Boom.notFound())
   ↓
next(error) en router
   ↓
Middleware logErrors (registra en consola)
   ↓
Middleware boomError (if isBoom → formatea respuesta)
   ↓
Middleware errorHandler (fallback 500)
   ↓
Respuesta HTTP al cliente
```

---

## 🐳 Comandos Docker Útiles

```bash
# Desde la raíz del proyecto (donde está docker-compose.yml)

# Construir e iniciar
docker-compose up --build

# Iniciar en background
docker-compose up -d

# Ver logs
docker-compose logs -f usuarios_app

# Parar contenedores
docker-compose down

# Eliminar volúmenes (reset BD)
docker-compose down -v

# Ejecutar comando en contenedor
docker-compose exec usuarios_app npm run dev
```

---

## 💡 Desarrollo

El servidor usa **nodemon**, así que los cambios se reflejan automáticamente sin reiniciar.

```bash
npm run dev
```