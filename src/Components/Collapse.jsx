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
      <img
        className={
          toggle
            ? "collapse__arrow collapse__arrow-down"
            : "collapse__arrow collapse__arrow-up"
        }
        src={arrow}
        alt="Arrow"
      />
      <h3> {props.aboutTitle}</h3>

      <p
        ref={contentRef}
        className={
          toggle
            ? "collapse__content collapse__content-animation"
            : "collapse__content"
        }
      >
        {props.aboutText}
      </p>
    </button>
  );
}
