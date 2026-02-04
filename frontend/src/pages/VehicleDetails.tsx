import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Vehicle } from '../types/Vehicle';
import '../styles/VehicleDetails.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  const [reservedDates, setReservedDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/api/vehicles/${id}/rentals`)
      .then(res => {
        if (!res.ok) throw new Error('Greška pri učitavanju podataka');
        return res.json();
      })
      .then((data: ApiResponse) => {
        setVehicle(data.vehicle);

        // pretvaranje svih postojecih rezervacija u niz
        const allReserved: Date[] = [];
        data.rentals.forEach(r => {
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
            reservedDates.some(d => d.toDateString() === date.toDateString())
              ? 'reserved'
              : null
          }
        />

        <button
          className="button"
          onClick={() => {
            if (!selectedRange) return alert('Izaberi datume!');
            const [start, end] = selectedRange;

            fetch(`http://127.0.0.1:8000/api/rentals`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: 2, //trenutno samo radi za user id=2, nakon sto uradimo login se ovo menja
                vehicle_id: vehicle.id,
                start_date: start.toISOString().split('T')[0],
                end_date: end.toISOString().split('T')[0]
              })
            })
            .then(res => res.json())
            .then(data => {
              if (data.rental) {
                alert('Uspešno rezervisano!');
                
                //dodavanje nogov datuma koji je rezervisan
                const newReserved: Date[] = [];
                let current = new Date(start);
                while (current <= end) {
                  newReserved.push(new Date(current));
                  current.setDate(current.getDate() + 1);
                }
                setReservedDates(prev => [...prev, ...newReserved]);
              } else {
                alert('Došlo je do greške pri rezervaciji.');
              }
            })
            .catch(() => alert('Došlo je do greške pri rezervaciji.'));
          }}
        >
          Rezerviši
        </button>
      </div>
    </div>
  );
}
