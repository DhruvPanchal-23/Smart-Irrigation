import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiDroplet, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import useAuth from '../hooks/useAuth.js';
import Alert from '../components/common/Alert.jsx';

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const change = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await auth.login(form);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="register-page registration-page">
      <div className="register-story">
        <div className="register-story-content">
          <span className="register-story-mark"><FiDroplet /></span>
          <p className="register-story-kicker">Weather-aware farming</p>
          <h1>Welcome back<br />to KisanSetu.</h1>
          <p className="register-story-copy">
            Turn changing weather into clearer irrigation decisions for every field you manage.
          </p>
          <div className="login-story-stat">
            <strong>Plan with confidence</strong>
            <span>Farm weather, recommendations, and history in one place.</span>
          </div>
        </div>
      </div>

      <div className="register-form-panel">
        <div className="register-form-wrap">
          <div className="register-heading">
            <span className="eyebrow">Farmer portal</span>
            <h2>Welcome back</h2>
            <p>New to KisanSetu? <Link to="/register">Create your account</Link></p>
          </div>

          <form className="register-form" onSubmit={submit}>
            <Alert>{error}</Alert>

            <label className="register-field">
              <span>Email address</span>
              <span className="register-input-wrap">
                <FiMail aria-hidden="true" />
                <input name="email" type="email" value={form.email} onChange={change} autoComplete="email" placeholder="farmer@example.com" required />
              </span>
            </label>

            <label className="register-field">
              <span>Password</span>
              <span className="register-input-wrap">
                <FiLock aria-hidden="true" />
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={change} autoComplete="current-password" placeholder="Enter your password" required />
                <button className="register-password-toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </span>
            </label>

            <button className="register-submit" disabled={busy} type="submit">
              <span>{busy ? 'Signing in...' : 'Sign in to dashboard'}</span>
              {!busy && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
