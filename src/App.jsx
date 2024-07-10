import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import WelcomePage from './pages/WelcomePage'
import './App.css'
import ProductForm from './pages/ProductEntry'
import { AuthProvider } from './context/AuthContext'
import ProtectedRouter from './public/ProtectedRouter'
import ProductsTable from './pages/ProductsTable'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<WelcomePage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRouter />}>
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/add-product/:categoryId?" element={<ProductForm />} />
              <Route path="/homepage/productstable/:categoryId/:nameCategory" element={<ProductsTable />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
