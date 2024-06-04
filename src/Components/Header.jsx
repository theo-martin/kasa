import ImageHeader from "../Images/LOGO.png";
export default function Header() {
  return (
    <>
      <header className="Header">
        <img src={ImageHeader} alt="Logo Kasa" />
        <nav>
          <ul>
            <li>
              <a href="/">Acceuil</a>
            </li>
            <li>
              <a href="/about">A Propos</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
