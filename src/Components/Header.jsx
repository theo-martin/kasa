import ImageHeader from "../Images/LOGO.png";
export default function Header(props) {
  return (
    <>
      <header className="Header">
        <img src={ImageHeader} alt="Logo Kasa" />
        <nav>
          <ul>
            <li>
              <a className={props.linkhome} href="/">
                ACCUEIL
              </a>
            </li>
            <li>
              <a className={props.linkabout} href="/about">
                A PROPOS
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
