'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';

const json = { 'Content-Type': 'application/json' };

export default function Admin() {
  const router = useRouter();
  const [d, setD] = useState(null);
  const [msg, setMsg] = useState('');
  const [filter, setFilter] = useState('all');

  const load = async () => {
    const r = await fetch('/api/admin/restaurants');
    if (r.status === 401 || r.status === 403) return router.push('/login');
    setD(await r.json());
  };
  useEffect(() => { load(); }, []);

  async function act(id, action) {
    let reason;
    if (action === 'suspend' || action === 'reject') { reason = prompt('Reason (shown to the restaurant):'); if (reason === null) return; }
    const r = await fetch(`/api/admin/restaurants/${id}`, { method: 'PATCH', headers: json, body: JSON.stringify({ action, reason }) });
    const j = await r.json();
    if (j.tempPassword) setMsg(`Approved. Email isn't configured, so share this temporary password with the owner: ${j.tempPassword}`);
    else if (action === 'approve') setMsg('Approved. A welcome email with login credentials was sent.');
    load();
  }
  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/login'); router.refresh(); }

  if (!d) return <div className="main"><div className="skel" style={{ height: 120, marginBottom: 16 }} /><div className="skel" style={{ height: 320 }} /></div>;
  const s = d.stats;
  const rows = d.restaurants.filter((r) => filter === 'all' || r.status === filter);
  const cards = [['store', 'Restaurants', s.total], ['check', 'Active', s.active], ['clock', 'Pending requests', s.pending], ['bag', 'Total orders', s.orders.toLocaleString('en-IN')], ['wallet', 'Platform GMV', `₹${s.gmv.toLocaleString('en-IN')}`]];

  return (
    <>
      <div className="topbar" style={{ position: 'static' }}>
        <Link href="/" className="brand" style={{ padding: 0 }}><span className="brand-mark"><Icon name="leaf" size={19} /></span>DineOS <span className="badge" style={{ marginLeft: 6 }}>Super Admin</span></Link>
        <button className="btn ghost sm" onClick={logout}><Icon name="logout" size={15} /> Logout</button>
      </div>
      <div className="main" style={{ margin: '0 auto' }}>
        <div className="page-head"><div><h1>Platform Console</h1><p>Approve restaurants and monitor the whole platform.</p></div></div>
        {msg && <div className="card" style={{ background: 'var(--brand-50)', marginBottom: '1rem' }}>{msg}</div>}
        <div className="grid cols-4" style={{ marginBottom: '1rem' }}>
          {cards.map(([ic, k, v]) => <div className="card stat-card" key={k}><div className="stat-ico"><Icon name={ic} size={22} /></div><div><div className="muted">{k}</div><div className="stat">{v}</div></div></div>)}
        </div>
        <div className="card" style={{ overflowX: 'auto' }}>
          <div className="row spread" style={{ marginBottom: '.6rem' }}>
            <h3 style={{ margin: 0 }}>Restaurants</h3>
            <div className="tabs">{['all', 'pending', 'active', 'suspended'].map((f) => <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)} style={{ textTransform: 'capitalize' }}>{f}</button>)}</div>
          </div>
          <table>
            <thead><tr><th>Restaurant</th><th>Owner</th><th>Status</th><th>Orders</th><th>GMV</th><th>Actions</th></tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r._id}>
                <td><b>{r.name}</b><div className="muted">{r.status === 'active' ? <Link href={`/${r.slug}?table=1`} target="_blank" style={{ color: 'var(--brand)' }}>/{r.slug}</Link> : `/${r.slug}`}</div></td>
                <td>{r.ownerName}<div className="muted">{r.email}</div></td>
                <td><span className={`badge ${r.status}`}>{r.status}</span>{r.statusReason && <div className="muted">{r.statusReason}</div>}</td>
                <td>{r.orders}</td><td>₹{r.gmv.toLocaleString('en-IN')}</td>
                <td><div className="row" style={{ gap: '.35rem' }}>
                  {r.status === 'pending' && <><button className="btn sm" onClick={() => act(r._id, 'approve')}>Approve</button><button className="btn danger sm" onClick={() => act(r._id, 'reject')}>Reject</button></>}
                  {r.status === 'active' && <button className="btn ghost sm" style={{ color: 'var(--danger)' }} onClick={() => act(r._id, 'suspend')}>Suspend</button>}
                  {(r.status === 'suspended' || r.status === 'rejected') && <button className="btn sm" onClick={() => act(r._id, 'activate')}>Activate</button>}
                </div></td>
              </tr>))}</tbody>
          </table>
          {!rows.length && <div className="empty">No restaurants in this view.</div>}
        </div>
      </div>
    </>
  );
}
