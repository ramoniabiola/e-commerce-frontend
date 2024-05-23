import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage'; 
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';


const App = () => {
  const user = useSelector((state) => state.user.currentUser)

  return (
    <div className="App">  
      <BrowserRouter>
        <Routes>
        <Route 
            path="/"
            element={<Homepage />}
          />
          <Route 
            path="/products/:category"
            element={<ProductList />}
          />
          <Route 
            path="/product/:id"
            element={<Product />}
          />
          <Route 
            path="/cart"
            element={<Cart />}
          />
          <Route 
            path="/register"
            element={<Register />}
          />
          <Route 
            path="/login"
            element={user ? <Navigate to="/"/> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
