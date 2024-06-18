import { useState, useRef } from "react";
import arrow from "../Images/arrow.png";
export default function Collapse(props) {
  const [toggle, setToggle] = useState(false); //   toggle est defini en false par défaut
  const contentRef = useRef(null);
  const toggleState = () => {
    // toggleState  modifie la valeur toggle au clic
    setToggle(!toggle);
  };

  return (
    <button className="collapse__button" onClick={toggleState}>
      <div className="collapse__button__container-title">
        <img
          className={
            toggle
              ? "collapse__arrow collapse__arrow-down"
              : "collapse__arrow collapse__arrow-up"
          }
          src={arrow}
          alt="Arrow"
        />
        <h3 className="collapse__button__container-title__h3">
          {" "}
          {props.aboutTitle}
        </h3>
      </div>
      <div className="collapse__text-container">
        <p
          ref={contentRef}
          className={
            toggle
              ? "collapse__text-container__content collapse__text-container__content-animation"
              : "collapse__text-container__content"
          }
        >
          {props.aboutText}
        </p>
      </div>
    </button>
  );
}
