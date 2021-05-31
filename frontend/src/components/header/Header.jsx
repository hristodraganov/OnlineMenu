import React, { useContext, useEffect, useState } from "react";
import { uuid } from "uuidv4";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faGlassMartini,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import translate from "../../i18n/translate";
import { LanguageContext } from "../../Context/LanguageContext";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
function Header() {
  const [categories, setCategories] = useState([]);
  const [cart] = useContext(CartContext);
  const [checked, setChecked] = useState(false);
  //eslint-disable-next-line
  const [language, setLanguage] = useContext(LanguageContext);
  const [langCheck, setLangCheck] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/category/get")
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <header>
      <div className="hamburger-mobile" id="mobile-nav">
        <input
          type="checkbox"
          checked={checked}
          className="toggle"
          onClick={handleCheck}
          readOnly
        ></input>
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            <div>
              <ul>
                {categories.map((item) => (
                  <Link to={`/${item.name}`}>
                    <li
                      key={uuid()}
                      onClick={handleCheck}
                      className="burger-link"
                    >
                      {translate(item.name)}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h1>{translate("ONLINE MENU")}</h1>
      <Link to="/">
        <h2>{translate("HOME")}</h2>
      </Link>
      <div className="hamburger-desktop" id="desktop-nav">
        <Link to="/Food">
          <FontAwesomeIcon icon={faUtensils} size="lg" />
        </Link>
        <Link to="/Drinks">
          <FontAwesomeIcon icon={faGlassMartini} size="lg" />
        </Link>
      </div>
      <div className="cart">
        <Link to="/Cart">
          <FontAwesomeIcon id="cart" icon={faShoppingCart} size="lg" />
        </Link>
        {cart.length !== 0 ? (
          <span className="cart-items-counter">{cart.length}</span>
        ) : null}
      </div>
      <div className="lang-options">
        <div
          id="current-language"
          className="selected-lang"
          onClick={() => setLangCheck(!langCheck)}
        >
          <img
            style={{ width: "32px", height: "32px" }}
            className="selected-lang-icon"
            src={selectedLanguage}
            alt=""
          ></img>
        </div>

        {langCheck ? (
          <ul>
            <li id="language-option-0">
              <img
                style={{ width: "32px", height: "32px" }}
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                alt=""
                onClick={() => {
                  setLanguage("en");
                  setLangCheck(!langCheck);
                  setSelectedLanguage(
                    "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                  );
                }}
              ></img>
            </li>
            <li id="language-option-1">
              <img
                style={{ width: "32px", height: "32px" }}
                src="https://purecatamphetamine.github.io/country-flag-icons/3x2/BG.svg"
                alt=""
                onClick={() => {
                  setLanguage("bg");
                  setLangCheck(!langCheck);
                  setSelectedLanguage(
                    "https://purecatamphetamine.github.io/country-flag-icons/3x2/BG.svg"
                  );
                }}
              ></img>
            </li>
          </ul>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
