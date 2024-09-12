import { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { getAllCategories } from '../api/categories'
import { createProductRequest } from '../api/products'
import { getAllSuppliers } from '../api/suppliers'
import OperationModal from './SuccessfulOperation'
import { useNavigate } from 'react-router-dom'

const ProductForm = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [category, setCategory] = useState(categoryId || '')
  const [provider, setProvider] = useState('')
  const [nameProduct, setNameProduct] = useState('')
  const [codeProduct, setCodeProduct] = useState('')
  const [ubicationProduct, setUbicationProduct] = useState('')
  const [quantityProduct, setQuantityProduct] = useState('')
  const [size, setSize] = useState('')
  const [getCategories, setGetCategories] = useState()
  const [getSuppliers, setGetSuppliers] = useState()
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [isSuccess, setIsSuccess] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const quantityInt = parseInt(quantityProduct)

    if (
      !category ||
      !nameProduct ||
      !codeProduct ||
      !ubicationProduct ||
      !quantityProduct
    ) {
      triggerModal('Error', 'Los campos deben estar llenos', false) // Error con título personalizado
    } else {
      await createProductRequest(
        nameProduct,
        codeProduct,
        ubicationProduct,
        quantityInt,
        size,
        category,
        provider
      )
      triggerModal('¡Éxito!', '¡Producto agregado correctamente!', true) // Éxito con título personalizado

      // Limpiar los campos después del éxito
      setCategory('')
      setProvider('')
      setNameProduct('')
      setCodeProduct('')
      setUbicationProduct('')
      setQuantityProduct('')
      setSize('')
    }
  }

  const triggerModal = (title, message, success) => {
    setModalTitle(title) // Actualizamos el título del modal
    setModalMessage(message)
    setIsSuccess(success)
    setShowModal(true)
  }

  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRes = await getAllCategories()
      setGetCategories(categoriesRes)
      const suppliersRes = await getAllSuppliers()
      setGetSuppliers(suppliersRes)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-50 row mt-5 h-50 mx-auto"
          style={{ paddingTop: '3rem' }}
        >
          <h1 className="text-center fw-bold mb-5" style={{ color: '#791021' }}>
            ¿Que desea agregar?
          </h1>
          <form className="row" onSubmit={handleSubmit}>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Categoria</label>
              <select
                className="shadow-sm form-select"
                aria-label="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Seleccione</option>
                {getCategories?.data.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-md-4">
              <label className="fw-semibold form-label">Proveedor</label>
              <select
                className="shadow-sm form-select"
                aria-label="Proveedor"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                <option value="">Seleccione</option>
                {getSuppliers?.data.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">
                Nombre del producto
              </label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un producto"
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
              />
            </div>

            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Codigo</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un codigo"
                value={codeProduct}
                onChange={(e) => setCodeProduct(e.target.value)}
              />
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Ubicación</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese una ubicación"
                value={ubicationProduct}
                onChange={(e) => setUbicationProduct(e.target.value)}
              />
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Cantidad</label>
              <input
                type="number"
                className="shadow-sm form-control"
                placeholder="Ingrese una cantidad"
                value={quantityProduct}
                onChange={(e) => setQuantityProduct(e.target.value)}
                min={1}
              />
            </div>
            {(category === '3' || category === '6') && (
              <div className="mb-2 col-4">
                <label className="fw-semibold form-label">
                  {category === '3' ? 'Talla' : 'Tamaño'}
                </label>
                <input
                  type="text"
                  className="shadow-sm form-control"
                  placeholder={`Ingrese una ${
                    category === '3' ? 'talla' : 'tamaño'
                  }`}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
            )}
            <div className="row mt-2">
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn fw-semibold px-5 button-hover mx-1"
                  style={{ background: '#791021', color: '#ffff' }}
                  onClick={() => navigate(-1)}
                >
                  Regresar
                </button>
                <button
                  className="btn fw-semibold px-3 button-hover mx-1"
                  style={{ background: '#DAA520', color: '#ffff' }}
                  type="submit"
                >
                  Agregar producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Mostrar el modal con título personalizado */}
      <OperationModal
        showModal={showModal}
        handleClose={handleCloseModal}
        isSuccess={isSuccess}
        title={modalTitle} // Pasamos el título personalizado
        message={modalMessage}
      />
    </>
  )
}

export default ProductForm
