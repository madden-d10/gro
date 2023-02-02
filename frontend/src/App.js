import './styles/App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import GardenLayout from './components/GardenLayout'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <Link to="/gardenLayout">Garden Layout</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path='/gardenLayout' element={< GardenLayout />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
