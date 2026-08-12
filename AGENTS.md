# AGENTS.md

Club Palma Real: management system for a sports club. **pnpm monorepo** with two workspaces (`backend/`, `frontend/`) — run everything from the root with `pnpm`.

## Layout & commands (run at repo root)

- Root `package.json` + `pnpm-workspace.yaml` define the workspace. **Versions live in the `catalog:` section of `pnpm-workspace.yaml`** — package.json files reference `"catalog:"`. To upgrade a dependency, change it in the catalog (one place), then `pnpm install`.
- `pnpm install` — single lockfile `pnpm-lock.yaml`. `allowBuilds` in the workspace yaml controls native build scripts (bcrypt, unrs-resolver) — pnpm 11 ignores them otherwise.
- `pnpm dev` — backend (nodemon, port 4000) + frontend (Vite, :5173) in parallel. Node >= 20.19, pnpm >= 10.
- `pnpm lint` / `pnpm build` / `pnpm test` — run per workspace. Frontend lint (`eslint src --max-warnings 0`) fails on any warning; it is green **only if** you keep `useEffect` deps complete (`dispatch` included) and add no unused imports. Backend `test` is jest with `--passWithNoTests` (no suites exist).

## Environment (required before anything runs)

No `.env` files or `.env.example` are committed — create them yourself (variables documented in README §5):

- `backend/.env`: `PORT`, `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, SMTP vars.
- `frontend/.env`: `VITE_BACKEND_URL` (scheme + host, no path — axios appends `/api`).
- Backend CORS allows **only** the `FRONTEND_URL` origin; a wrong value makes every browser request fail.

## Backend conventions

- Express 5 + Mongoose 9, ESM (`"type": "module"`). Entry: `backend/index.js` (also where routes are mounted). `process.exit(1)` if MongoDB connection fails.
- New entity = model + controller + route file, then register the router in `backend/index.js` (mount prefix includes `/api`).
- Routes for deportes/socios/etc. are **not** behind `checkAuth` — only the administrador routes are. README's "protected endpoints" claim is aspirational.
- Error responses are `{ msg: string }`; success responses are raw JSON (array or object, not wrapped in `{data}`).
- JWT: `{ id }` claim, 30d expiry; password models (Administrador, Socio, Vigilante) use **async pre-save hooks without `next()`** — Mongoose 9 dropped the `next` parameter (do not reintroduce it).
- `mongoose.connect(MONGO_URI)` without legacy options (`useNewUrlParser`/`useUnifiedTopology` are gone in Mongoose 8+).

## Frontend conventions

- Vite 8 (Rolldown) + React 19 + MUI v9 + Tailwind v4 + Redux classic. `@` alias resolves to `/src` (vite.config.js).
- Redux uses the **classic pattern, not slices**: action type constants in `src/types/index.jsx`, thunks in `src/actions/*Action.jsx`, reducers in `src/reducers/`, registered in `src/reducers/index.jsx` (combined with RTK `configureStore`). New domain = touch all four.
- Action files call paths **without** `/api` (baseURL already has it), e.g. `clienteAxios.post('/deportes', …)`.
- All JS files use the `.jsx` extension (actions, reducers, config) — follow that even with no JSX.
- UI code and comments are in Spanish; pages live in `src/paginas/`. Keep new UI text in Spanish.
- Auth token is stored in `localStorage` as `token`, but route protection is not actually enforced (`RutaProtegida` is an empty passthrough).
- **MUI v9 Grid is the old `Grid2`**: props `item`/`xs`/`md`/`lg` no longer exist. Use `size={{ xs: 12, md: 8 }}` / `size="grow"`, and system props like `px` go inside `sx` (e.g. `sx={{ px: 2 }}`). GridLegacy was removed.
- Tailwind v4: plugin `@tailwindcss/vite` in vite.config.js, `@import "tailwindcss";` in `src/index.css`. No `tailwind.config.js` / `postcss.config.js` / `.eslintrc.cjs` — config is `eslint.config.js` (flat, ESLint 9: `react/prop-types` off, `exhaustive-deps` on, `--max-warnings 0`).

## Known stale / dead code (ignore or fix, don't chase)

Repo was cloned from a "Veterinarios" tutorial project; leftovers remain:

- `frontend/src/context/AuthProvider.jsx:26` still calls `/veterinarios/perfil` — dead code, `AuthProvider` is never mounted (`useAuth` unused).
- `frontend/src/paginas/Auth/Login.jsx` — form validation only; it never calls the login API. Auth pages in `paginas/Auth/` (OlvidePassword, ConfirmarCuenta) are unreferenced.
- Demo leftovers removed during the monorepo migration: `components/BotonesAccion.jsx`, `components/Tables/TableBasic.jsx`, `components/Modal/BasicModal.jsx`, `src/Theme.jsx`.
- The `req.veterinario` bug and the `olvide-password` route typo were **fixed** — do not reapply.

## Docs caveat

README.md is aspirational in places (helmet/morgan/cypress/apexcharts listed as if done). Trust the code and the configs above over README claims.