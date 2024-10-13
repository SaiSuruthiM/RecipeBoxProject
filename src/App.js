import "./App.css";
import "./index.css"
import Homepage from "./Component/Homepage";

import StartHerePage from './Component/StartHerePage';

import About from './Component/About';
import Recipes from './Component/Recipes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/StartHerePage" element={<StartHerePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
