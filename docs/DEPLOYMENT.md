# Deployment

bookVault is a Next.js 15 static + SSR app. It deploys to any Node.js platform that supports `next start`, or as a fully static export. **Vercel is recommended** — zero-config, edge middleware support, and automatic preview deployments.

---

## Vercel (recommended)

### One-click deploy

1. Push your branch to GitHub (already done).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → select `bookVault`.
3. Vercel auto-detects Next.js. Leave framework preset as **Next.js**.
4. Add environment variables (see below).
5. Click **Deploy**.

### Environment variables in Vercel

In **Project Settings → Environment Variables**, add:

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJh...` | Production, Preview, Development |

> Without these the app runs in demo mode (browse, cart, reader work; auth pages show graceful UI but Supabase calls are skipped).

### Build settings (auto-detected, no changes needed)

| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 18.x or 20.x |

### Custom domain

In **Project Settings → Domains**, add your domain and follow the DNS instructions. Vercel provides a free SSL certificate automatically.

### Preview deployments

Every pull request gets a unique preview URL automatically. No extra configuration needed.

---

## Render

Render supports Next.js via its **Web Service** type.

### Setup

1. Go to [render.com](https://render.com) → **New → Web Service**.
2. Connect your GitHub repo (`bookVault`).
3. Configure:

| Setting | Value |
|---|---|
| Environment | **Node** |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start` |
| Node Version | 18+ |

4. Add environment variables in **Environment → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `PORT` → `3000` (Render injects `$PORT`; Next.js uses it automatically)

5. Click **Create Web Service**.

### Render notes

- Render's free tier spins down after inactivity — use the **Starter** plan for always-on.
- Static assets are served by Render's CDN automatically.
- Render does not support Edge Runtime middleware — the Supabase auth middleware in `middleware.ts` runs on Node runtime (compatible).

---

## Self-hosted (VPS / Docker)

### Without Docker

```bash
git clone https://github.com/thunderbuddies462/bookVault.git
cd bookVault
npm install
npm run build

# set env vars
export NEXT_PUBLIC_SUPABASE_URL=...
export NEXT_PUBLIC_SUPABASE_ANON_KEY=...

npm run start   # listens on port 3000
```

Use **nginx** or **Caddy** as a reverse proxy to expose port 80/443.

**Minimal nginx config:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Use Certbot for SSL: `certbot --nginx -d yourdomain.com`.

### With Docker

Create a `Dockerfile` at the project root:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Enable standalone output in `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  output: 'standalone',
  // ...existing config
}
```

Build and run:
```bash
docker build -t bookvault .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  bookvault
```

---

## Supabase setup

If you want auth to work in production:

1. Create a project at [supabase.com](https://supabase.com).
2. In **Authentication → URL Configuration**, set:
   - **Site URL**: your production domain (e.g. `https://bookvault.vercel.app`)
   - **Redirect URLs**: add `https://yourdomain.com/**`
3. Copy **Project URL** and **anon/public key** from **Project Settings → API**.
4. Add both to your deployment's environment variables.

No database tables or migrations are needed for the current feature set — Supabase is used for authentication only.

---

## Post-deployment checklist

- [ ] Environment variables set in deployment platform
- [ ] Supabase redirect URLs updated to production domain
- [ ] `npm run build` passes locally before pushing
- [ ] `/checkout` redirects to `/auth/login` for unauthenticated users
- [ ] Cover images load (Open Library CDN — no API key required)
- [ ] Currency selector updates prices live
- [ ] Reader opens at `/read/1` (or any seeded book ID)
