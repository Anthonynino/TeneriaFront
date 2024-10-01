import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Homepage from './pages/Homepage'
import WelcomePage from './pages/WelcomePage'
import './App.css'
import AddProduct from './pages/Addproduct'
import { AuthProvider } from './context/AuthContext'
import ProtectedRouter from './public/ProtectedRouter'
import ProductsTable from './pages/ProductsTable'
import CategoryPage from './pages/CategoryPage'
import AddProviders from './pages/AddProviders'
import ProvidersTable from './pages/ProvidersTable'
import ReportPage from './pages/ReportsPage'
import ReportSupplier from './pages/ReportsSuppliers'
import ReportProducts from './pages/ReportProduct'
import EditProduct from './pages/EditProduct'
import EditSupplier from './pages/EditSupplier'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRouter />}>
              <Route path="/homepage" element={<Homepage />} />
              <Route
                path="/add-product/:categoryId"
                element={<AddProduct />}
              />
              <Route
                path="/homepage/productstable/:categoryId/:nameCategory"
                element={<ProductsTable />}
              />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/editproduct/:productId/:categoryId" element={<EditProduct />} />
              <Route path="/editsupplier/:supplierId" element={<EditSupplier />} />
              <Route path="/add-provider" element={<AddProviders />} />
              <Route path="/providerstable" element={<ProvidersTable />} />
              <Route path="/reports" element={<ReportPage/>} />
              <Route path="/report-suppliers" element={<ReportSupplier/>} />
              <Route path="/report-products" element={<ReportProducts/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
