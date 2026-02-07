import { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import type { Vehicle } from '../types/Vehicle';
import api from '../axios'; // axios instance sa baseURL: '/api'
import '../styles/Home.css';

interface PaginationData {
  current_page: number;
  last_page: number;
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [page, setPage] = useState<number>(1);

  const loadVehicles = async (pageNumber: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/vehicles?page=${pageNumber}`);
      // Laravel paginator
      const data = response.data.data;
      setVehicles(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
      });
      setPage(data.current_page);
    } catch (e) {
      console.error(e);
      setError('Vozila ne mogu biti učitana');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles(page);
  }, [page]);

  const goToPage = (p: number) => {
    if (p < 1 || (pagination && p > pagination.last_page)) return;
    loadVehicles(p);
  };

  return (
    <div className="home-container">
      <h1>Lista vozila</h1>

      {loading && <p>Učitavam...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="vehicle-grid">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>

      {pagination && (
        <div className="pagination">
          <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
            Prethodna
          </button>
          <span>
            Strana {page} od {pagination.last_page}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === pagination.last_page}
          >
            Sledeća
          </button>
        </div>
      )}
    </div>
  );
}
