# NextFutureMind Frontend

Responsive Next.js 16 application with Supabase authentication, Google OAuth support,
guest browsing, persistent display modes and protected account features.

## Development

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

Create `frontend/.env.local` locally with the Supabase URL, publishable key and Google
provider flag described in the repository README. Environment files are intentionally
not included in source control.

## Checks

```powershell
npx tsc --noEmit
npm run lint
npx next build --webpack
```
