<div align="center">

# Palma Real – Sistema de Gestión Integral

Plataforma web Full‑Stack para la administración del Club Palma Real: gestión de socios, deportes, churuatas, locales, alquileres y control de entradas, con autenticación segura y panel administrativo moderno.

</div>

## Índice
1. Visión General
2. Tecnologías Principales
3. Estructura del Repositorio
4. Instalación y Configuración (Backend & Frontend)
5. Variables de Entorno
6. Arquitectura Backend
7. Modelos de Datos
8. Endpoints REST (Resumen)
9. Flujo de Autenticación y Seguridad
10. Arquitectura Frontend
11. Estado Global (Redux Toolkit) y Flujo de Datos
12. UI / Estilos / Componentes
13. Guía de Desarrollo Local
14. Pruebas (Backend & Frontend)
15. Estrategia de Despliegue Sugerida
16. Observabilidad y Mantenimiento (Sugerencias)
17. Roadmap / Mejoras Futuras
18. FAQ Rápido
19. Licencia y Autor

---

## 1. Visión General
El sistema permite centralizar operaciones administrativas del club:
- Registro y autenticación de administradores.
- Confirmación de cuenta vía email y recuperación de contraseña.
- Gestión de entidades: Deportes, Deportistas, Socios, Vigilantes, Churuatas, Locales, Alquileres de Churuatas y Entradas.
- Control de acceso a rutas protegidas mediante JWT.
- Panel Frontend responsivo (React + Vite) con integración de Material UI, Tailwind y DataGrid.
- Base de datos MongoDB (Mongoose) con modelos desacoplados y helpers reutilizables.

### Objetivos Clave
- Escalabilidad: separación clara de capas (rutas, controladores, modelos, middleware, helpers).
- Seguridad: hashing de contraseñas (bcrypt), tokens JWT, verificación por email.
- Extensibilidad: fácil incorporación de nuevos módulos o entidades.
- Experiencia de Usuario: interfaz rápida (Vite) + componentes reutilizables.

---

## 2. Tecnologías Principales
Backend:
- Node.js, Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Nodemailer (emails transaccionales)
- Bcrypt (hashing de contraseñas)

Frontend:
- React 18 + Vite
- Redux Toolkit / redux-thunk
- Material UI (MUI) + styled-components + TailwindCSS
- Axios (cliente HTTP)
- ApexCharts (gráficos), MUI DataGrid (tablas), SweetAlert2 (alertas), React Hook Form (formularios)

Dev / QA:
- ESLint + Prettier + Tailwind plugin
- Jest (backend, planificado)
- Cypress (frontend E2E, planificado)

---

## 3. Estructura del Repositorio
```
palma-real/
	backend/
		index.js              # Punto de entrada Express
		config/db.js          # Conexión MongoDB
		routes/               # Definición de endpoints REST
		controllers/          # Lógica de negocio por recurso
		models/               # Esquemas Mongoose
		middleware/           # Autenticación (JWT), etc.
		helpers/              # utilidades (email, tokens)
		.env                  # Variables backend (NO subir)
	frontend/
		src/
			paginas/            # Vistas / páginas
			components/         # Componentes UI reutilizables
			actions/            # Acciones redux (thunks)
			reducers/           # Reducers por dominio
			context/            # Context API (Auth)
			config/axios.jsx    # Cliente Axios centralizado
			store.jsx           # Configuración de Redux Toolkit
		.env                  # Variables frontend (NO subir)
	README.md
```

---

## 4. Instalación y Configuración
### Prerrequisitos
- Node.js >= 18
- MongoDB (local o Atlas)
- Cuenta de email SMTP (para confirmación y recuperación) – ej. Gmail/App Password o servicio transactional.

### Clonar
```bash
git clone <repo_url>
cd palma-real
```

