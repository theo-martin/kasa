/* export default function Banniere() {
  return (
    <>
      <section className="Banniere">
        <h1>Chez vous, partout et ailleurs</h1>
      </section>
    </>
  );
} */
import bg from "../Images/Banniere1.png";

function Banniere() {
  return (
    <section className="banner">
      <img className="banner__img" src={bg} alt="Banner" />
      <h1 className="banner__title">Chez vous, partout et ailleurs</h1>
    </section>
  );
}
export default Banniere;
