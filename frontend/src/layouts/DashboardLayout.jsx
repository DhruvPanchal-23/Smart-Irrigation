import { useEffect, useState } from 'react';
import { FiCloud, FiClock, FiDroplet, FiGrid, FiMap, FiMenu, FiPlusSquare, FiUser, FiX } from 'react-icons/fi';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import AccountPanel from '../components/common/AccountPanel.jsx';
import NotificationPanel from '../components/common/NotificationPanel.jsx';
import ThemeToggle from '../components/common/ThemeToggle.jsx';

const links = [
  ['/dashboard', 'Overview', FiGrid], ['/farms', 'My farms', FiMap], ['/farms/add', 'Add farm', FiPlusSquare],
  ['/weather', 'Weather', FiCloud], ['/recommendation', 'Recommendation', FiDroplet],
  ['/history', 'History', FiClock], ['/profile', 'Profile', FiUser],
];
const pageNames = { '/dashboard': 'Dashboard', '/farms': 'My farms', '/farms/add': 'Add farm', '/weather': 'Weather', '/recommendation': 'Recommendation', '/history': 'History', '/profile': 'Profile' };

export default function DashboardLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.body.classList.add('navigation-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('navigation-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return <div className="shell dashboard-shell">
    <aside className={menuOpen ? 'open' : ''} aria-label="Dashboard navigation" aria-hidden={!menuOpen ? undefined : false}>
      <div className="sidebar-brand"><span className="brand-mark"><FiDroplet /></span><div><strong>KisanSetu</strong><small>Water Smart, Farm Smart</small></div><button className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><FiX /></button></div>
      <nav><span className="nav-label">Workspace</span>{links.map(([to, label, Icon]) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}><Icon /><span>{label}</span></NavLink>)}</nav>
    </aside>
    {menuOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <section className="workspace">
      <header className="topbar"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><FiMenu /></button><div><span>Workspace</span><strong>{pageNames[location.pathname] || 'Farm details'}</strong></div><div className="topbar-actions"><ThemeToggle /><NotificationPanel /><AccountPanel /></div></header>
      <main className="page"><Outlet /></main>
    </section>
  </div>;
}
