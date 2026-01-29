# 🐛 Known Issues & Resolution Plan

## 🛑 Critical Issues

### 1. Admin Panel 500 Error (ServerFunctionsProvider)
- **Status**: 🔴 Open
- **Description**: Accessing `/admin` or `/admin/login` results in a 500 Internal Server Error (`ServerFunctionsProvider requires a serverFunction prop`).
- **Cause**: The `importMap` generation failed due to Node.js / `tsx` environment incompatibility with `.ts` extensions in `payload.config.ts`.
    - `ERR_MODULE_NOT_FOUND`: When `.ts` is omitted (Node ESM resolution failure).
    - `ERR_UNKNOWN_FILE_EXTENSION`: When `.ts` is included (Node/tsx loader mismatch).
- **Workaround**: None in current local environment. Requires Standard CI/CD or proper `tsconfig`/`package.json` setup for ESM/TS interop.
- **Action**: Backend integration needs to be reviewed in a standard deployment environment.

## ⚠️ Moderate Issues

### 2. npm audit Vulnerabilities
- **Status**: 🟡 Warning
- **Description**: 5 moderate severity vulnerabilities in `esbuild` dependencies.
- **Dependency Chain**: `@payloadcms/db-postgres` -> `drizzle-kit` -> `@esbuild-kit` -> `esbuild`.
- **Action**: Monitor for upstream updates from Payload CMS team.

## ✅ Resolved Issues

- **Visual Sync**: `app/page.tsx` (default) was conflicting with `app/(site)/page.tsx`. **Fixed** by removing the default file.
- **Frontend Import**: `generateMetadata` naming conflict in Admin UI. **Fixed** by explicitly using `generatePageMetadata`.
