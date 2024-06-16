import bg from "../Images/Banniere2.png";

function BanniereAbout() {
  return (
    <section className="banner">
      <img className="banner__img" src={bg} alt="Banner" />
      <h1 className="banner__title">Chez vous, partout et ailleurs</h1>
    </section>
  );
}
export default BanniereAbout;
