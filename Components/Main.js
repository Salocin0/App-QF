import React from 'react';
import { Routes, Route } from 'react-router-native';
import Inicio from './Inicio';
import Login from './Login';

export default Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/recuperar-contraseña" element={<Inicio />} />
      <Route path="/registrarse" element={<Inicio />} />
    </Routes>
  );
};
