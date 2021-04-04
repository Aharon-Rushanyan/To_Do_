import React from 'react';
import ToDo from './Components/ToDo/ToDo';
import { ToastContainer } from 'react-toastify'

import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ToDo />
    </div>
  );
}

export default App;