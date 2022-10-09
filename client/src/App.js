// Top level component - where all other components meet

import logo from './logo.svg';
import './App.css';

function App() { // React Components must start with a capital letter.
  return (
    <div className="App">
      <header className="myclass">
        <img src={logo} className="logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;