import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo i opis */}
        <div className="footer-brand">
          <span className="footer-logo">🚗 AutoSalon</span>
          <p>Vaš pouzdani partner za iznajmljivanje vozila</p>
        </div>

        {/* Kontakt */}
        <div className="footer-contact">
          <span>📍 Beograd, Srbija</span>
          <span>📞 +381 11 123 4567</span>
          <span>✉️ info@autosalon.rs</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AutoSalon. Sva prava zadržana.</p>
      </div>
    </footer>
  );
};

export default Footer;