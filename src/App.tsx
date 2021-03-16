import React from 'react';
import './App.scss';
import Vegetables from './Vegetables';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <>
      <div className="wrapper">
        <div className="header">
          Vegetable Warehouse
      </div>
        <Vegetables></Vegetables>
      </div>
    </>
  );
}

export default App;

