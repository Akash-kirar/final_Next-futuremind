# NextFutureMind Backend

The backend is hosted on Supabase and provides:

- Email/password and Google OAuth authentication
- Cookie-based server-side sessions for the Next.js frontend
- A `public.profiles` table linked to `auth.users`
- Row Level Security so users can only access their own profile
- An internal trigger that creates a profile when an auth user is created

## Database migrations

Migration files live in `supabase/migrations/` and match the migration history of the
connected Supabase project.

For a new local Supabase workspace, install the current Supabase CLI and run:

```powershell
cd backend
supabase init
supabase migration list --local
supabase db reset
```

To connect and deploy to a hosted project, authenticate and link the project first,
then review the migration before running the current CLI's remote push command.

Never commit access tokens, database passwords, secret keys, service-role keys or any
`.env` file. The frontend must use only a Supabase publishable key.
