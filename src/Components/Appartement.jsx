import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Appartement() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [logement, setLogement] = useState(null);

  useEffect(() => {
    fetch("/logements.json")
      .then((response) => response.json())
      .then((data) => {
        // Trouver le logement correspondant à l'ID
        const logementTrouve = data.find((l) => l.id === id);
        setLogement(logementTrouve);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement du logement :", error)
      );
  }, [id]); // Recharger si l'ID change

  if (!logement) {
    return <div>Chargement en cours...</div>; // Afficher un message de chargement
  }

  return (
    <div className="appartement-container">
      <h1>{logement.title}</h1>
      <div className="images-gallery">
        {logement.pictures.map((picture, index) => (
          <img
            key={index}
            src={picture}
            alt={`${logement.title} - ${index + 1}`}
          />
        ))}
      </div>
      <p>{logement.description}</p>
      {/* ... afficher les autres détails (équipements, localisation, hôte, etc.) */}
    </div>
  );
}

export default Appartement;
