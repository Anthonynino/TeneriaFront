import { useState, useEffect } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa' // Asegúrate de instalar react-icons
import Navbar from '../Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductsRequest } from '../api/products'
import { creteEntryProducts } from '../api/products'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { VscError } from 'react-icons/vsc'
import { Modal } from 'react-bootstrap'
import axios from '../api/axios'
import { AiFillFilePdf } from 'react-icons/ai' // Importa el ícono de PDF

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
          { id: product.id, name: product.name, quantity: parseInt(countPlus) },
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

  const handleSubmit = async (e) => {
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
      const response = await creteEntryProducts(
        invoiceItems,
        user.id,
        recipientName,
        categoryId
      )
      if (response.status === 200) {
        setModalMessage('El stock se actualizó correctamente.')
        setIsSuccess(true)
        setShowModal(true)
      }
    } catch (error) {
      console.error('Error al actualizar el stock:', error)
      setModalMessage(error.response?.data?.message || 'Error desconocido')
      setIsSuccess(false)
      setShowModal(true)
    }
  }

  const handleGenerateInvoice = async () => {
    try {
      // Suponiendo que `invoiceItems` es un arreglo con los productos y el ID del usuario está disponible
      const formattedDate = `${new Date().toISOString().split('T')[0]}` // Formato de la fecha YYYY-MM-DD

      // Llamada a la API para generar la factura (suponiendo que tienes el endpoint en el backend)
      const response = await axios.post(
        `/generateInvoice`, // Cambia esta URL al endpoint correcto
        { items: invoiceItems, recipientName }, // Datos que enviarás en la petición
        {
          responseType: 'blob', // Obtener la respuesta como un archivo blob
        }
      )

      // Crear enlace temporal para descargar el archivo PDF
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = urlBlob
      link.setAttribute('download', `factura-${formattedDate}.pdf`) // Nombre del archivo
      document.body.appendChild(link)
      link.click() // Hacer clic en el enlace para descargar
      link.remove() // Eliminar el enlace temporal
    } catch (error) {
      console.error('Error al generar la factura:', error)
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
                      Producto
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
                    placeholder="Nombre completo"
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
      <Modal show={showModal} centered onHide={handleCloseModal}>
        <div className="p-5 text-center fonts-letter rounded-1">
          <div className="d-flex flex-column">
            {isSuccess ? (
              <AiOutlineCheckCircle
                className="mx-auto mb-1"
                size={160}
                style={{ color: '#DAA520' }} // Color para éxito
              />
            ) : (
              <VscError
                className="mx-auto mb-1"
                size={160}
                style={{ color: '#791021' }} // Color para error
              />
            )}
            <h3 style={{ color: isSuccess ? '#DAA520' : '#791021' }}>
              {isSuccess ? '¡Éxito!' : '¡Error!'}
            </h3>
            <p className="text-secondary" style={{ fontSize: '17px' }}>
              {modalMessage}
            </p>
          </div>
          <div className="mt-1 d-flex justify-content-center">
            {/* Botón Salir con el estilo existente */}
            <button
              className="btn glow-on-hover mx-1 px-4 py-2 button-hover rounded"
              type="button"
              style={{
                background: isSuccess ? '#DAA520' : '#791021',
                width: '160px',
                padding: '0.1rem',
              }}
              onClick={() => {
                // Si es exitoso, navega hacia atrás; si no, cierra la modal
                if (isSuccess) {
                  navigate(-1) // Regresar a la tabla
                } else {
                  handleCloseModal() // Solo cerrar la modal
                }
              }}
            >
              <span className="my-auto text-white">
                {isSuccess ? 'Salir' : 'OK'}
              </span>
            </button>
            {/* Condicional para mostrar el botón de generar factura */}
            {isSuccess && (
              <button
                className="btn glow-on-hover mx-1 px-2 button-hover rounded"
                type="button"
                style={{
                  background: '#791021',
                  width: 'fit-content',
                  padding: '0.1rem',
                }}
                onClick={handleGenerateInvoice} // Acción para generar la factura
              >
                <span className="me-1">
                  <AiFillFilePdf size={20} className="text-white" />{' '}
                  {/* Ícono de archivo PDF */}
                </span>
                <span className="my-auto text-white">Generar Factura</span>
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProductEntry
