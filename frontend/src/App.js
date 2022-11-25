import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import GardenLayout from './components/GardenLayout'
import Information from './components/Information'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <Link to="/gardenLayout">Garden Layout</Link>
          </li>
          <li>
            <Link to="/information">Information</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path='/gardenLayout' element={< GardenLayout />}></Route>
          <Route exact path='/information' element={< Information />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
