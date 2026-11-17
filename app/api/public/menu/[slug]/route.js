import { connectDB } from '@/lib/db';
import { RestaurantModel, CategoryModel, MenuItemModel } from '@/lib/models';
import { json } from '@/lib/auth';

// Public menu for QR guests
export async function GET(_req, { params }) {
  await connectDB();
  const { slug } = await params;
  const r = await RestaurantModel.findOne({ slug: slug.toLowerCase(), status: 'active' }).select('name slug logo cuisine taxRate currency tables hours').lean();
  if (!r) return json({ error: 'Restaurant not found' }, 404);
  const [categories, items] = await Promise.all([
    CategoryModel.find({ restaurant: r._id }).sort('sort').lean(),
    MenuItemModel.find({ restaurant: r._id }).sort('sort').lean(),
  ]);
  return json({ restaurant: r, categories, items });
}
