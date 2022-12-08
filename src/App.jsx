import { Routes, Route } from 'react-router-dom'
import SignInComponent from './components/SignInComponent'
import HomeComponent from './components/HomeComponent';
import RegisterComponent from './components/RegisterComponent';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import './App.css'

function App() {
  return (

    <Routes>
      <Route path="/" element={<SignInComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/home" element={<HomeComponent />} />
    </Routes>

  );
}

export default App;