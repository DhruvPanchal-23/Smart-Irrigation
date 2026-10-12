import { useState } from 'react';
import Alert from '../common/Alert.jsx';
import LocationPicker from '../map/LocationPicker.jsx';

export default function FarmForm({ initial, onSubmit, busy }) {
  const [form, setForm] = useState(
    initial || {
      farmName: '',
      cropType: '',
      area: '',
      areaUnit: 'acre',
      location: { address: '', latitude: '', longitude: '' },
    },
  );
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const field = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const location = (event) =>
    setForm({ ...form, location: { ...form.location, [event.target.name]: event.target.value } });
  const mapLocation = (coords) => setForm({ ...form, location: { ...form.location, ...coords } });
  const submit = async (event) => {
    event.preventDefault();
    if (busy || submitting) return;
    setError('');
    const { latitude, longitude } = form.location;
    const lat = Number(latitude),
      lon = Number(longitude);
    if (
      String(latitude).trim() === '' ||
      String(longitude).trim() === '' ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 90 ||
      Math.abs(lon) > 180
    ) {
      setError(
        'Choose a valid location: latitude must be between -90 and 90, and longitude between -180 and 180.',
      );
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        area: Number(form.area),
        location: { ...form.location, latitude: lat, longitude: lon },
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || 'Could not save your farm. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form className="form-card wide" onSubmit={submit}>
      <Alert>{error}</Alert>
      <div className="form-grid">
        <label>
          Farm name
          <input name="farmName" value={form.farmName} onChange={field} required />
        </label>
        <label>
          Crop type
          <input name="cropType" value={form.cropType} onChange={field} required />
        </label>
        <label>
          Area
          <input
            name="area"
            type="number"
            min="0.01"
            step="0.01"
            value={form.area}
            onChange={field}
            required
          />
        </label>
        <label>
          Unit
          <select name="areaUnit" value={form.areaUnit} onChange={field}>
            <option value="acre">Acre</option>
            <option value="hectare">Hectare</option>
          </select>
        </label>
        <label>
          Latitude
          <input
            name="latitude"
            type="number"
            min="-90"
            max="90"
            step="any"
            value={form.location.latitude}
            onChange={location}
            required
          />
        </label>
        <label>
          Longitude
          <input
            name="longitude"
            type="number"
            min="-180"
            max="180"
            step="any"
            value={form.location.longitude}
            onChange={location}
            required
          />
        </label>
        <label className="full">
          Address
          <input name="address" value={form.location.address} onChange={location} />
        </label>
      </div>
      <LocationPicker value={form.location} onChange={mapLocation} />
      <button className="button" disabled={busy || submitting}>
        {busy || submitting ? 'Saving...' : 'Save farm'}
      </button>
    </form>
  );
}
