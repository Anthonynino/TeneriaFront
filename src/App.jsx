import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import './App.css'
import ProductForm from './pages/ProductEntry'
import { AuthProvider } from './context/AuthContext'
import ProtectedRouter from './public/ProtectedRouter'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRouter />}>
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/add-product" element={<ProductForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
