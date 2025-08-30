import "../Style/Header.css";


export default function Header() {
  return (
    <header className="header">
      <img
        src="/header.jpg"
        alt="Header background"
        className="header-bg"
      />
      <div className="overlay"></div>
    </header>
  );
}
