import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Vehicle } from '../types/Vehicle';
import '../styles/VehicleDetails.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../axios';

interface Rental {
  id: number;
  vehicle_id: number;
  start_date: string;
  end_date: string;
}

interface ApiResponse {
  vehicle: Vehicle;
  rentals: Rental[];
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    // dohvat korisnika
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    api.get<ApiResponse>(`/vehicles/${id}/rentals`)
      .then(res => {
        setVehicle(res.data.vehicle);

        const allReserved: Date[] = [];
        res.data.rentals.forEach(r => {
          let current = new Date(r.start_date);
          const end = new Date(r.end_date);
          while (current <= end) {
            allReserved.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        });
        setReservedDates(allReserved);
      })
      .catch(() => setError('Podaci ne mogu biti učitani'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!vehicle) return <p>Vozilo nije pronađeno</p>;

  const handleReserve = async () => {
    if (!selectedRange) return alert('Izaberi datume!');
    if (!user) return alert('Niste ulogovani!');

    const [start, end] = selectedRange;

    try {
      //await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        //withCredentials: true,
      //});
      //const res = await api.post('/rentals', {
      await api.post('/rentals', {
        vehicle_id: vehicle.id,
        start_date: start.toISOString().split('T')[0],
        end_date: end.toISOString().split('T')[0],
    });

      alert('Uspešno rezervisano!');
      const newReserved: Date[] = [];
      let current = new Date(start);
      while (current <= end) {
        newReserved.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      setReservedDates(prev => [...prev, ...newReserved]);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Došlo je do greške pri rezervaciji.');
    }
  };

  return (
    <div className="vehicle-details">
      <h1>{vehicle.brand} {vehicle.model}</h1>

      <div className="vehicle-info">
        <p><strong>Registracija:</strong> {vehicle.registration_number}</p>
        <p><strong>Godište:</strong> {vehicle.year}</p>
        <p><strong>Boja:</strong> {vehicle.color}</p>
        <p><strong>Gorivo:</strong> {vehicle.fuel_type}</p>
        <p><strong>Menjač:</strong> {vehicle.transmission}</p>
        <p><strong>Broj sedišta:</strong> {vehicle.seats}</p>
        <p><strong>Cena po danu:</strong> {vehicle.daily_price} €</p>
        <p><strong>Status:</strong> {vehicle.status}</p>

        <h3>Izaberite datume rezervacije:</h3>
        <Calendar
          selectRange={true}
          onChange={(range) => setSelectedRange(range as [Date, Date])}
          tileDisabled={({ date }) =>
            reservedDates.some(d => d.toDateString() === date.toDateString())
          }
          tileClassName={({ date }) =>
            reservedDates.some(d => d.toDateString() === date.toDateString()) ? 'reserved' : null
          }
        />

        <button className="button" onClick={handleReserve}>
          Rezerviši
        </button>
      </div>
    </div>
  );
}