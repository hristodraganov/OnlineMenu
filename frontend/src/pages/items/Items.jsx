import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import "./Items.css";
import { uuid } from "uuidv4";
import Error from "../../components/error/Error";
import axios from "axios";
const Items = ({ match }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/product/get/${match.params.subGroup}`)
      .then((res) => setProducts(res.data.data.products));
    /*eslint-disable-next-line */
  }, []);

  const renderCards = (group, subgroup) => {
    return (
      <section className="items">
        <div className="spacer"></div>
        <div className="items-grid">
          {products.map((item) => (
            <Card
              id={uuid()}
              src="../../images/test.jpg"
              name={item.name}
              description={item.description}
              link={`/${match.params.group}/${match.params.subGroup}/${item.name}`}
              price={item.price}
            />
          ))}
        </div>
      </section>
    );
  };

  //used to avoid duplicate error message
  const renderSwitch = (group, subGroup) => {
    switch (group) {
      case "Food":
        if (
          /*eslint-disable */
          subGroup == "Main" ||
          subGroup == "Appetizers" ||
          subGroup == "Sushi" ||
          subGroup == "Pizza" ||
          subGroup == "Meat" ||
          subGroup == "Salads" ||
          subGroup == "Pasta"
          /*eslint-disable */
        ) {
          return renderCards(group, subGroup);
        } else {
          return <Error />;
        }
      case "Drinks":
        if (
          /*eslint-disable */
          subGroup == "Hot Drinks" ||
          subGroup == "Cold Drinks" ||
          subGroup == "Vodka" ||
          subGroup == "Whiskey" ||
          subGroup == "Gin" ||
          subGroup == "Soft" ||
          subGroup == "Wine" ||
          subGroup == "Aperitives" ||
          subGroup == "Cognac" ||
          subGroup == "Cocktails"
          /*eslint-disable */
        ) {
          return renderCards(group, subGroup);
        } else {
          return <Error />;
        }
      default:
        return <Error />;
    }
  };
  return <div>{renderSwitch(match.params.group, match.params.subGroup)}</div>;
};

export default Items;
