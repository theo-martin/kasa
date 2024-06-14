import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import arrow from "../Images/arrow.png";
import starFull from "../Images/starFull.png";
import starEmpty from "../Images/starEmpty.png";

function Appartement() {
  const { id } = useParams();
  const [logement, setLogement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isEquipmentsOpen, setIsEquipmentsOpen] = useState(false);

  // Fonctions pour gérer les clics
  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const toggleEquipments = () => {
    setIsEquipmentsOpen(!isEquipmentsOpen);
  };
  const contentRef = useRef(null); // reférence au contenu pour accéder a sa hauteur

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
                src={arrow}
                alt="Arrow"
              />
            </button>
            <button
              onClick={nextSlide}
              className="appartement__slider__arrow-right appartement__slider__arrow"
            >
              <img
                className="appartement__slider__arrow-right__right"
                src={arrow}
                alt="Arrow"
              />
            </button>
          </div>
        )}
        <div className="collapse">
          <div className="collapse">
            <h2 className="collapse__title">{logement.title}</h2>
            <h3>{logement.location}</h3>
            <ul className="tags-list">
              {logement.tags.map((tag, index) => (
                <li key={index} className="tag-item">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="profil">
              <div className="rate">
                {/* Genere les etoiles en fonction de la note */}
                {stars.map((star) =>
                  logement.rate >= star ? (
                    // Affiche une etoile pleine si la note est superieur ou egal a l'index de l'etoile
                    <img
                      key={star}
                      className="rate__star"
                      src={starFull}
                      alt="Étoile pleine, 1 point"
                    />
                  ) : (
                    // Sinon, affiche une etoile vide
                    <img
                      key={star}
                      className="rate__star"
                      src={starEmpty}
                      alt="Étoile vide, 0 point"
                    />
                  )
                )}
              </div>
              <div className="profil__name">
                {logement.host.name.split(" ").map((part, index) => (
                  <p className="profil__name__p" key={index}>
                    {part}
                  </p>
                ))}
              </div>
              <img
                src={logement.host.picture}
                className="profil__img"
                alt={logement.host.name}
              />
            </div>

            <button className="collapse__button" onClick={toggleDescription}>
              <img
                className={
                  isDescriptionOpen
                    ? "collapse__arrow collapse__arrow-down"
                    : "collapse__arrow collapse__arrow-up"
                }
                src={arrow}
                alt="Arrow"
              />
              Description
              <p
                ref={contentRef}
                className={
                  isDescriptionOpen
                    ? "collapse__content collapse__content-animation"
                    : "collapse__content"
                }
              >
                {logement.description}
                {logement.children}
              </p>
            </button>
            <button className="collapse__button" onClick={toggleEquipments}>
              <img
                className={
                  isEquipmentsOpen
                    ? "collapse__arrow collapse__arrow-down"
                    : "collapse__arrow collapse__arrow-up"
                }
                src={arrow}
                alt="Arrow"
              />
              Equipments
              <ul
                ref={contentRef}
                className={
                  isEquipmentsOpen
                    ? "collapse__content collapse__content-animation"
                    : "collapse__content"
                }
              >
                {logement.equipments.map((equipment, index) => (
                  <li key={index} className="equipments-item">
                    {equipment}
                  </li>
                ))}
                {/* {logement.equipments} */}
                {/* {logement.children} */}
              </ul>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Appartement;
