import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import styled from 'styled-components';

const App = () => {
  return (
    <BrowserRouter  >
    <div style={{"background-color": "#F9F9F9"}}>
      <NavBar/>
      <Routes>
        <Route exact path="/" />
      </Routes>
    </div>  
    </BrowserRouter>
  );
}



export default App;
