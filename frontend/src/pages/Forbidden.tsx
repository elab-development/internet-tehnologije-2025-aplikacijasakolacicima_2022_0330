import { useNavigate } from "react-router-dom";

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h1 style={{ fontSize: "80px", margin: 0 }}>403</h1>
      <h2>Zabranjen pristup!</h2>
      <button onClick={() => navigate("/")}>Vrati se na početnu</button>
    </div>
  );
}