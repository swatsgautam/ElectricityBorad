import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import { ConnectionProvider } from './context/connectionContext';
import HomePage from './components/HomePage/HomePage';
// import ConnectionChartPage from './components/ConnectionChartPage';
import Header from './components/Header/Header';

function App() {
  return (
    <ConnectionProvider>
      <Router> 
        <Header/>    
        <div className='content'>  
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/chart" element={<ConnectionChartPage />} /> */}
        </Routes>
        </div>
      </Router>
      
    </ConnectionProvider>
  );
}

export default App;
