export default function Banniere(props) {
  return (
    <section className={props.sectionbanner}>
      <img className="banner__img" src={props.bg} alt="Banner" />
      <h1 className={props.classtitle}>
        <span className={props.className}>{props.bannerText1}</span>
        <span className={props.bannerText1}>{props.bannerText2}</span>
      </h1>
    </section>
  );
}
