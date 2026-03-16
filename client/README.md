# TechStaff Frontend

Aplicación frontend para gestión de usuarios construida con React y Vite, siguiendo una arquitectura de componentes modulares por funcionalidad.

---

## 🏗️ Arquitectura — Componentes Modulares

El proyecto organiza el código por funcionalidad, donde cada feature agrupa sus propios componentes, hooks y servicios. Las dependencias siempre fluyen hacia adentro: los componentes consumen hooks, los hooks consumen servicios, y los servicios consumen la instancia de API.

### Capa 1: Servicios (`src/services/`)
Responsables de la comunicación HTTP con el backend. Cada servicio encapsula las llamadas a un recurso específico de la API.

### Capa 2: Hooks (`src/hooks/`)
Encapsulan el estado y la lógica de negocio del frontend. Consumen los servicios y exponen datos y acciones a los componentes.

### Capa 3: Componentes (`src/components/`)
Responsables únicamente de la presentación. Cada feature tiene su propia carpeta con subcomponentes atómicos y sus estilos modulares.

---

## 📁 Estructura del Proyecto

```
client/
├── public/                        # Archivos estáticos
├── src/
│   ├── assets/                    # Imágenes y recursos estáticos
│   │
│   ├── services/                  # Capa de comunicación con la API
│   │   ├── api.js                 # Instancia base de Axios (baseURL, interceptores)
│   │   ├── user.service.js        # CRUD de usuarios
│   │   └── healthCheck.service.js # Verificación de estado del servidor
│   │
│   ├── hooks/                     # Lógica de estado y negocio
│   │   ├── userUser.js            # Estado y acciones de usuarios (getAll, create, update, delete)
│   │   └── useHealthCheck.js      # Estado del health check
│   │
│   ├── components/                # Componentes de presentación
│   │   ├── users/                 # Feature de usuarios
│   │   │   ├── components/        # Subcomponentes atómicos
│   │   │   │   ├── UserTable.jsx        # Tabla que lista todos los usuarios
│   │   │   │   ├── EditUserButton.jsx   # Botón con lógica de edición
│   │   │   │   └── DeleteUserButton.jsx # Botón con lógica de eliminación
│   │   │   ├── Users.module.css   # Estilos modulares del feature
│   │   │   └── index.jsx          # Componente raíz que compone los subcomponentes
│   │   │
│   │   └── healthCheck/           # Feature de health check
│   │       ├── HealthCheck.module.css # Estilos modulares
│   │       └── index.jsx          # Alerta visual del estado del servicio
│   │
│   ├── App.jsx                    # Raíz de la aplicación, compone los features
│   ├── App.css                    # Estilos globales base
│   ├── index.css                  # Reset y estilos del body
│   └── main.jsx                   # Punto de entrada, monta React en el DOM
│
├── dockerfile                     # Imagen Docker del frontend
├── vite.config.js                 # Configuración de Vite (proxy, host, puerto)
└── package.json                   # Dependencias y scripts
```

---

## 📐 Flujo de una petición

```
Componente (index.jsx)
   ↓ usa
Hook (useUsers.js)
   ↓ llama
Servicio (user.service.js)
   ↓ usa
API (api.js → Axios)
   ↓ HTTP
Backend (http://localhost:3000/api/v1)
```

---

## 🛠️ Tecnologías

| Tecnología | Rol |
|-----------|-----|
| **React 19** | Librería de UI |
| **Vite 8** | Bundler y servidor de desarrollo |
| **Axios** | Cliente HTTP |
| **CSS Modules** | Estilos encapsulados por componente |
| **Docker** | Containerización |

---

## 🚀 Arranque rápido

### Con Docker Compose (recomendado)

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Frontend disponible en: `http://localhost:5173`

### Desarrollo local

```bash
cd client
npm install
npm run dev
```

Requiere que el backend esté corriendo en `http://localhost:3000`.

---

## 🔧 Variables de entorno

La única variable de entorno del frontend es:

```env
VITE_BACKEND_URL=/api/v1
```

Cuando se usa Docker Compose, Vite actúa como proxy y redirige las peticiones `/api` al contenedor del backend internamente, por lo que el browser siempre apunta a `localhost:5173`.
