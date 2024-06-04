import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Banniere from "../Components/Banniere";
import AppartementCard from "../Components/AppartementCard";

export default function Home() {
  const [logements, setLogements] = useState([]);

  useEffect(() => {
    fetch("/logements.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données chargées :", data);
        setLogements(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des logements :", error);
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Banniere />
        <section className="logements">
          {logements.length > 0 ? ( // Condition pour vérifier si logements est vide
            logements.map((logement) => (
              <AppartementCard key={logement.id} logement={logement} />
            ))
          ) : (
            <p>Chargement des logements en cours...</p> // Message en attendant les données
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
