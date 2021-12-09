import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
  Redirect,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import CoffeePage from "./Pages/Coffee/Coffee";
import CartPage from "./Pages/Cart/Cart";
// import Login from './Pages/Login/Login';
// import Register from './Pages/Register/Register';
import Account from "./Pages/Account/Account";
import Admin from "./Pages/Admin/Admin";
import Auth from "./Pages/Auth/Auth";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation";

import { UserProvider } from "./Contexts/UserContext";
import { CartProvider } from "./Contexts/CartContext";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Redirect to="/coffee" />
              </Route>
              <Route path="/coffee">
                <CoffeePage />
              </Route>
              <Route path="/subscriptions">
                <h1 style={{ color: "black", margin: 0 }}>
                  subscriptions - coming soon
                </h1>
              </Route>
              <Route path="/equipment">
                <h1 style={{ color: "black", margin: 0 }}>
                  equipment - coming soon
                </h1>
              </Route>
              <Route path="/merchandise">
                <h1 style={{ color: "black", margin: 0 }}>
                  merchandise - coming soon
                </h1>
              </Route>
              <Route path="/shipping">
                <h1 style={{ color: "black", margin: 0 }}>
                  shipping - coming soon
                </h1>
              </Route>
              <Route path="/about">
                <h1 style={{ color: "black", margin: 0 }}>
                  about - coming soon
                </h1>
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <Route path="/login">
                {/* <Login /> */}
                <Auth type="login" />
              </Route>
              <Route path="/register">
                {/* <Register /> */}
                <Auth type="register" />
              </Route>
              <Route path="/account">
                <Account />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/order-confirmation">
                <OrderConfirmation />
              </Route>
              <Route path="*">
                <Redirect to="/coffee" />
              </Route>
            </Switch>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
