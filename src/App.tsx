import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListProvider } from './context/ListContext';
import Navbar from './components/Navbar';
import ListView from './pages/ListView';
import GalleryView from './pages/GalleryView';
import DetailView from './pages/DetailView';

function App() {
  return (
    <BrowserRouter basename="/mp2">
      <ListProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/detail/:id" element={<DetailView />} />
          <Route path="*" element={<div className="page container"><h1>404</h1></div>} />
        </Routes>
      </ListProvider>
    </BrowserRouter>
  );
}

export default App;