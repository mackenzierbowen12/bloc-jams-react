import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav className="landing-nav">
              <ul id="navItems">
                <h3 id="logo">Bloc Jams</h3>
                <Link to='/'>Home</Link>
                <Link to='/library'>Library</Link>
              </ul>
          </nav>
        </header>
            <main>
              <Route exact path='/' component={Landing} />
              <Route path='/library' component={Library} />
              <Route path='/album/:slug' component={Album} />
            </main>    
      </div>  
    );
  }
}

export default App;
