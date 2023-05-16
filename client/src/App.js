import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import styled from 'styled-components';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  return (
    <BrowserRouter  >
    <Wrapper>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path='/UserProfile' element={<ProfilePage/>}/>
      </Routes>
    </Wrapper>  
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
background-color: #F9F9F9;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
`



export default App;
