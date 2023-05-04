import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import styled from 'styled-components';
import HomePage from './pages/HomePage/HomePage';
import LoginButton from './components/Auth0/LoginButton';
import LogoutButton from './components/Auth0/LogoutButton';
const App = () => {
  return (
    <BrowserRouter  >
    <Wrapper>
      <LoginButton/>
      <LogoutButton/>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
      </Routes>
    </Wrapper>  
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
background-color: #F9F9F9;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  
  top: 0;
  left: 0;
`



export default App;
