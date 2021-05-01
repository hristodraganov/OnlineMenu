import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/CartContext";
import translate from "../../i18n/translate";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { TableContext } from "../../Context/TableContext";
import { stringify, parse } from "flatted";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
const Cart = () => {
  //check sessionStorage !!!

  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  // const [total, setTotal] = useState(0);
  const { table } = useContext(TableContext);
  //eslint-disable-next-line
  const [tableNumber] = table;
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");
  useEffect(() => {
    axios
      .get("http://localhost:3001/category/get")
      .then((res) => setCategories(res.data.data.categories));
    //if no data in local storage, save it there
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", stringify(cart));
    } else {
      //load data from local storage
      let ls = parse(localStorage.getItem("cart"));
      if (cart.length > 0) {
        localStorage.setItem("cart", stringify(cart));
      }
      //eslint-disable-next-line
      ls.map((item) => {
        if (item.name.props) {
          if (!cart.find((elem) => elem.id === item.id)) {
            setCart((prev) => [
              ...prev,
              {
                id: item.id,
                name: item.name.props.id,
                price: item.price,
                quantity: item.quantity,
              },
            ]);
          }
        } else {
          if (!cart.find((elem) => elem.id === item.id)) {
            setCart((prev) => [
              ...prev,
              {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              },
            ]);
          }
        }
      });
    }
    //eslint-disable-next-line
  }, []);
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const quantityHandler = (id, diff) => {
    let copyCart;
    switch (diff) {
      case -1:
        copyCart = cart;
        copyCart = copyCart.map((item) =>
          item.id === id && item.quantity >= 0
            ? { ...item, quantity: item.quantity + diff }
            : item
        );
        setCart(
          cart.map((item) =>
            item.id === id && item.quantity > 0
              ? { ...item, quantity: item.quantity + diff }
              : item
          )
        );
        localStorage.setItem("cart", stringify(copyCart));
        break;
      case 1:
        copyCart = cart;
        copyCart = copyCart.map((item) =>
          item.id === id && item.quantity >= 0
            ? { ...item, quantity: item.quantity + diff }
            : item
        );
        setCart(
          cart.map((item) =>
            item.id === id && item.quantity >= 0
              ? { ...item, quantity: item.quantity + diff }
              : item
          )
        );
        localStorage.setItem("cart", stringify(copyCart));
        break;
      default:
        alert("sorry thats not possible");
        break;
    }
  };

  const removeItem = ({ id }) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", stringify(newCart));
  };

  const order = () => {
    //ADD FUNCTIONALITY TO CONNECT TO THERMAL PRINTER
    //OR / AND
    //CONNECT TO RESTAURANT'S SOFTWARE

    let tsDate = Date.now();
    let date = new Date(tsDate);

    let timeStamp = date.toISOString().replace("T", " ").slice(0, -5);

    setCart([]);
    localStorage.removeItem("cart");
    try {
      axios.post("http://localhost:3001/orders/post", {
        date: timeStamp,
        cart: cart,
        table: tableNumber,
      });
      setSnackBarType("success");
      setSnackBarMessage("Successfully ordered!");
      setOpenSnackBar(true);
    } catch (e) {
      setSnackBarType("error");
      setSnackBarMessage("Something went wrong, try again.");
      setOpenSnackBar(true);
    }
  };
  const handleComments = ({ id }) => (e) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, comments: e.target.value } : item
      )
    );
  };
  return (
    <div>
      {openSnackBar ? (
        <Snackbar open={true} autoHideDuration={6000} onClose={closeSnackBar}>
          <Alert onClose={closeSnackBar} severity={snackBarType}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      ) : null}
      <div className="spacer"></div>
      <div className="cart-list">
        <ul>
          {cart.map((item) => (
            <li>
              <div className="info">
                <p>{translate(item.name)}</p>
                <div className="comments">
                  <FormattedMessage
                    id="cart-comments-placeholder"
                    defaultMessage="search"
                  >
                    {(placeholder) => (
                      <input
                        onChange={handleComments(item)}
                        type="text"
                        placeholder={placeholder}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
              <div className="quantity-total">
                <div className="remove">
                  <FontAwesomeIcon
                    color="rgba(212, 161, 51, 0.8)"
                    size="lg"
                    onClick={() => removeItem(item)}
                    icon={faTimesCircle}
                    className="remove"
                  />
                </div>
                <div className="quantity-buttons">
                  <FontAwesomeIcon
                    color="rgba(212, 161, 51, 0.8)"
                    size="lg"
                    onClick={() => quantityHandler(item.id, -1)}
                    icon={faMinusCircle}
                  />
                  <label className="quantity">{item.quantity}</label>
                  <FontAwesomeIcon
                    color="rgba(212, 161, 51, 0.8)"
                    size="lg"
                    onClick={() => quantityHandler(item.id, +1)}
                    icon={faPlusCircle}
                  />
                </div>
                <p>
                  {translate("Total")}:{item.quantity * item.price}
                </p>
              </div>
            </li>
          ))}
          {cart.length !== 0 ? (
            <div>
              <hr className="total-hr" />
              <p>
                {translate("Total")}:{" "}
                {cart.reduce((sum, i) => (sum += i.quantity * i.price), 0)}{" "}
                {translate("BGN")}
              </p>
            </div>
          ) : null}
          {cart.length !== 0 ? (
            <div className="order-button-wrapper">
              <button onClick={order} className="order">
                {translate("Order")}
              </button>
            </div>
          ) : (
            <div className="empty-cart">
              <p>
                {translate(
                  "Seems like your cart is empty! Start adding items!"
                )}
              </p>
              <div className="cards">
                {categories.map((item) => (
                  <Link to={`/${item.name}`}>
                    <Card
                      src={`http://localhost:3001/images/${item.image}`}
                      text={translate(item.name)}
                      orientation="vertical"
                      showImg={true}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Cart;
