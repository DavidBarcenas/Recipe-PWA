import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to='/'>Recipes</Link>
        </header>

        <main>
          <Route exact path='/' component={Home} />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
