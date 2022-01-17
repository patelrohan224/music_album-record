import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Album from './components/Album';
import ShowAlbum from './components/ShowAlbum';
import Redirectt from './components/Route';

function App() {
  return (
    <>
    <Switch>
      <Route path="/page/:page" exact > 
    <Home />
        <Album />
      </Route>
      <Route path="/" exact > 
    <Home />
        <Album />
      </Route>
        <Route path="/album/:idA"  exact > 
        <Home />
           <ShowAlbum />
        </Route>       
          <Route path="/rd" exact > 
              <Redirectt />
          </Route>       
      </Switch>
    </>
  );
}

export default App;
