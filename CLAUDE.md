# SeaSpeed

## Project Overview

SeaSpeed is a maritime crew management web application — a React single-page application (SPA) that allows seafarers to manage their professional profiles (personal details, travel documents, certificates, work experience, medical records) and provides an admin interface for managing crew members, shipping companies, and vessels.

## Tech Stack

- **Language**: TypeScript 4.9
- **Framework**: React 18 (Create React App / react-scripts 5)
- **UI Libraries**: Material UI (MUI) v5, Tailwind CSS v3, react-feather icons, Lottie animations
- **Routing**: react-router-dom v6 (nested routes, `useRoutes`)
- **HTTP Client**: Axios — baseURL set from `REACT_APP_API_ENDPOINT` at runtime
- **State Management**: React Context + `useReducer` (`src/contexts/global.context.tsx`)
- **Validation**: Joi v17
- **Notifications**: react-toastify
- **Testing**: Jest + React Testing Library (via react-scripts)
- **Static Server**: nginx:alpine (serves the production build)

## Docker Compose Stack

**Compose project name**: `quill-48e6d0a9` — always pass `-p quill-48e6d0a9` to every `docker compose` command.

### Services

- `app` — nginx serving the pre-built React SPA, port **80** (no persistent volume; static files are baked into the image at build time)

### Network

- `quill-net-48e6d0a9-7ddd-4d13-941d-d2f80f4d1afa` (bridge, internal)
- `quill-preview` (external, used by the Traefik reverse proxy)

### Running commands inside the container

```bash
docker compose -p quill-48e6d0a9 exec -T app <command>
```

### Common commands

```bash
# Open a shell in the app container
docker compose -p quill-48e6d0a9 exec -T app sh

# Run the test suite
docker compose -p quill-48e6d0a9 exec -T app npx react-scripts test --watchAll=false --ci

# Rebuild the image after source changes
docker compose -p quill-48e6d0a9 build app

# Restart the app container
docker compose -p quill-48e6d0a9 restart app

# Tail nginx access/error logs
docker compose -p quill-48e6d0a9 logs -f app
```

> **Note**: There is no database or backend service in this Compose stack. SeaSpeed is a pure frontend that communicates with an external REST API determined by `REACT_APP_API_ENDPOINT`.

### Env vars rule

Application env vars (`REACT_APP_API_ENDPOINT` and any future secrets) are already set inside the app container's environment by the platform. Never run `env`, `printenv`, `echo $VAR`, or read `/proc/*/environ` inside project containers — the platform blocks secret-dumping commands in project containers. To use a secret, write code that reads it from the app's environment; do not log or print its value.

### How `REACT_APP_API_ENDPOINT` works

The React bundle is built at image-build time with a placeholder string `__REACT_APP_API_ENDPOINT__`. At container start, `.quill/docker-entrypoint.sh` replaces the placeholder in all JS files with the actual runtime value of `$REACT_APP_API_ENDPOINT`. This means **changing the API endpoint does not require a rebuild** — only a container restart.

## Architecture

```
src/
├── index.tsx                      # Entry point, wraps app in GlobalProvider
├── App.tsx                        # Minimal app shell
├── Routes/
│   └── Main.routes.tsx            # All route definitions; role-based routing (crew vs admin)
├── views/                         # Layout wrappers rendered by nested routes
├── Components/
│   ├── auth/                      # Login, ResetPassword, route guards
│   ├── dashboard/                 # Crew member dashboard
│   ├── personalDetails/           # Personal, contact, education, bank, kin detail forms
│   ├── travelDetails/             # Passport, visa, seamen book forms
│   ├── certification/             # Certificate of Competency, Flag/Dangerous Cargo endorsements
│   ├── WorkExperiance/            # Work history forms
│   ├── course&certificate/        # Course & certificate records
│   ├── MedicalDetails/            # Medical detail forms
│   ├── unionRegistration/         # Union registration forms
│   ├── references/                # Professional references
│   └── admin/                     # Admin-only: dashboard, crew members, sub-admins, companies, vessels
├── contexts/
│   ├── global.context.tsx         # Auth state (accessToken, role, loading)
│   ├── personalDetail.context.tsx
│   ├── travelDetail.context.tsx
│   └── certificate.context.tsx
├── services/
│   ├── api.service.ts             # Axios instance with interceptors
│   ├── auth.service.ts
│   ├── user.service.ts
│   └── admin.service.ts
├── constants/
│   ├── api.constant.ts            # Crew API endpoint paths
│   └── api.admin.constant.ts      # Admin API endpoint paths
├── uiComponents/                  # Reusable form fields, modals, error boundary
└── types/                         # Shared TypeScript types
```

