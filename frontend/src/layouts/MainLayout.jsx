import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiDroplet, FiArrowUpRight } from 'react-icons/fi';
import ThemeToggle from '../components/common/ThemeToggle.jsx';

export default function MainLayout() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isHome = pathname === '/';
  return (
    <div className={isHome ? 'landing-layout' : undefined}>
      {isAuthPage && (
        <Link className="auth-brand" to="/" aria-label="KisanSetu home">
          <span>
            <FiDroplet aria-hidden="true" />
          </span>
          KisanSetu
        </Link>
      )}
      {isAuthPage && <ThemeToggle className="auth-theme-toggle" />}
      {!isAuthPage && (
        <header className={`public-nav${isHome ? ' landing-nav' : ''}`}>
          <Link className="brand" to="/">
            <span className="landing-brand-icon">
              <FiDroplet aria-hidden="true" />
            </span>
            KisanSetu
          </Link>
          <nav aria-label="Account navigation">
            {!isHome && <ThemeToggle />}
            {!isHome && !isAuthPage && <a href="/#about">About</a>}
            {!isAuthPage && <Link to="/login">Log in</Link>}
            {pathname !== '/register' && (
              <Link className="button" to="/register">
                {isHome ? 'Sign up' : 'Get started'}
                {isHome && <FiArrowUpRight aria-hidden="true" />}
              </Link>
            )}
          </nav>
        </header>
      )}
      <main>
        <Outlet />
      </main>
      {!isAuthPage && !isHome && (
        <footer>Weather-based irrigation guidance for responsible farming.</footer>
      )}
    </div>
  );
}
