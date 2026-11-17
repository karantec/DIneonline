import Link from 'next/link';
import Icon from '@/components/Icon';
import QRDecor from '@/components/QRDecor';

export const metadata = { title: 'DineOS — QR ordering, kitchen display & analytics for restaurants' };

const FEATURES = [
  ['qr', 'Table QR ordering', 'Guests scan the code on their table, browse the live menu and order. No app, no waiting for a waiter.'],
  ['bolt', 'Live kitchen display', 'Orders hit the kitchen instantly with a chime. Move them across a Kanban board or a compact table.'],
  ['utensils', 'Menu engineering', 'Sizes, add-ons, veg / non-veg tags, photos and kitchen notes. Switch a dish off and every guest menu updates.'],
  ['chart', 'Analytics & reports', 'Revenue trends, peak hours, best sellers and order mix, right on your dashboard when you log in.'],
  ['store', 'Multi-restaurant platform', 'One platform, many restaurants. Each gets its own menu link, staff logins and data.'],
  ['receipt', 'Bills & PDF receipts', 'Tax is calculated automatically. Download a receipt for any order with one click.'],
];

const STEPS = [
  ['Register', 'Submit your restaurant details. It takes a minute.'],
  ['Get approved', 'Our team reviews it and emails your login.'],
  ['Build your menu', 'Add categories and dishes in the dashboard.'],
  ['Generate QR codes', 'Open QR Codes in your dashboard, pick your tables and print.'],
];

