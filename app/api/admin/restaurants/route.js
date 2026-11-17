import { connectDB } from '@/lib/db';
import { RestaurantModel, OrderModel } from '@/lib/models';
import { requireAuth, json } from '@/lib/auth';

export async function GET() {
  const { error } = await requireAuth(['superadmin']);
  if (error) return error;
  await connectDB();
  const restaurants = await RestaurantModel.find().sort('-createdAt').lean();
  const agg = await OrderModel.aggregate([{ $match: { status: { $ne: 'Cancelled' } } }, { $group: { _id: '$restaurant', gmv: { $sum: '$total' }, orders: { $sum: 1 } } }]);
  const map = Object.fromEntries(agg.map((a) => [String(a._id), a]));
  const list = restaurants.map((r) => ({ ...r, gmv: Math.round(map[String(r._id)]?.gmv || 0), orders: map[String(r._id)]?.orders || 0 }));
  return json({
    restaurants: list,
    stats: {
      total: list.length, active: list.filter((r) => r.status === 'active').length, pending: list.filter((r) => r.status === 'pending').length,
      gmv: list.reduce((s, r) => s + r.gmv, 0), orders: list.reduce((s, r) => s + r.orders, 0),
    },
  });
}
