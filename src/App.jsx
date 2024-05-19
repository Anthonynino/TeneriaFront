import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import WelcomePage from './pages/WelcomePage'
import './App.css'
import ProductForm from './pages/ProductEntry'

function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
            <Route path='/' element={<WelcomePage/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/homepage' element={<Homepage/>} />
              <Route path='/add-product' element={<ProductForm/>} />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
