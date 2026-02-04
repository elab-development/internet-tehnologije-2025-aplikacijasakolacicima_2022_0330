import type { Vehicle } from '../types/Vehicle';
import '../styles/VehicleCard.css';
import BMWX5 from '../assets/bmw.jpg';
import SKODA from '../assets/skoda.jpg';
import OPEL from '../assets/opel.jpg';
import AUDI from '../assets/audi.jpg';
import MERCEDES from '../assets/mercedes.jpg';
import LearnMoreButton from './LearnMoreButton';
import { useNavigate } from 'react-router-dom';

const vehicleImages: Record<string, string> = {
  'BMW X5': BMWX5,
  'Skoda Karavan': SKODA,
  'Opel Astra': OPEL,
  'Audi A6': AUDI,
  'Mercedes C200': MERCEDES
}

interface Props {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: Props) {
  const imgSrc = vehicleImages[`${vehicle.brand} ${vehicle.model}`] || '/assets/vehicles/default.jpg';
  const navigate = useNavigate();
  return (
    <div className="vehicle-card">

      <img
        src={imgSrc}
        alt={`${vehicle.brand} ${vehicle.model}`}
        style={{ width: '80%', borderRadius: '10px', marginBottom: '10px' }}
      />

      <h2>{vehicle.brand} {vehicle.model}</h2>
      <p>Cena/dan: {vehicle.daily_price} €</p>
      <LearnMoreButton
        text="Saznaj više"
        onClick={() => navigate(`/vehicles/${vehicle.id}`)}/>
    </div>
  );
}
