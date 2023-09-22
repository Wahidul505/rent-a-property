import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Rent from "./Pages/Rent/Rent";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sale from "./Pages/Sale/Sale";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import PropertyDetails from "./Pages/Rent/PropertyDetails";
import NotFound from "./Components/NotFound";
import MySales from "./Pages/Dashboard/MySales";
import MyRents from "./Pages/Dashboard/MyRents";
import SaleDetails from "./Pages/Dashboard/SaleDetails";
import RequireAuth from "./Components/RequireAuth";
import ManageProperty from "./Pages/Dashboard/ManageProperty";
import Profile from "./Pages/Dashboard/Profile";

const App: FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="pt-36 lg:px-16 md:px-8 px-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Rent />} />
          <Route
            path="/property/:id"
            element={
              <RequireAuth>
                <PropertyDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/sale"
            element={
              <RequireAuth>
                <Sale />
              </RequireAuth>
            }
          />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route
              index
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="my-rents"
              element={
                <RequireAuth>
                  <MyRents />
                </RequireAuth>
              }
            />
            <Route
              path="my-sales"
              element={
                <RequireAuth>
                  <MySales />
                </RequireAuth>
              }
            />
            <Route
              path="my-sales/:id"
              element={
                <RequireAuth>
                  <SaleDetails />
                </RequireAuth>
              }
            />
            <Route
              path="manage-property"
              element={
                <RequireAuth>
                  <ManageProperty />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
