import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";

function Appartement() {
  const { id } = useParams();
  const [logement, setLogement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLogement = async () => {
      try {
        const response = await fetch("/logements.json");
        const data = await response.json();
        const logementTrouve = data.find((l) => l.id === id);
        setLogement(logementTrouve);
      } catch (err) {
        setError(err);
        console.error("Erreur lors du chargement du logement :", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogement();
  }, [id]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === logement?.pictures.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? logement?.pictures.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    if (logement) {
      // Démarrer le défilement automatique uniquement si le logement est chargé
      const interval = setInterval(nextSlide, 10000);
      return () => clearInterval(interval);
    }
  }, [logement, nextSlide]); // Ajouter nextSlide comme dépendance

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!logement) {
    return <div>Logement non trouvé.</div>;
  }

  return (
    <div className="page-appartement">
      <Header />
      <section className="appartement">
        <h1 className="appartement__h1">{logement.title}</h1>

        {/* Slider (uniquement si logement.pictures existe) */}
        {logement.pictures && (
          <div className="appartement__slider">
            <img
              src={logement.pictures[currentSlide]}
              alt={`${logement.title} - ${currentSlide + 1}`}
              className="appartement__slider__image"
            />
            <div className="appartement__slider__arrow">
              <button
                onClick={prevSlide}
                className="appartement__slider__arrow__left"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="appartement__slider__arrow__right"
              >
                →
              </button>
            </div>
          </div>
        )}

        <p className="appartement__p">{logement.description}</p>
      </section>
    </div>
  );
}

export default Appartement;
