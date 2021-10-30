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
import AuthTest from './Pages/AuthTest/AuthTest';

import {CartProvider} from './Contexts/CartContext';

function App() {
  return (
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
            <Route path='/authtest'>
              <AuthTest />
            </Route>
          </Switch>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;