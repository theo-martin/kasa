import starFull from "../Images/starFull.png";
import starEmpty from "../Images/starEmpty.png";

export default function Rate({ score }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      {stars.map((stars) =>
        score >= stars ? (
          // Affiche une etoile pleine si la note est superieur ou egal a l'index de l'etoile
          <img
            key={stars.toString()}
            className="profil__rate__star"
            src={starFull}
            alt="Étoile pleine, 1 point"
          />
        ) : (
          // Sinon, affiche une etoile vide
          <img
            key={stars.toString()}
            className="profil__rate__star"
            src={starEmpty}
            alt="Étoile vide, 0 point"
          />
        )
      )}
    </div>
  );
}
