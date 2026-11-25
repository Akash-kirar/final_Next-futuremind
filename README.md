# NextFutureMind

NextFutureMind is organized into two clear application areas:

```text
.
├── frontend/   # Next.js 16 web application
└── backend/    # Supabase database migrations and backend documentation
```

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend requires these local environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_GOOGLE_ENABLED`

Store them in `frontend/.env.local`. All `.env*` files are ignored and must never be committed.

## Backend

The backend uses Supabase Auth and Postgres. Versioned SQL is stored in
`backend/supabase/migrations/`. See `backend/README.md` for setup and deployment steps.

## Security

- Supabase secret and service-role keys must never be used in the browser.
- Public profile data is protected with Row Level Security ownership policies.
- Local environment files, Supabase CLI state, dependencies and build output are excluded from Git.
