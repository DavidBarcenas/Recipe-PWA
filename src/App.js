import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
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
          <Route exact path='/recipe/:id' component={Recipe} />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
