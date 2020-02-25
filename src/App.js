import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Timer from './pages/Timer';
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
          <Route exact path='/timer' component={Timer} />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
