# TechStaff Frontend

Aplicación frontend para gestión de usuarios construida con React y Vite, siguiendo una arquitectura de componentes modulares por funcionalidad. Diseño visual dark neon futurista.

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
│   │   ├── form/                  # Feature de formulario
│   │   │   ├── index.jsx          # Formulario de creación y edición de usuarios
│   │   │   └── Form.module.css    # Estilos modulares del formulario
│   │   │
│   │   ├── users/                 # Feature de usuarios
│   │   │   ├── components/        # Subcomponentes atómicos
│   │   │   │   ├── UserTable.jsx        # Tabla que lista todos los usuarios
│   │   │   │   ├── EditUserButton.jsx   # Botón que carga el usuario en el formulario
│   │   │   │   ├── DeleteUserButton.jsx # Botón que abre el modal de confirmación
│   │   │   │   ├── ConfirmModal.jsx     # Modal de confirmación para eliminar
│   │   │   │   └── ConfirmModal.module.css
│   │   │   ├── Users.module.css   # Estilos modulares del feature
│   │   │   └── index.jsx          # Componente raíz que compone los subcomponentes
│   │   │
│   │   └── healthCheck/           # Feature de health check
│   │       ├── HealthCheck.module.css # Estilos modulares
│   │       └── index.jsx          # Alerta visual del estado del servicio
│   │
│   ├── App.jsx                    # Raíz de la aplicación — orquesta estado y componentes
│   ├── index.css                  # Reset y estilos globales (tema dark neon)
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
   ↓ HTTP proxy Vite
Backend (http://techstaff_backend:3000/api/v1)
```

---

## 🎨 Diseño

El proyecto usa un tema **dark neon futurista minimalista**:

- Fondo negro profundo `#0a0a0a`
- Fuentes: `Orbitron` (títulos/botones) y `Rajdhani` (texto)
- Acentos en cyan `#00d2ff`, verde `#00ff9c`, azul `#00cfff` y rojo `#ff4d4d`
- Inputs con borde cyan y glow en focus
- Botones diferenciados por acción: crear (verde), actualizar (azul), cancelar/eliminar (rojo)

---

## ⚙️ Funcionalidades

| Acción | Descripción |
|--------|-------------|
| Listar usuarios | Tabla con skeleton cuando no hay registros |
| Crear usuario | Formulario con validación de campos requeridos |
| Editar usuario | El formulario se precarga con los datos del usuario seleccionado. El botón "Actualizar" solo se habilita si hay cambios |
| Eliminar usuario | Modal de confirmación neon antes de ejecutar la acción |
| Health Check | Alerta de estado del servicio con botón para cerrar |

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

```env
VITE_BACKEND_URL=/api/v1
```

Cuando se usa Docker Compose, Vite actúa como proxy y redirige las peticiones `/api` al contenedor del backend internamente, por lo que el browser siempre apunta a `localhost:5173`.
