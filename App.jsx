import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, TextField, Card, Grid, CardMedia, CardContent, CardActions } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
  { id: 1, name: "Smart Watch", price: 99.99, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Wireless Headphones", price: 79.99, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Gaming Mouse", price: 49.99, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Mechanical Keyboard", price: 120.00, image: "https://via.placeholder.com/150" }
];

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Shopping App</Typography>
        <Button color="inherit" href="/">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      toast.success("Login successful!");
      setTimeout(() => navigate("/shop"), 1500);
    } else {
      toast.error("Invalid credentials or user not registered!");
    }
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Card sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
        <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/register")}>Register</Button>
      </Card>
      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      toast.error("Please enter both username and password!");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ username, password }));
    toast.success("Registration successful! Please login.");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Card sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Register</Button>
      </Card>
      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}

function Shop() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Shop Accessories</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia component="img" height="140" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">${product.price.toFixed(2)}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
