import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Rent from './Pages/Rent/Rent';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sale from './Pages/Sale/Sale';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import Footer from './Components/Footer';
import { Toaster } from 'react-hot-toast';
import PropertyDetails from './Pages/Rent/PropertyDetails';
import NotFound from './Components/NotFound';
import MySales from './Pages/Dashboard/MySales';
import MyRents from './Pages/Dashboard/MyRents';
import SaleDetails from './Pages/Dashboard/SaleDetails';

const App: FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className='pt-36 lg:px-16 md:px-8 px-4'>
        <Routes>
          <Route path='/' element={<Rent />} />
          <Route path='/property/:id' element={<PropertyDetails />} />
          <Route path='/sale' element={<Sale />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='my-sales' element={<MySales />} />
            <Route path='my-sales/:id' element={<SaleDetails />} />
            <Route path='my-rents' element={<MyRents />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
