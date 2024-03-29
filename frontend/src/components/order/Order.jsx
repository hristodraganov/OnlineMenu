import React from "react";
import "./Order.css";
import translate from "../../i18n/translate";
const Order = (props) => {
  return (
    <div className="order-box">
      <h1>
        {translate("Name")}: {props.name}
      </h1>
      <p className="info-right">
        {translate("Single price")}: {props.price}
      </p>
      <p className="info-right">
        {translate("Quantity")}: {props.quantity}
      </p>
      <p style={{ fontWeight: "bold" }} className="info-right">
        {translate("Total")}: {props.quantity * props.price}
      </p>
    </div>
  );
};

export default Order;
