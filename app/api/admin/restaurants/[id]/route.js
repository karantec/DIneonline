import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { connectDB } from '@/lib/db';
import { RestaurantModel, UserModel } from '@/lib/models';
import { requireAuth, json } from '@/lib/auth';
import { sendEmail, welcomeEmail } from '@/lib/email';

// body: { action: 'approve' | 'reject' | 'suspend' | 'activate', reason? }
export async function PATCH(req, { params }) {
  const { error } = await requireAuth(['superadmin']);
  if (error) return error;
  await connectDB();
  const { id } = await params;
  const { action, reason } = await req.json();
  const r = await RestaurantModel.findById(id);
  if (!r) return json({ error: 'Not found' }, 404);

  if (action === 'approve') {
    r.status = 'active';
    let tempPassword = null;
    if (!(await UserModel.findOne({ restaurant: r._id, role: 'owner' }))) {
      tempPassword = crypto.randomBytes(5).toString('hex');
      await UserModel.create({ name: r.ownerName || r.name, email: r.email, password: await bcrypt.hash(tempPassword, 10), role: 'owner', restaurant: r._id });
      const mail = welcomeEmail({ name: r.ownerName || 'there', restaurant: r.name, email: r.email, password: tempPassword, url: process.env.NEXT_PUBLIC_APP_URL || '' });
      const sent = await sendEmail({ to: r.email, ...mail });
      await r.save();
      // If email isn't configured, return credentials so the admin can pass them on manually
      return json({ restaurant: r, emailSent: sent, ...(sent ? {} : { tempPassword }) });
    }
  } else if (action === 'reject') { r.status = 'rejected'; r.statusReason = reason; }
  else if (action === 'suspend') { r.status = 'suspended'; r.statusReason = reason; }
  else if (action === 'activate') { r.status = 'active'; r.statusReason = undefined; }
  else return json({ error: 'Bad action' }, 400);
  await r.save();
  return json({ restaurant: r });
}
