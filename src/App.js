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
          <nav id="landing-nav">
            <Link to='/'>Home</Link>
            <Link to='/library'>Library</Link>
          </nav>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h1 id="landing-header">Bloc Jams</h1>
              </div>
            </div>  
          </div>  
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
