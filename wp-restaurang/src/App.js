import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Postcomponent from './components/Postcomponent';

function App() {

  useEffect(() => {

    console.log('ue');
    fetchMovies()
    }, []);


  
  const [state, setState] = useState();

  async function fetchMovies() {
    let response = await fetch('http://localhost:4000/');
    response = await response.json()
    // waits until the request completes...
    console.log(response, typeof response);
  }
  
  return (
    <div className="App">
      <Postcomponent />
    </div>
  );
}

export default App;
