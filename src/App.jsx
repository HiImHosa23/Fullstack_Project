import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Collections from './pages/Collections';
import Account from './pages/Account';
import Navbar from "./components/Navbar";
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>

      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/collections" element={<Collections />}/>
          <Route path="/account" element={<Account />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
