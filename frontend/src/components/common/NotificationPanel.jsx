import { useRef, useState } from 'react';
import { FiBell, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NotificationPanel() {
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const close = () => dialog.current.close();

  return <>
    <button className="notification-button" type="button" aria-label="Open notifications" aria-haspopup="dialog" aria-expanded={open} aria-controls="notification-panel" onClick={() => { dialog.current.showModal(); setOpen(true); }}><FiBell aria-hidden="true" /></button>
    <dialog id="notification-panel" ref={dialog} className="account-dialog notification-dialog" aria-labelledby="notification-title" onClose={() => setOpen(false)} onClick={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) close();
    }}>
      <button type="button" className="account-close" onClick={close} aria-label="Close notifications" autoFocus><FiX aria-hidden="true" /></button>
      <h2 id="notification-title">Notifications</h2>
      <div className="notification-empty"><FiBell aria-hidden="true" /><strong>No notifications to display</strong><p>Weather and irrigation alerts are not connected yet.</p></div>
      <Link className="notification-preferences" to="/profile" onClick={close}>Notification preferences</Link>
    </dialog>
  </>;
}
