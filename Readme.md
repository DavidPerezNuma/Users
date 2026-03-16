# TechStaff

Aplicación fullstack para gestión de usuarios con perfiles profesionales, desplegada con Docker Compose.

---

## 🛠️ Tecnologías

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Base de datos**: MySQL 8.0
- **Containerización**: Docker, Docker Compose
- **Gestor DB**: phpMyAdmin

---

## 📦 Requisitos

- Docker
- Docker Compose

---

## 🚀 Levantar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/DavidPerezNuma/Users.git
cd Usuarios
```

### 2. Crear el archivo `.env` en la raíz
```env
MYSQL_ROOT_PASSWORD=Admin123
MYSQL_DATABASE=users

DB_USER=root
DB_PASSWORD=Admin123
```

### 3. Levantar todos los servicios
```bash
docker compose up --build
```

### Servicios disponibles

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api/v1 |
| phpMyAdmin | http://localhost:8081 |

---

## 🐳 Comandos útiles

```bash
# Levantar en background
docker compose up -d

# Ver logs de un servicio
docker compose logs -f techstaff_frontend
docker compose logs -f techstaff_backend

# Detener contenedores
docker compose down

# Detener y eliminar volúmenes (reset BD)
docker compose down -v

# Reconstruir sin caché
docker compose build --no-cache
```

---

## 📚 Documentación detallada

- [Frontend — client/README.md](./client/README.md)
- [Backend — server/Readme.md](./server/Readme.md)

---

## 👨‍💻 Autor

Juan David Pérez Numa - Universidad de la Salle

