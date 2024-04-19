import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Create from './pages/home/Create';
import Update from './pages/home/Update';
import Category from './pages/Category/CategoryHome';
import ProductDetail from './pages/ProductDeatail/ProductDetail';
import Bill from './pages/Bill/Bill';
import CustomerHome from './pages/Customer/CustomerHome';
import UpdateCategory from './pages/Category/UpdateCategory';
import CreateCategory from './pages/Category/CreateCategory';
import CreateProductDetail from './pages/ProductDeatail/CreateProductDetail';
import UpdateProductDetail from './pages/ProductDeatail/UpdateProductDetail';
import TotalBill from './pages/Total/TotalBill';
import ConfirmAccount from './pages/login/user/ConfirmAccount';
import CreateAccount from './pages/login/user/CreateAccount';
import HomePage from './pages/adminHome/HomePage';

function App() {
  return (
    <>
       <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/confirmCode' element={<ConfirmAccount/>}/>
          <Route path='/createUser' element={<CreateAccount/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/megaPage' element={<HomePage/>}/>
          <Route path='/createProduct' element={<Create/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path="/createCategory" element={<CreateCategory/>}/>
          <Route path='/updateCategory' element={<UpdateCategory/>}/>
          <Route path='/productDetail' element={<ProductDetail/>}/>
          <Route path='/createProductDetail' element={<CreateProductDetail/>}/>
          <Route path='/updateProductDetail' element={<UpdateProductDetail/>}/>
          <Route path='/totalBill' element={<TotalBill/>}/>
          <Route path='/bill' element={<Bill/>} />
          <Route path='/customer' element ={<CustomerHome/>} />
          <Route path='/update' element={<Update/>} />
          
       </Routes>
    </>
  );
}

export default App;