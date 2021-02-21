import '../App.css';
import Header from './Header'
import Home from './Home'
import Groups from './Groups'
import Items from './Items'
import Item from './Item'
import Cart from './Cart'
import Login from './Login'
import { CartProvider } from '../Context/CartContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TableProvider } from '../Context/TableContext';
import { I18nProvider } from '../i18n'
import { LanguageContext } from '../Context/LanguageContext'
import React, { useContext } from 'react';

function AppWrapper() {
  const [language] = useContext(LanguageContext)
  return (
    <I18nProvider locale={language}>
        <CartProvider>
          <TableProvider>
            <div className="App">
              <Router>
                <Header />
                <Switch>
                  <Route path='/Orders' component={Login}/>
                  <Route path='/Cart' component={Cart} />
                  <Route path='/:group/:subGroup/:item' component={Item} />
                  <Route path='/:group/:subGroup' component={Items} />
                  <Route path='/' exact component={Home} />
                  <Route path='/:group' component={Groups} />
                </Switch>
              </Router>
            </div>
          </TableProvider>
        </CartProvider>
    </I18nProvider>
  );
}

export default AppWrapper
