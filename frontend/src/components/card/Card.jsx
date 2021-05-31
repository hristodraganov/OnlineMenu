import React, { useState, useContext } from "react";
import "./Card.css";
import {
  faPlusCircle,
  faMinusCircle,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../Context/CartContext";
import translate from "../../i18n/translate";
import { Link } from "react-router-dom";
const Card = (props) => {
  let gridItemId = props?.text?.props?.id;
  const [cart, setCart] = useContext(CartContext);

  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity === 0) {
      alert("You cant do that");
    } else {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (!cart.some((item) => item.name === props.name) && quantity > 0) {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: props.id,
          name: props.name,
          price: props.price,
          quantity: quantity,
          comments: "",
        },
      ]);
    }
  };
  return props.orientation === "vertical" ? (
    <div className="grid-item" id={gridItemId}>
      {props.showImg ? <img alt="" src={props.src}></img> : null}
      <p>{props.text}</p>
    </div>
  ) : (
    <div className="horizontal-item">
      {props.link ? (
        <Link to={props.link}>
          <img alt="" src={props.src}></img>
        </Link>
      ) : null}
      <div className="card-content">
        <div className="card-info">
          <h5 className="item-name">{translate(props.name)}</h5>
          <p className="item-description">{props.description}</p>
          <p className="item-price">
            {translate("Price")}: {props.price} {translate("BGN")}
          </p>
        </div>
        <div className="card-buttons">
          <div className="quantity-buttons">
            <FontAwesomeIcon
              id={props.name + "-decrement"}
              color="rgba(212, 161, 51, 0.8)"
              size="lg"
              onClick={decrementQuantity}
              icon={faMinusCircle}
            />
            <label className="quantity">{quantity}</label>
            <FontAwesomeIcon
              id={props.name + "-increment"}
              color="rgba(212, 161, 51, 0.8)"
              size="lg"
              onClick={incrementQuantity}
              icon={faPlusCircle}
            />
          </div>
          <FontAwesomeIcon
            id={props.name + "-add-to-cart"}
            color="rgba(212, 161, 51, 0.8)"
            size="lg"
            onClick={() => addToCart()}
            icon={faCartPlus}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
