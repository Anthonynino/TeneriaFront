import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage/>} />
              <Route path='/homepage' element={<Homepage/>} />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
