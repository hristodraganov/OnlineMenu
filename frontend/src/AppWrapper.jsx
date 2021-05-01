import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Groups from "./pages/groups/Groups";
import Items from "./pages/items/Items";
import Item from "./pages/item/Item";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import { CartProvider } from "./Context/CartContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TableProvider } from "./Context/TableContext";
import { I18nProvider } from "./i18n";
import { LanguageContext } from "./Context/LanguageContext";
import React, { useContext } from "react";

import Orders from "./components/orders/Orders";
import Statistics from "./pages/statistics/Statistics";

function AppWrapper() {
  const [language] = useContext(LanguageContext);
  return (
    <I18nProvider locale={language}>
      <CartProvider>
        <TableProvider>
          <div className="App">
            <Router>
              <Header />
              <Switch>
                <Route path="/admin" component={Login} />
                <Route path="/reports" component={Statistics} />
                <Route path="/Orders" component={Orders} />
                <Route path="/Cart" component={Cart} />
                <Route path="/:group/:subGroup/:item" component={Item} />
                <Route path="/:group/:subGroup" component={Items} />
                <Route path="/" exact component={Home} />
                <Route path="/:group" component={Groups} />
              </Switch>
            </Router>
          </div>
        </TableProvider>
      </CartProvider>
    </I18nProvider>
  );
}

export default AppWrapper;