### Backend
```bash
cd backend
npm install
npm run dev   # nodemon
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 5. Variables de Entorno
### Backend (`backend/.env`)
```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<dbname>
JWT_SECRET=clave_super_segura
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.tu-proveedor.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASS=clave
EMAIL_FROM="Club Palma Real <no-reply@palma-real.com>"
```
### Frontend (`frontend/.env`)
```
VITE_BACKEND_URL=http://localhost:4000
```

---

## 6. Arquitectura Backend
Capas:
1. Rutas (`routes/`): definen endpoints y asocian controladores.
2. Controladores (`controllers/`): coordinan validaciones, acceso a modelos y respuestas HTTP.
3. Modelos (`models/`): esquemas Mongoose, hooks (pre-save), métodos de instancia.
4. Middleware (`middleware/`): autenticación JWT (`checkAuth`).
5. Helpers (`helpers/`): generación de tokens, envío de emails, utilidades.

Seguridad:
- Hash de contraseñas con `bcrypt` (salt rounds = 10).
- JWT firmado con `JWT_SECRET` incluye `id` del administrador.
- CORS restringido a `FRONTEND_URL`.

Patrón de Flujo Request:
Cliente -> Ruta -> Middleware (auth si aplica) -> Controlador -> Modelo -> Respuesta JSON

---

## 7. Modelos de Datos (Resumen)
| Modelo | Campos Principales | Notas |
|--------|--------------------|-------|
| Administrador | nombre, email (único), password (hash), telefono, token, confirmado | Incluye métodos para comprobar password y token de confirmación |
| Deporte | (no mostrado aquí) nombre, estado, etc. | CRUD básico |
| Deportista | (id socio opcional), datos personales | Relación con deporte opcional |
| Socio | datos personales, estado | Posible extensión: membresías |
| Vigilante | identificación, turno | Control de acceso físico |
| Churuata | nombre, capacidad, estado | Reservable |
| Local | nombre, tipo, estado | Administración de espacios |
| AlquilerChuruata | referencia churuata, fechas, socio, costo | Registra reservas |
| Entrada | fecha, tipo, asociado, monto | Control económico / acceso |

Nota: completar campos detallados directamente revisando cada esquema si se requiere documentación más técnica.

---

## 8. Endpoints REST (Resumen Base)
Prefijo global: `/api`

| Recurso | Endpoint Base | Ejemplos de Operaciones |
|---------|---------------|--------------------------|
| Administradores | `/api/administradores` | POST registrar, POST login (/login), GET perfil (/perfil), GET confirmar/:token, POST olvide-password, GET comprobar/:token, POST nuevo-password |
| Deportes | `/api/deportes` | GET listar, POST crear, PUT/PATCH actualizar/:id, DELETE eliminar/:id |
| Deportistas | `/api/deportistas` | CRUD similar |
| Churuatas | `/api/churuatas` | CRUD + disponibilidad |
| Locales | `/api/locales` | CRUD |
| Socios | `/api/socios` | CRUD |
| Vigilantes | `/api/vigilantes` | CRUD |
| Alquiler Churuatas | `/api/alquiler-churuatas` | Crear reserva, listar, cancelar |
| Entradas | `/api/entradas` | Registrar entrada, listar |

Endpoints protegidos requieren header:
```
Authorization: Bearer <JWT>
```

---

## 9. Flujo de Autenticación y Seguridad
1. Registro: POST /api/administradores (genera token de confirmación y envía email).
2. Confirmación: GET /api/administradores/confirmar/:token (marca confirmado=true y elimina token).
3. Login: POST /api/administradores/login -> responde con JWT.
4. Acceso a Perfil: GET /api/administradores/perfil con header Authorization.
5. Recuperar Password: POST /api/administradores/olvide-password -> email con token.
6. Verificar Token Password: GET /api/administradores/comprobar/:token
7. Nuevo Password: POST /api/administradores/nuevo-password/:token

Middleware `checkAuth`:
- Extrae token del header
- Verifica firma JWT
- Adjunta `req.administrador` sin campos sensibles

---

## 10. Arquitectura Frontend
Stack: React + Vite + Redux Toolkit + MUI + Tailwind + styled-components.

Carpetas Clave:
- `paginas/`: vistas de alto nivel (Dashboard, Deportes, Socios...).
- `components/`: piezas reutilizables (Tablas, Modales, Barra Superior, Footer).
- `actions/`: thunks asíncronos para API.
- `reducers/`: manejo por dominio (deportesReducer, etc.).
- `context/AuthProvider.jsx`: autenticación basada en token almacenado en localStorage.
- `config/axios.jsx`: instancia Axios con `baseURL` derivado de `VITE_BACKEND_URL`.

Render Principal:
- `main.jsx` monta `<App />` y provee `<Provider store>` y contextos.

---

## 11. Estado Global (Redux Toolkit) y Flujo de Datos
Aunque se utiliza `configureStore`, parte del código mantiene un patrón de Redux clásico (actions + types). Flujo típico para Deportes:
1. Dispatch acción iniciar (e.g. `COMENZAR_DESCARGA_DEPORTES`).
2. Thunk obtiene datos vía Axios.
3. Reducer procesa `DESCARGA_DEPORTES_EXITO` o `DESCARGA_DEPORTE_ERROR`.
4. UI reacciona a `loading`, `error` y `deportes`.

Variables Reducer Clave (ejemplo `deportesReducer`):
- `loading`: control de spinner.
- `error`: manejo de errores de red / validación.
- `deportes`: listado en memoria.
- `deporteeliminar`, `deporteeditar`: referencias temporales para operaciones.

Sugerencia futura: migrar a `createSlice` y RTK Query para simplificar boilerplate.

---

## 12. UI / Estilos / Componentes
- Material UI: layout, tablas (DataGrid), inputs accesibles.
- TailwindCSS: utilidades rápidas de maquetación.
- styled-components: estilos encapsulados específicos.
- ApexCharts: visualizaciones (panel de reportes / dashboard).
- SweetAlert2: diálogos de confirmación amigables.

Convención: combinar utilidades (Tailwind) con componentes MUI de forma consistente para evitar sobreescritura compleja.

---

## 13. Guía de Desarrollo Local
Workflow recomendado:
1. Configurar `.env` en backend y frontend.
2. Levantar MongoDB local o usar Atlas.
3. Iniciar backend: `npm run dev` en `backend/`.
4. Iniciar frontend: `npm run dev` en `frontend/` (por defecto Vite en :5173).
5. Crear primer administrador (registro) y confirmar vía email.
6. Realizar login y navegar panel.

Scripts Backend:
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Desarrollo con nodemon |
| `npm start` | Producción (Node directo) |

Scripts Frontend:
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor Vite desarrollo |
| `npm run build` | Build producción (`dist/`) |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Linter código fuente |

Lint / Formato:
- ESLint (reglas React + Hooks)
- Prettier + plugin Tailwind (ordenación de clases)

---

## 14. Pruebas (Estado Actual y Plan)
Backend:
- Dependencia `jest` incluida; aún no hay suites. Sugerir estructura: `backend/tests/*.test.js`.
Frontend:
- Cypress instalado (E2E). Crear carpeta `cypress/e2e` y tests de autenticación, CRUD deportes.

Ejemplo Jest (futuro): prueba de helper `generarId` y controlador de registro (mock Mongoose).

Cobertura Recomendada:
- Autenticación (registro, login, recuperación)
- CRUD críticos (Deportes, AlquilerChuruata)
- Middleware de auth (token inválido)

---

## 15. Estrategia de Despliegue Sugerida
Backend:
- Plataformas: Render, Railway, Fly.io, AWS Elastic Beanstalk o Docker + VM.
- Configurar variables env en panel del proveedor.
- Asegurar cabeceras de seguridad (Helmet) y logging (morgan) en producción.

Frontend:
- Vercel, Netlify o GitHub Pages (con adaptación). Ajustar `VITE_BACKEND_URL` a dominio backend público.

MongoDB:
- Usar Atlas con IP allowlist y usuario restringido.

Emails:
- Reemplazar credenciales por proveedor confiable (SendGrid, Mailgun) en producción.

Optimización:
- Habilitar compresión (compression middleware) y cache estático.

---

## 16. Observabilidad y Mantenimiento (Sugerencias)
- Logging estructurado (pino / winston) para auditoría.
- Monitoreo de errores: Sentry.
- Métricas: endpoint `/health` y posible Prometheus.
- Backups automatizados de MongoDB.

---

## 17. Roadmap / Mejoras Futuras
- Roles y Permisos granulares (Admin, Staff, Operador).
- Paginación y filtros en listados (query params estándar: `?page=&limit=`).
- Validación robusta (Joi / Zod) en entradas.
- Refactor reducers a `createSlice` y adoptar RTK Query.
- Implementar tests unitarios y E2E.
- Exportaciones (CSV ya soportado parcial, agregar PDF/Excel).
- Auditoría de acciones (quién creó/actualizó registros).
- Rate limiting y protección contra fuerza bruta (express-rate-limit).
- Internacionalización (i18n) futura.

---

## 18. FAQ Rápido
| Pregunta | Respuesta |
|----------|-----------|
| Error CORS | Verificar `FRONTEND_URL` en backend `.env` y origen real del navegador |
| 403 Token no válido | Revisar expiración o header `Authorization` faltante |
| Email no llega | Comprobar credenciales SMTP y puertos firewall |
| Datos no cargan | Revisar `VITE_BACKEND_URL` y consola de red del navegador |
| Hash no cambia al editar perfil | Sólo se re-hashea si se modifica el campo `password` |

---

## 19. Licencia y Autor
Licencia: ISC

Autor: **Luis Angel Gutiérrez Bonillo**

---

## Contribuciones
1. Hacer fork y crear branch descriptiva: `feature/nombre-funcionalidad`.
2. Asegurar formato y lint pasan.
3. Abrir Pull Request con descripción clara.

---

Si necesitas ampliar alguna sección (ej. documentación detallada de cada endpoint o añadir diagramas UML) abre un issue o extiende este README.

¡Bienvenido/a a Palma Real! 🏡
