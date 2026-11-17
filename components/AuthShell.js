import Link from 'next/link';
import Icon from '@/components/Icon';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="auth">
      <aside className="auth-side">
        <Link href="/" className="brand" style={{ padding: 0 }}><span className="brand-mark" style={{ background: 'rgba(255,255,255,.2)', boxShadow: 'none' }}><Icon name="leaf" size={19} /></span>DineOS</Link>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>Every table, one scan away.</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['QR ordering for every table', 'Live kitchen display', 'Analytics ready when you log in', 'Menus, categories & QR codes in one dashboard'].map((t) => (
              <li key={t} className="row" style={{ gap: '.6rem', flexWrap: 'nowrap' }}><Icon name="check" size={18} />{t}</li>
            ))}
          </ul>
        </div>
        <div style={{ opacity: .75, fontSize: '.85rem' }}>© DineOS</div>
      </aside>
      <main className="auth-main">
        <div className="auth-box">
          <h1 style={{ fontSize: '1.8rem', marginBottom: '.3rem' }}>{title}</h1>
          <p className="muted" style={{ fontSize: '.95rem', marginBottom: '1rem' }}>{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
