import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { RestaurantModel } from '@/lib/models';
import Icon from '@/components/Icon';
import Sidebar from './Sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }) {
  const s = await getSession();
  if (!s || s.role === 'superadmin' || !s.rid) redirect('/login');
  await connectDB();
  const r = await RestaurantModel.findById(s.rid).select('name slug').lean();
  if (!r) redirect('/login');

  return (
    <div className="shell">
      <Sidebar role={s.role} name={s.name || 'User'} restaurant={r.name} />
      <div className="content">
        <div className="topbar no-print">
          <div><b>{r.name}</b> <span className="muted">· /{r.slug}</span></div>
          <div className="row" style={{ gap: '.5rem' }}>
            <Link href={`/${r.slug}?table=1`} target="_blank" className="btn ghost sm"><Icon name="external" size={15} /> View live menu</Link>
            <Link href="/dashboard/qr" className="btn sm"><Icon name="qr" size={15} /> Generate QR codes</Link>
          </div>
        </div>
        <div className="main">{children}</div>
      </div>
    </div>
  );
}