export default function Home() {
  return (
    <>
      <header className="l-nav">
        <div className="l-nav-in">
          <Link href="/" className="brand" style={{ padding: 0 }}><span className="brand-mark"><Icon name="leaf" size={19} /></span>DineOS</Link>
          <nav className="l-links">
            <a href="#features">Features</a><a href="#how">How it works</a><a href="#qr">QR codes</a><a href="#roles">Who it's for</a><a href="#demo">Live demo</a>
          </nav>
          <div className="row" style={{ gap: '.5rem' }}>
            <Link href="/login" className="btn ghost sm">Login</Link>
            <Link href="/register" className="btn sm">Get started</Link>
          </div>
        </div>
      </header>

      <section className="l-hero">
        <div className="l-wrap l-hero-grid">
          <div>
            <span className="eyebrow"><Icon name="bolt" size={14} /> Real-time ordering for modern restaurants</span>
            <h1>Scan. Order. <em>Served.</em><br />Run your whole restaurant from one place.</h1>
            <p className="lead">DineOS gives every table its own QR code, sends orders straight to your kitchen, and turns your sales into clear reports, all in one platform.</p>
            <div className="row">
              <Link href="/register" className="btn lg">Register your restaurant <Icon name="arrow" size={18} /></Link>
              <Link href="/spice-garden?table=4" className="btn ghost lg"><Icon name="phone" size={18} /> Try the guest menu</Link>
            </div>
            <div className="l-trust">
              <div><b>4</b><span>Demo restaurants</span></div>
              <div><b>Live</b><span>Kitchen sync</span></div>
              <div><b>0</b><span>App downloads</span></div>
            </div>
          </div>

          <div className="phone-stage">
            <div className="float-card a"><span className="stat-ico" style={{ width: 38, height: 38 }}><Icon name="bell" size={18} /></span><div><b>New order #1042</b><div className="muted">Table 4 · 3 items</div></div></div>
            <div className="phone"><div className="phone-screen">
              <div className="ph-hero">Spice Garden<small>Table 4 · Scan & order</small></div>
              {[['🧀', 'Paneer Tikka', '₹249'], ['🍗', 'Butter Chicken', '₹349'], ['🍛', 'Veg Biryani', '₹269'], ['🫓', 'Garlic Naan', '₹69'], ['🍮', 'Gulab Jamun', '₹99'], ['🍵', 'Masala Chai', '₹59']].map(([e, n, p]) => (
                <div className="ph-item" key={n}><div className="e">{e}</div><div style={{ flex: 1 }}><b>{n}</b><span className="muted">Freshly prepared</span></div><b style={{ color: 'var(--brand)' }}>{p}</b></div>
              ))}
            </div></div>
            <div className="float-card b"><span className="stat-ico" style={{ width: 38, height: 38 }}><Icon name="trending" size={18} /></span><div><b>₹48,250 today</b><div className="muted">+18% vs last week</div></div></div>
          </div>
        </div>
      </section>

      <section id="features" className="l-section alt">
        <div className="l-wrap">
          <div className="l-title"><h2>Everything a restaurant needs, nothing it doesn't</h2><p>From the guest's table to the owner's dashboard, DineOS covers the full dining flow.</p></div>
          <div className="grid cols-3">
            {FEATURES.map(([ic, t, d]) => (
              <div className="card feat" key={t}><div className="stat-ico"><Icon name={ic} size={22} /></div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="l-section">
        <div className="l-wrap">
          <div className="l-title"><h2>Live in four steps</h2><p>From sign-up to your first scanned order in an afternoon.</p></div>
          <div className="how">{STEPS.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div>
      </section>

      <section id="qr" className="l-section" style={{ paddingTop: 0 }}>
        <div className="l-wrap">
          <div className="l-qr">
            <div>
              <span className="eyebrow" style={{ color: 'var(--brand-700)' }}><Icon name="qr" size={14} /> QR Studio</span>
              <h2 style={{ marginTop: '1rem' }}>Where do I generate my QR codes?</h2>
              <p style={{ opacity: .9 }}>Right inside your dashboard. Pick a table range, choose a colour, then download each QR as a PNG or print them all as ready-to-place table cards.</p>
              <div className="path"><span>Login</span><Icon name="arrow" size={15} /><span>Dashboard</span><Icon name="arrow" size={15} /><span>QR Codes</span></div>
              <div className="row">
                <Link href="/dashboard/qr" className="btn light lg"><Icon name="qr" size={18} /> Open QR Studio</Link>
                <Link href="/login" className="btn outline-light lg">Login first</Link>
              </div>
            </div>
            <div className="qr-demo">
              <div className="h">Spice Garden</div>
              <QRDecor size={210} />
              <h2 style={{ margin: '.4rem 0 0' }}>Table 4</h2>
              <div className="muted">Scan to view menu & order</div>
            </div>
          </div>
        </div>
      </section>

      <section id="roles" className="l-section alt">
        <div className="l-wrap">
          <div className="l-title"><h2>Built for everyone in the building</h2></div>
          <div className="roles">
            {[['users', 'Guests', ['Scan, browse, order', 'Customise size & add-ons', 'Track the order live']],
              ['flame', 'Kitchen & staff', ['Live order board with chime', 'Move orders through every stage', 'Mark dishes sold out']],
              ['chart', 'Owners', ['Analytics & reports by default', 'Menu, categories, QR codes', 'Tax, currency & hours']],
              ['shield', 'Platform admin', ['Approve new restaurants', 'Suspend or reactivate', 'Platform-wide GMV']]].map(([ic, t, li]) => (
              <div className="card role-card" key={t}><div className="stat-ico" style={{ marginBottom: '.8rem' }}><Icon name={ic} size={22} /></div><h3>{t}</h3><ul>{li.map((x) => <li key={x}>{x}</li>)}</ul></div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="l-section">
        <div className="l-wrap">
          <div className="l-title"><h2>Try it right now</h2><p>The demo data is pre-loaded. Open a guest menu, or log in as any role.</p></div>
          <div className="grid cols-2">
            <div className="card">
              <h3>Guest menus</h3>
              <div className="grid" style={{ gap: '.6rem', marginTop: '.6rem' }}>
                {[['/spice-garden?table=4', 'Spice Garden', 'North Indian'], ['/cafe-brew-house?table=2', 'Cafe Brew House', 'Coffee & snacks'], ['/pizza-palace?table=7', 'Pizza Palace', 'Italian'], ['/dragon-wok?table=3', 'Dragon Wok', 'Indo-Chinese']].map(([h, n, c]) => (
                  <Link key={h} href={h} className="btn ghost" style={{ justifyContent: 'space-between' }}><span><b>{n}</b> <span className="muted">· {c}</span></span><Icon name="arrow" size={16} /></Link>
                ))}
              </div>
            </div>
            <div className="card" style={{ overflowX: 'auto' }}>
              <h3>Demo logins</h3>
              <table className="demo-table"><thead><tr><th>Role</th><th>Email</th><th>Password</th></tr></thead><tbody>
                <tr><td>Super admin</td><td><code>admin@dineos.com</code></td><td><code>Admin@123</code></td></tr>
                <tr><td>Owner</td><td><code>owner@spicegarden.com</code></td><td><code>Owner@123</code></td></tr>
                <tr><td>Staff</td><td><code>staff@spice-garden.com</code></td><td><code>Staff@123</code></td></tr>
              </tbody></table>
              <Link href="/login" className="btn" style={{ marginTop: '1rem' }}>Go to login <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="l-cta">
        <div className="l-wrap">
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>Ready to put your menu on every table?</h2>
          <p className="muted" style={{ fontSize: '1.05rem' }}>Register your restaurant and start taking QR orders today.</p>
          <Link href="/register" className="btn lg">Register your restaurant <Icon name="arrow" size={18} /></Link>
        </div>
      </section>

      <footer className="l-foot"><div className="l-wrap row spread"><span>© {new Date().getFullYear()} DineOS · Restaurant Operating System</span><span className="row" style={{ gap: '1.2rem' }}><Link href="/login">Login</Link><Link href="/register">Register</Link></span></div></footer>
    </>
  );
}
