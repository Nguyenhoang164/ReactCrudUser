import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Create from './pages/home/Create';
import Update from './pages/home/Update';

function App() {
  return (
    <>
       <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/create' element={<Create/>}/>
          <Route path='/update' element={<Update/>}/>
       </Routes>
    </>
  );
}

export default App;