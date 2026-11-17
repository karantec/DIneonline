import { connectDB } from '@/lib/db';
import { RestaurantModel, UserModel } from '@/lib/models';
import { json } from '@/lib/auth';

// Public: restaurant registration request (reviewed by super admin)
export async function POST(req) {
  await connectDB();
  const { name, slug, ownerName, email, phone, address } = await req.json();
  if (!name || !email) return json({ error: 'Restaurant name and email are required' }, 400);
  const s = (slug || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (['admin', 'dashboard', 'login', 'register', 'api'].includes(s)) return json({ error: 'That URL slug is reserved' }, 400);
  if (await RestaurantModel.findOne({ slug: s })) return json({ error: 'That URL slug is taken' }, 409);
  if (await UserModel.findOne({ email: email.toLowerCase() })) return json({ error: 'Email already registered' }, 409);
  await RestaurantModel.create({ name, slug: s, ownerName, email, phone, address, status: 'pending' });
  return json({ ok: true });
}
