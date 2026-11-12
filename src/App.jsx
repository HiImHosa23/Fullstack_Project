import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Collections from './pages/Collections';
import Account from './pages/Account';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>

      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/collections" element={<Collections />}/>
          <Route path="/account" element={<Account />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
