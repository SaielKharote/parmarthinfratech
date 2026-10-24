# Deploying Parmaarth Infratech (PIPL) to Render

This repository is pre-configured with **Render Blueprint (`render.yaml`)** and custom SPA rewrites for instant, zero-configuration deployment.

---

## Method 1: Automatic Blueprint (Recommended — 1 Click)

1. Push this repository to **GitHub** or **GitLab**.
2. Go to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** > **Blueprint**.
4. Select your repository.
5. Render reads `render.yaml` automatically and configures:
   - **Service Name**: `parmaarth-infratech`
   - **Type**: Static Site (Free Global CDN)
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `dist`
   - **SPA Route Rewrite**: `/*` ➔ `/index.html` (prevents 404s on refresh)
6. Click **Apply**. Your site will build and go live at `https://parmaarth-infratech.onrender.com` in ~1 minute.

---

## Method 2: Manual Static Site Creation

If creating manually on Render:
1. In Render Dashboard, click **New +** > **Static Site**.
2. Connect your Git repository.
3. Configure the following fields:
   - **Name**: `parmaarth-infratech` (or your preferred name)
   - **Branch**: `main`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
5. Click **Create Static Site**.

---

## Method 3: Node.js Web Service (Alternative)

If you prefer running a Node/Express container instead of a pure CDN static site:
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Start Command**: `npm start`
- The included `server.js` automatically binds to `process.env.PORT` and serves the production build.
