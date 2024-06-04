import React from "react";
import { Link } from "react-router-dom";

function AppartementCard({ logement }) {
  if (!logement) {
    return null; // Ne rien afficher si logement est null ou undefined
  }

  return (
    <Link to={`/logement/${logement.id}`} className="logements__card">
      <img
        className="logements__card__img"
        src={logement.cover}
        alt={logement.title}
      />
      <figcaption className="logements__card__Figcaption">
        <h2 className="logements__card__Figcaption__h2">{logement.title}</h2>
      </figcaption>
    </Link>
  );
}

export default AppartementCard;
