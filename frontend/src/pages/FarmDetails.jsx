import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as farms from '../services/farmService.js';
import Loader from '../components/common/Loader.jsx';
import Alert from '../components/common/Alert.jsx';
import { display } from '../utils/formatters.js';

export default function FarmDetails() {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setFarm(null);
    farms
      .getFarmById(farmId)
      .then((data) => {
        if (active) setFarm(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || 'Could not load this farm.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [farmId]);
  const remove = async () => {
    if (deleting || !window.confirm('Delete this farm and all of its history?')) return;
    setDeleting(true);
    setError('');
    try {
      await farms.deleteFarm(farmId);
      navigate('/farms');
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || 'Could not delete this farm. Please try again.',
      );
    } finally {
      setDeleting(false);
    }
  };
  if (loading) return <Loader />;
  if (!farm)
    return (
      <>
        <Alert>{error || 'Farm not found.'}</Alert>
        <Link to="/farms">Back to my farms</Link>
      </>
    );
  return (
    <>
      <Alert>{error}</Alert>
      <div className="page-head">
        <div>
          <span className="eyebrow">Farm</span>
          <h1>{farm.farmName}</h1>
        </div>
        <button className="danger" disabled={deleting} onClick={remove}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
      <div className="grid three">
        <article className="card">
          <h2>Crop</h2>
          <p>{display(farm.cropType)}</p>
        </article>
        <article className="card">
          <h2>Area</h2>
          <p>
            {display(farm.area)} {display(farm.areaUnit)}
          </p>
        </article>
        <article className="card">
          <h2>Location</h2>
          <p>
            {display(farm.location?.latitude)}, {display(farm.location?.longitude)}
          </p>
        </article>
      </div>
      <div className="actions">
        <Link className="button" to={'/weather?farm=' + farmId}>
          Check weather
        </Link>
        <Link className="button secondary" to={'/recommendation?farm=' + farmId}>
          Get recommendation
        </Link>
      </div>
    </>
  );
}
