import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar.js'
import CoffeePage from './Pages/Coffee/Coffee';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            {/* <h1 style={{color: 'white', margin: 0}}>coffee</h1> */}
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;


{/* <Navbar />
<CoffeePage>
  <StatusBar />
  <Products />
  <Footer />
</CoffeePage> */}
