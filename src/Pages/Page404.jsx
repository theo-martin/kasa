import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Image404 from "../Images/Image404.png";
export default function Page404() {
  return (
    <>
      <Header />
      <img className="Img-404" src={Image404} alt="404"></img>
      <div className="Texte404">
        Oups! La page que vous demandez n'existe pas.
      </div>
      <Link to="" className="Link404">
        Retourner sur la page d'accueil
      </Link>
      <Footer />
    </>
  );
}
