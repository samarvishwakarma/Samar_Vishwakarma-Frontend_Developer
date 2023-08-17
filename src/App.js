import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Capsule from './components/Capsule';

function App() {
  
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />

          <Route path="/capsule/:id" element={<Capsule/>} />
          
        </Routes>
      </Router>
  );
}

export default App;
