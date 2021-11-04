import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
  Redirect
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar'
import CoffeePage from './Pages/Coffee/Coffee';
import CartPage from './Pages/Cart/Cart';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Account from './Pages/Account/Account';
import Admin from './Pages/Admin/Admin';

import {UserProvider} from './Contexts/UserContext';
import {CartProvider} from './Contexts/CartContext';

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
              <Route path='/subscriptions'>
                <h1 style={{color: 'white', margin: 0}}>subscriptions</h1>
              </Route>
              <Route path='/equipment'>
                <h1 style={{color: 'white', margin: 0}}>equipment</h1>
              </Route>
              <Route path='/merchandise'>
                <h1 style={{color: 'white', margin: 0}}>merchandise</h1>
              </Route>
              <Route path='/wholesale'>
                <h1 style={{color: 'white', margin: 0}}>wholesale</h1>
              </Route>
              <Route path='/shipping'>
                <h1 style={{color: 'white', margin: 0}}>shipping</h1>
              </Route>
              <Route path='/about'>
                <h1 style={{color: 'white', margin: 0}}>about</h1>
              </Route>
              <Route path='/cart'>
                <CartPage />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/account'>
                <Account />
              </Route>
              <Route path='/admin'>
                <Admin />
              </Route>
            </Switch>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;