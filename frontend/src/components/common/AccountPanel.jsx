import { useRef, useState } from 'react';
import { FiChevronDown, FiLogOut, FiUser, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

export default function AccountPanel() {
  const auth = useAuth();
  const navigate = useNavigate();
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const name = auth.user?.name || 'Farmer';
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const close = () => dialog.current.close();
  const signOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try { await auth.logout(); }
    finally { navigate('/login', { replace: true }); }
  };

  return <>
    <button className="topbar-user account-trigger" aria-haspopup="dialog" aria-expanded={open} aria-controls="account-panel" onClick={() => { dialog.current.showModal(); setOpen(true); }}>
      <span className="avatar">{initials}</span><span><strong>{name}</strong><small>Farmer account</small></span><FiChevronDown />
    </button>
    <dialog id="account-panel" className="account-dialog" ref={dialog} aria-labelledby="account-panel-name" onClose={() => setOpen(false)} onClick={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) close();
    }}>
      <button className="account-close" onClick={close} aria-label="Close account panel" autoFocus><FiX /></button>
      <div className="account-identity"><span className="avatar">{initials}</span><div><strong id="account-panel-name">{name}</strong><small>{auth.user?.email || 'Farmer account'}</small></div></div>
      <div className="account-actions"><Link to="/profile" onClick={close}><FiUser />Manage your profile</Link><button onClick={signOut} disabled={signingOut}><FiLogOut />{signingOut ? 'Signing out…' : 'Sign out'}</button></div>
    </dialog>
  </>;
}
