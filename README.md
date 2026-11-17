# DineOS: Restaurant Operating System

Next.js 15 · MongoDB (Mongoose) · Cloudinary · Socket.IO · Recharts

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in:
   - `MONGODB_URI` (put a database name in it, e.g. `...mongodb.net/dineos`)
   - `JWT_SECRET` (any long random string)
   - `CLOUDINARY_*` (for dish photo uploads)
3. `npm run seed` (drops and recreates demo data)
4. `npm run dev` → http://localhost:3000  (always use this, not `next dev`; it also runs the live-update server)

Production: `npm run build` then `npm start`.

## Logins (all at /login)
| Role | Email | Password |
|---|---|---|
| Super admin | admin@dineos.com | Admin@123 |
| Owner | owner@spicegarden.com | Owner@123 |
| Staff | staff@spice-garden.com | Staff@123 |
| Other owners | owner@brewhouse.com, owner@pizzapalace.com, owner@dragonwok.com | Owner@123 |
| Suspended demo | owner@oldtown.com | Owner@123 |

## Where things are
- Guest menu: `/spice-garden?table=4`, `/cafe-brew-house`, `/pizza-palace`, `/dragon-wok`
- Dashboard (opens on Analytics & Reports): `/dashboard`
- **Generate QR codes: Dashboard → QR Codes (`/dashboard/qr`)**, also the "Generate QR codes" button in the top bar.
- Super admin console: `/admin`

## Re-theming
Change `--brand`, `--brand-600`, `--brand-700`, `--brand-100`, `--brand-50` in `app/globals.css`, and `BRAND` / `PALETTE` in `lib/theme.js` (charts).
