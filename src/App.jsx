import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Decoration from './pages/Decoration';
import Contact from './pages/Contact';
import Customize from './pages/Customize';
import Dashboard from './pages/Dashboard';
import PrivateLabel from './pages/PrivateLabel';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';

// Simple Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={
              <>
                <Helmet><title>Al Miraal | Premium Perfume Packaging Solutions Dubai</title></Helmet>
                <Home />
              </>
            } />
            
            {/* Products with dynamic category */}
            <Route path="products/:category" element={
              <>
                <Helmet><title>Al Miraal Products | Perfume Glass Bottles & Packaging</title></Helmet>
                <Products />
              </>
            } />
            {/* Legacy redirect for plain /products */}
            <Route path="products" element={<Navigate to="/products/perfume-bottle" replace />} />

            <Route path="decoration" element={
              <>
                <Helmet><title>Perfume Bottle Decoration UAE | Al Miraal</title></Helmet>
                <Decoration />
              </>
            } />
            
            <Route path="contact" element={
              <>
                <Helmet><title>Contact Al Miraal | Perfume Packaging Supplier Dubai</title></Helmet>
                <Contact />
              </>
            } />
            
            <Route path="customize" element={
              <>
                <Helmet><title>Customize Your Perfume Bottle | Al Miraal Studio</title></Helmet>
                <Customize />
              </>
            } />
            
            <Route path="private-label" element={
              <>
                <Helmet><title>Private Label Perfume Packaging Services | Al Miraal</title></Helmet>
                <PrivateLabel />
              </>
            } />
            
            <Route path="product/:slug" element={
              <>
                <Helmet><title>Product Details | Al Miraal</title></Helmet>
                <ProductDetail />
              </>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={
            <>
              <Helmet><title>Admin Login | Al Miraal</title></Helmet>
              <Login />
            </>
          } />
          
          {/* Protected Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <>
                  <Helmet><title>Admin Dashboard | Al Miraal</title></Helmet>
                  <Dashboard />
                </>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
