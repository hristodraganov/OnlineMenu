import React, { useEffect, useState } from "react";
import "./Item.css";
import translate from "../../i18n/translate";
import axios from "axios";
const Item = ({ match }) => {
  const [product, setProduct] = useState({});
  const [alergens, setAlergens] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/product/get/one/${match.params.item}`)
      .then((res) => setProduct(res.data.data.product));
    if (product.alergens) {
      setAlergens(product.alergens.split(","));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="item-content">
        <div className="spacer"></div>
        <img alt="" src={`http://localhost:3001/images/${product.image}`}></img>
        <div className="name-box">
          <h5>{product.name}</h5>
        </div>
        <h1 className="title">{translate("Description")}</h1>
        <div className="description-box">
          <span>{product.description}</span>
          {/* {translate(`${product.description}`)} */}
        </div>
        <h1 className="title">{translate("Alergens")}</h1>
        <div className="alergens-box">
          <ul className="alergens-list">
            {alergens.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Item;
