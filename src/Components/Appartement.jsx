import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import arrow from "../Images/arrow.png";
import Rate from "./Rate";
import arrow_slider from "../Images/arrow-slider.png";
import Collapse from "./Collapse";
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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === logement?.pictures.length - 1 ? 0 : prevSlide + 1
    );
  }, [logement?.pictures.length]);
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
  }, [logement, nextSlide]);

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
        {/* Slider (uniquement si logement.pictures existe) */}
        {logement.pictures && (
          <div className="appartement__slider">
            <img
              src={logement.pictures[currentSlide]}
              alt={`${logement.title} - ${currentSlide + 1}`}
              className="appartement__slider__image"
            />

            <button
              onClick={prevSlide}
              className="appartement__slider__arrow-left appartement__slider__arrow"
            >
              <img
                className="appartement__slider__arrow-left__left"
                src={arrow_slider}
                alt="Arrow"
              />
            </button>
            <button
              onClick={nextSlide}
              className="appartement__slider__arrow-right appartement__slider__arrow"
            >
              <img
                className="appartement__slider__arrow-right__right"
                src={arrow_slider}
                alt="Arrow"
              />
            </button>
          </div>
        )}
        <div className="appartement__content">
          <h2 className="appartement__content__title">{logement.title}</h2>
          <h3 className="appartement__content__location">
            {logement.location}
          </h3>
          <ul className="appartement__content__tags-list">
            {logement.tags.map((tag, index) => (
              <li
                key={index}
                className="appartement__content__tags-list__tag-item"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="profil">
            <div className="profil__rate">
              <Rate score={logement.rating} />
            </div>
            <div className="profil__content">
              <div className="profil__content__name">
                {logement.host.name.split(" ").map((part, index) => (
                  <p className="profil__content__name__p" key={index}>
                    {part}
                  </p>
                ))}
              </div>

              <img
                src={logement.host.picture}
                className="profil__content__img"
                alt={logement.host.name}
              />
            </div>
          </div>
          <div className="collapse">
            <Collapse
              aboutTitle="Description"
              aboutText={logement.description}
            />
            <Collapse
              aboutTitle="Équipements"
              aboutText={logement.equipments.map((equipment, index) => (
                <li key={index} className="collapse__equipments-item">
                  {equipment}
                </li>
              ))}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Appartement;
