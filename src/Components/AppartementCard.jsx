import React from "react";
import { Link } from "react-router-dom";

function AppartementCard({ logement }) {
  if (!logement) {
    return null; // Ne rien afficher si logement est null ou undefined
  }

  return (
    <Link to={`/logement/${logement.id}`} className="logements__card">
      <article className="logements__card__article">
        <img
          className="logements__card__article__img"
          src={logement.cover}
          alt={logement.title}
        />
        <h2 className="logements__card__article__h2">{logement.title}</h2>
      </article>
    </Link>
  );
}

export default AppartementCard;
