import { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { editProductRequest } from '../api/products'
import OperationModal from './SuccessfulOperation'
import { getOneSupplier } from '../api/suppliers'
import { getOneProduct } from '../api/products'
import { useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const navigate = useNavigate()
  const { productId, categoryId } = useParams()
  const [provider, setProvider] = useState('')
  const [nameSupplier, setSupplierName] = useState('')
  const [codeProduct, setCodeProduct] = useState('')
  const [ubicationProduct, setUbicationProduct] = useState('')
  const [quantityProduct, setQuantityProduct] = useState('')
  const [size, setSize] = useState('')
  const [getProduct, setGetProduct] = useState()
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [isSuccess, setIsSuccess] = useState(true)
 /*  const [user, setUser] = useState() */
  const [nameProduct, setNameProduct] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const quantityInt = parseInt(quantityProduct)

    if (
      !nameProduct ||
      !codeProduct ||
      !ubicationProduct ||
      !quantityProduct
    ) {
      triggerModal('Error', 'Los campos deben estar llenos', false) // Error con título personalizado
    } else {
      try {
        // Intenta crear el producto y espera la respuesta
        await editProductRequest(
          nameProduct,
          codeProduct,
          ubicationProduct,
          quantityInt,
          size,
          categoryId,
          provider,
        )

        // Si la creación es exitosa, muestra el mensaje de éxito
        triggerModal('¡Éxito!', '¡Producto Editado correctamente!', true)

        setProvider('')
        setNameProduct('')
        setCodeProduct('')
        setUbicationProduct('')
        setQuantityProduct('')
        setSize('')
      } catch (error) {
        // Si ocurre un error, muestra el mensaje de error
        const errorMessage =
          error.response?.data?.message || 'Error desconocido'
        triggerModal('Error', errorMessage, false) // Error con título personalizado
      }
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
    setNameProduct(getProduct ? getProduct.data.name : "")
    setCodeProduct(getProduct ? getProduct.data.code : "")
    setUbicationProduct(getProduct ? getProduct.data.ubication : "")
    setQuantityProduct(getProduct ? getProduct.data.quantity : "")
    setSize(getProduct ? getProduct.data.size : "")
  }, [getProduct])

  useEffect(() => {
    const fetchData = async () => {
      const getProduct = await getOneProduct(productId)
      const supplierId = getProduct ? getProduct.data.supplierId : null
      const getSupplier = await getOneSupplier(supplierId)
      console.log(getSupplier)
      setGetProduct(getProduct)
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
            ¿Que desea editar?
          </h1>
          <form className="row" onSubmit={handleSubmit}>

            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">
                Proveedor
              </label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un producto"
                value={nameSupplier}
                onChange={(e) => setSupplierName(e.target.value)}
              />
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
            {(categoryId === '3' || categoryId === '6') && (
              <div className="mb-2 col-4">
                <label className="fw-semibold form-label">
                  {categoryId === '3' ? 'Talla' : 'Tamaño'}
                </label>
                <input
                  type="text"
                  className="shadow-sm form-control"
                  placeholder={`Ingrese una ${
                    categoryId === '3' ? 'talla' : 'tamaño'
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

export default EditProduct