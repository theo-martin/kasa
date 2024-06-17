import bg from "../Images/Banniere1.png";

function Banniere() {
  return (
    <section className="banner">
      <img className="banner__img" src={bg} alt="Banner" />
      <h1 className="banner__title">
        <span>Chez vous,</span> <span>partout et ailleurs</span>
      </h1>
    </section>
  );
}
export default Banniere;
