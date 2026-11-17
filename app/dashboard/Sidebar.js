'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

// Analytics & Reports is first (and the default landing page). Billing / verification / notifications intentionally removed.
const NAV = [
  ['/dashboard/analytics', 'Analytics & Reports', 'chart', ['owner', 'staff']],
  ['/dashboard/orders', 'Orders (KDS)', 'receipt', ['owner', 'staff']],
  ['/dashboard/menu', 'Menu', 'utensils', ['owner', 'staff']],
  ['/dashboard/categories', 'Categories', 'tag', ['owner']],
  ['/dashboard/qr', 'QR Codes', 'qr', ['owner', 'staff'], 'NEW'],
  ['/dashboard/settings', 'Settings', 'settings', ['owner']],
];

export default function Sidebar({ role, name, restaurant }) {
  const path = usePathname();
  const router = useRouter();
  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); router.refresh(); }
  return (
    <aside className="sidebar no-print">
      <Link href="/" className="brand"><span className="brand-mark"><Icon name="leaf" size={19} /></span>DineOS</Link>
      <div className="nav-label">Restaurant</div>
      {NAV.filter((n) => n[3].includes(role)).map(([href, label, icon, , pill]) => (
        <Link key={href} href={href} prefetch className={`nav ${path === href ? 'active' : ''}`}>
          <Icon name={icon} size={18} />{label}{pill && <span className="pill">{pill}</span>}
        </Link>
      ))}
      <div className="side-foot">
        <div className="row" style={{ flexWrap: 'nowrap', marginBottom: '.6rem' }}>
          <div className="avatar">{(name || '?')[0].toUpperCase()}</div>
          <div style={{ minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: '.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div><div className="muted" style={{ textTransform: 'capitalize' }}>{role} · {restaurant}</div></div>
        </div>
        <button className="btn ghost sm block" onClick={logout}><Icon name="logout" size={15} /> Logout</button>
      </div>
    </aside>
  );
}
