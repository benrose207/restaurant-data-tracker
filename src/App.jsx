import React from 'react';
import './assets/stylesheets/reset.css';
import './assets/stylesheets/app.css';
import Header from './components/header';
import Dashboard from './components/dashboard';

function App() {
  return (
    <>
      <Header />
      <Dashboard/>
    </>
  );
}

export default App;