**Data flow**: `Routes/Main.routes.tsx` selects the route tree based on `sessionStorage.getItem("role")` → Layout view renders sidebar/navbar → Feature Component calls a service function → service calls `api.service.ts` (Axios) → external REST API at `REACT_APP_API_ENDPOINT + /api/v1/<path>`.

Auth token is stored in `sessionStorage` under the key `"token"` and attached to every request as `Authorization` header.

## Development Conventions

- **File naming**: camelCase for components (e.g., `loginForm.tsx`), dot-separated type suffix (`.component.tsx`, `.service.ts`, `.context.tsx`, `.type.ts`, `.constant.ts`)
- **Component style**: functional components with hooks only; no class components
- **Form validation**: Joi schemas defined in a co-located `validation.ts` file alongside each feature component
- **API paths**: all crew endpoints in `src/constants/api.constant.ts`; admin endpoints in `src/constants/api.admin.constant.ts`
- **Styling**: MUI `sx` prop and `@emotion/styled` for component-level styles; Tailwind utility classes for layout
- **Notifications**: `react-toastify` `toast.error()` / `toast.success()` — do not use `alert()`
- **Route guards**: `AuthenticatedRoute` (redirects to login if no token) and `UnAuthenticatedRoute` (redirects to dashboard if already logged in)
- **TypeScript**: strict typing; shared types live in `src/types/`

## Testing

**Framework**: Jest + React Testing Library (bundled with react-scripts).

```bash
# Run all tests (CI mode, no watch)
docker compose -p quill-48e6d0a9 exec -T app npx react-scripts test --watchAll=false --ci

# Run a specific test file
docker compose -p quill-48e6d0a9 exec -T app npx react-scripts test --watchAll=false --ci --testPathPattern="App.test"
```

Test files live next to their components and use the `.test.tsx` suffix. The only existing test is `src/App.test.tsx`.

## Important Gotchas

- **No local backend**: There is no database, API server, or Redis in this Compose stack. All data comes from an external API. Do not try to run migrations or seed commands.
- **Build required for code changes**: nginx serves a static build. After editing source files in development, the Docker image must be rebuilt (`docker compose -p quill-48e6d0a9 build app`) and the container restarted for changes to appear.
- **Runtime API injection**: `REACT_APP_API_ENDPOINT` is injected at startup via sed, not at build time. Changing the env var requires only a container restart, not a rebuild.
- **Role-based routing at runtime**: The admin vs crew-member route tree is selected by reading `sessionStorage.getItem("role")` in `Main.routes.tsx:678`. If role is `"admin"` (case-insensitive), the admin routes are rendered; otherwise crew-member routes apply.
- **Auth in sessionStorage**: Tokens are not persisted across browser sessions. The app re-reads `sessionStorage` on mount in `Main.routes.tsx` via a `useEffect`.
- **TypeScript `CI=false` build**: The Dockerfile passes `CI=false` to `react-scripts build` to prevent warnings from being treated as errors.

## How to Make Changes Safely

1. **Edit source files** in `/workspace/src/`.
2. **Rebuild the image** after any source change:
   ```bash
   docker compose -p quill-48e6d0a9 build app
   ```
3. **Restart the container** to apply the new image:
   ```bash
   docker compose -p quill-48e6d0a9 up -d app
   ```
4. **Verify** by tailing logs:
   ```bash
   docker compose -p quill-48e6d0a9 logs -f app
   ```
5. **No cache to clear** — nginx serves static files directly; there is no server-side cache layer.
6. **Run tests** before committing:
   ```bash
   docker compose -p quill-48e6d0a9 exec -T app npx react-scripts test --watchAll=false --ci
   ```
