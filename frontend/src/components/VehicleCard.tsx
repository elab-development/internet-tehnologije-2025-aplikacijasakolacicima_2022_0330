import type { Vehicle } from "../types/Vehicle";
import "../styles/VehicleCard.css";
import BMWX5 from "../assets/bmw.jpg";
import SKODA from "../assets/skoda.jpg";
import OPEL from "../assets/opel.jpg";
import AUDI from "../assets/audi.jpg";
import MERCEDES from "../assets/mercedes.jpg";
import LearnMoreButton from "./LearnMoreButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios";

const vehicleImages: Record<string, string> = {
    "BMW X5": BMWX5,
    "Skoda Karavan": SKODA,
    "Opel Astra": OPEL,
    "Audi A6": AUDI,
    "Mercedes C200": MERCEDES,
};

interface Props {
    vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: Props) {
    const imgSrc =
        vehicleImages[`${vehicle.brand} ${vehicle.model}`] ||
        "/assets/vehicles/default.jpg";
    const navigate = useNavigate();

    const [eurPrice, setEurPrice] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const convertCurrency = async () => {
        if (eurPrice) {
            setEurPrice(null);
            return;
        }

        setLoading(true);
        try {
            const res = await api.get(
                `/convert-rsd-to-eur?amount=${vehicle.daily_price}`,
            );
            if (res.data && res.data.result) {
                setEurPrice(res.data.result.toFixed(2));
            }
        } catch (err) {
            console.error("Greška pri konverziji", err);
            alert("Nije moguće učitati kurs trenutno.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-card">
            <img
                src={imgSrc}
                alt={`${vehicle.brand} ${vehicle.model}`}
                style={{
                    width: "80%",
                    borderRadius: "10px",
                    marginBottom: "10px",
                }}
            />

            <h2>
                {vehicle.brand} {vehicle.model}
            </h2>

            <div className="price-section">
                {eurPrice ? (
                    <p>
                        Cena/dan:{" "}
                        <strong style={{ color: "#2ecc71" }}>
                            {eurPrice} EUR
                        </strong>
                    </p>
                ) : (
                    <p>
                        Cena/dan: <strong>{vehicle.daily_price} RSD</strong>
                    </p>
                )}

                <button
                    onClick={convertCurrency}
                    className="convert-btn"
                    disabled={loading}
                >
                    {loading
                        ? "Učitavanje..."
                        : eurPrice
                          ? "Prikaži u RSD"
                          : "Prikaži u EUR"}
                </button>
            </div>

            <LearnMoreButton
                text="Saznaj više"
                onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            />
        </div>
    );
}
