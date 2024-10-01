import { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { editProductRequest } from '../api/products'
import OperationModal from './SuccessfulOperation'
import { getAllSuppliers } from '../api/suppliers'
import { getOneProduct } from '../api/products'
import { getAllCategories } from '../api/categories' // Asegúrate de tener la función para obtener categorías
import { useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const navigate = useNavigate()
  const { productId, categoryId } = useParams()
  const [suppliers, setSuppliers] = useState([])
  const [supplierId, setSupplierId] = useState('')
  const [categories, setCategories] = useState([]) // Estado para las categorías
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId) // Inicializar con la categoría actual
  const [codeProduct, setCodeProduct] = useState('')
  const [ubicationProduct, setUbicationProduct] = useState('')
  const [size, setSize] = useState('')
  const [getProduct, setGetProduct] = useState()
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [isSuccess, setIsSuccess] = useState(true)
  const [nameProduct, setNameProduct] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !nameProduct ||
      !codeProduct ||
      !ubicationProduct ||
      !productId ||
      !selectedCategoryId ||
      !supplierId
    ) {
      triggerModal('Error', 'Los campos deben estar llenos', false)
    } else {
      try {
        await editProductRequest(
          productId,
          nameProduct,
          codeProduct,
          ubicationProduct,
          size,
          selectedCategoryId,
          supplierId
        )
        triggerModal('¡Éxito!', '¡Producto Editado correctamente!', true)
        setNameProduct('')
        setCodeProduct('')
        setUbicationProduct('')
        setSize('')
        navigate(-1)
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido'
        triggerModal('Error', errorMessage, false)
      }
    }
  }

  const triggerModal = (title, message, success) => {
    setModalTitle(title)
    setModalMessage(message)
    setIsSuccess(success)
    setShowModal(true)
  }

  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    setNameProduct(getProduct ? getProduct.data.name : '')
    setCodeProduct(getProduct ? getProduct.data.code : '')
    setUbicationProduct(getProduct ? getProduct.data.ubication : '')
    setSize(getProduct ? getProduct.data.size : '')
  }, [getProduct])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getProduct = await getOneProduct(productId)
        const supplierId = getProduct ? getProduct.data.supplierId : null
        const suppliersRes = await getAllSuppliers()
        const categoriesRes = await getAllCategories() // Obtiene las categorías

        if (suppliersRes && suppliersRes.data) {
          setSuppliers(suppliersRes.data)
        }
        if (categoriesRes && categoriesRes.data) {
          setCategories(categoriesRes.data)
        }

        setSupplierId(supplierId)
        setGetProduct(getProduct)
      } catch (error) {
        console.error('Error fetching suppliers or product data:', error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            ¿Qué desea editar?
          </h1>
          <form className="row" onSubmit={handleSubmit}>
            {/* Selector de Categoría */}
            <div className="mb-3 col-md-4">
              <label className="fw-semibold form-label">Categoría</label>
              <select
                className="shadow-sm form-select"
                aria-label="Categoría"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">Seleccione</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Proveedor */}
            <div className="mb-3 col-md-4">
              <label className="fw-semibold form-label">Proveedor</label>
              <select
                className="shadow-sm form-select"
                aria-label="Proveedor"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
              >
                <option value="">Seleccione</option>
                {suppliers.map((prov) => (
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
              <label className="fw-semibold form-label">Código</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un código"
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

            {(selectedCategoryId === '3' || selectedCategoryId === '6') && (
              <div className="mb-2 col-4">
                <label className="fw-semibold form-label">
                  {selectedCategoryId === '3' ? 'Talla' : 'Tamaño'}
                </label>
                <input
                  type="text"
                  className="shadow-sm form-control"
                  placeholder={`Ingrese una ${
                    selectedCategoryId === '3' ? 'talla' : 'tamaño'
                  }`}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
            )}

            <div className="row mt-2">
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn fw-semibold px-4 button-hover mx-1"
                  style={{ background: '#791021', color: '#ffff' }}
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Regresar
                </button>
                <button
                  className="btn fw-semibold px-3 button-hover mx-1"
                  style={{ background: '#DAA520', color: '#ffff' }}
                  type="submit"
                >
                  Editar Producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <OperationModal
        showModal={showModal}
        handleClose={handleCloseModal}
        isSuccess={isSuccess}
        title={modalTitle}
        message={modalMessage}
        back={true}
      />
    </>
  )
}

export default EditProduct
