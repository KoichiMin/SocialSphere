import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <BrowserRouter>
    <div>
      <NavBar/>
      <Switch>
        <Route exact path="/" />
      </Switch>
    </div>  
    </BrowserRouter>
  );
}

export default App;
