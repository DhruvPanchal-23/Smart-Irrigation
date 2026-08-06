import { Link, Outlet } from 'react-router-dom';
export default function MainLayout() {
  return <><header className="public-nav"><Link className="brand" to="/">KisanSetu</Link><nav><Link to="/about">About</Link><Link to="/login">Login</Link><Link className="button" to="/register">Get started</Link></nav></header><main><Outlet /></main><footer>Weather-based irrigation guidance for responsible farming.</footer></>;
}
