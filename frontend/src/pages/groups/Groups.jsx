import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import "./Groups.css";
import { Link } from "react-router-dom";
import translate from "../../i18n/translate";
import Error from "../../components/error/Error";
import axios from "axios";
const Groups = ({ match }) => {
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/subCategory/get/${match.params.group}`)
      .then((res) => setSubCategory(res.data.data.sub_category));
    //eslint-disable-next-line
  }, [match.params]);
  return (
    <div>
      {
        /* eslint eqeqeq: 0 */
        match.params.group == "Food" || match.params.group == "Drinks" ? (
          <section className="drinkTypes">
            <div className="spacer"></div>
            <div className="drinkTypes-grid">
              {subCategory.map((item) => (
                <Link to={`/${match.params.group}/${item.name}`}>
                  <Card
                    src={"../../images/" + item.image}
                    text={translate(item.name)}
                    orientation="vertical"
                    showImg={true}
                  />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <Error />
        )
      }
    </div>
  );
};

export default Groups;
