import { useState, useEffect } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa' // Asegúrate de instalar react-icons
import Navbar from '../Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductsRequest } from '../api/products'
import OperationModal from './SuccessfulOperation'

const ProductEntry = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [selectedProduct, setSelectedProduct] = useState('')
  const [countPlus, setCountPlus] = useState(0)
  const [recipientName, setRecipientName] = useState('')
  const [invoiceItems, setInvoiceItems] = useState([])
  const [arrayProduct, setArrayProduct] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [user, setUser] = useState()
  const [isSuccess, setIsSuccess] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductsRequest(categoryId)
      setArrayProduct(res.data)
    }

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    }
    fetchData()
  }, [categoryId])

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value)
  }

  const handleChangeCount = (e) => {
    setCountPlus(e.target.value)
  }

  const handleRecipientChange = (e) => {
    setRecipientName(e.target.value)
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (selectedProduct && countPlus > 0) {
      const product = arrayProduct.find((p) => p.id == selectedProduct)

      // Verificar si el producto ya está en la lista
      const existingItemIndex = invoiceItems.findIndex(
        (item) => item.name === product.name
      )

      if (existingItemIndex !== -1) {
        // Si el producto ya existe, sumar la cantidad
        setInvoiceItems((prevItems) => {
          const newItems = [...prevItems]
          newItems[existingItemIndex].quantity += parseInt(countPlus)
          return newItems
        })
      } else {
        // Si el producto es nuevo, agregarlo a la lista
        setInvoiceItems((prevItems) => [
          ...prevItems,
          { name: product.name, quantity: parseInt(countPlus) },
        ])
      }

      // Resetear los campos después de añadir
      setSelectedProduct('')
      setCountPlus(0)
    } else {
      setModalMessage(
        'Por favor, selecciona un producto y asegúrate de que la cantidad sea mayor a 0 antes de agregarlo.'
      )
      setIsSuccess(false)
      setShowModal(true)
    }
  }

  const handleRemoveItem = (index) => {
    setInvoiceItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  const handleCloseModal = () => setShowModal(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (invoiceItems.length === 0) {
      setModalMessage(
        'Debes ingresar al menos un producto para poder guardar la entrada'
      )
      setIsSuccess(false)
      setShowModal(true)
      return
    }

    if (!user || !recipientName) {
      setModalMessage('Por favor, Ingrese el nombre del receptor.')
      setIsSuccess(false)
      setShowModal(true)
      return
    }

    try {
      console.log('hola')
    } catch (error) {
      console.error('Error al ingresar la entrada de los productos:', error)
    }
  }

  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className="container" style={{ marginTop: '13px' }}>
          <div
            className="border rounded p-3 shadow-lg"
            style={{
              maxWidth: '500px',
              margin: 'auto',
              padding: '15px',
              marginTop: '60px',
            }}
          >
            <div className="text-center">
              <h2 className="fw-bold" style={{ color: '#791021' }}>
                Generar entrada
              </h2>
            </div>

            <form onSubmit={handleAddProduct}>
              <div className="row g-2">
                <div className="col-6">
                  <label
                    htmlFor="Productos"
                    style={{ fontSize: '14px', color: '#791021' }}
                    className="fw-bold"
                  >
                    Producto
                  </label>
                  <select
                    id="Productos"
                    className="form-select"
                    value={selectedProduct}
                    onChange={handleProductChange}
                  >
                    <option value="">Seleccionar producto</option>
                    {arrayProduct.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-6">
                  <label
                    htmlFor="cantidadAIngresar"
                    style={{ fontSize: '14px', color: '#791021' }}
                    className="fw-bold"
                  >
                    Cantidad
                  </label>
                  <input
                    id="cantidadAIngresar"
                    type="number"
                    className="form-control"
                    min={0}
                    value={countPlus}
                    onChange={handleChangeCount}
                  />
                </div>

                <div className="mb-2 col-12 text-center">
                  <button
                    type="submit"
                    className="btn border fw-semibold px-3 button-hover mx-1"
                    style={{ color: '#791021' }}
                  >
                    <FaPlus />
                    Añadir
                  </button>
                </div>
              </div>
            </form>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th style={{ color: '#791021', textAlign: 'center' }}>
                      Cantidad
                    </th>
                    <th style={{ color: '#791021', textAlign: 'center' }}>
                      Unidad
                    </th>
                    <th style={{ color: '#791021', textAlign: 'center' }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No hay productos añadidos
                      </td>
                    </tr>
                  ) : (
                    invoiceItems.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-12">
                  <label
                    htmlFor="recipientName"
                    style={{ fontSize: '14px', color: '#791021' }}
                    className="fw-bold"
                  >
                    Nombre del receptor
                  </label>
                  <input
                    id="recipientName"
                    type="text"
                    className="form-control"
                    value={recipientName}
                    onChange={handleRecipientChange}
                  />
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn fw-semibold px-4 button-hover mt-1 mx-2"
                    style={{
                      background: '#791021',
                      color: '#ffff',
                      marginBottom: '-5px',
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Regresar
                  </button>
                  <button
                    type="submit"
                    className="btn fw-semibold px-4 button-hover mt-1 mx-2"
                    style={{
                      background: '#DAA520',
                      color: '#ffff',
                      marginBottom: '-5px',
                    }}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <OperationModal
        showModal={showModal}
        handleClose={handleCloseModal}
        isSuccess={isSuccess}
        message={modalMessage}
      />
    </>
  )
}

export default ProductEntry
