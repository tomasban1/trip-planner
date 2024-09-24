
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Locations } from './pages/Locations';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { GlobalContextWrapper } from './context/GlobalContext';
import { NewLocation } from './pages/NewLocation';



function App() {
  
  return (
    <GlobalContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/locations' element={<Locations />}></Route>
          <Route path='/locations/new' element={<NewLocation />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>

          <Route path='/dashboard' element={<Dashboard />}></Route>

          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter> 
    </GlobalContextWrapper>
  );
}

export default App
