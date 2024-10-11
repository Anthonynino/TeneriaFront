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
  const [specifications, setSpecifications] = useState('')
  const [getCategories, setGetCategories] = useState()
  const [getSuppliers, setGetSuppliers] = useState()
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(true)

  // Mapeo de las categorías con sus códigos
  const categoryCodes = {
    1: 'ELE-',
    2: 'PLO-',
    3: 'SEG-',
    4: 'MTL-',
    5: 'PNT-',
    6: 'TRN-',
  }

  // Establecer el valor inicial del código cuando se cargue la categoría
  useEffect(() => {
    const fetchData = async () => {
      const categoriesRes = await getAllCategories()
      const currentCategory = categoriesRes.data.find(
        (c) => c.id === categoryId
      )
      setGetCategories(currentCategory)

      const suppliersRes = await getAllSuppliers()
      setGetSuppliers(suppliersRes)
    }
    fetchData()
  }, [categoryId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!category || !nameProduct || !codeProduct || !ubicationProduct) {
      triggerModal('Los campos deben estar llenos', false)
    } else {
      try {
        // Añadir prefijo al código del producto
        const prefix = categoryCodes[getCategories?.id] || ''
        const finalCodeProduct = prefix + codeProduct

        // Añadir prefijo a la ubicación
        const finalUbicationProduct = 'Bodega ' + ubicationProduct

        await createProductRequest(
          nameProduct,
          finalCodeProduct,
          finalUbicationProduct,
          specifications,
          categoryId,
          provider
        )

        triggerModal('¡Producto agregado correctamente!', true)

        // Limpiar campos después del envío
        setCategory('')
        setProvider('')
        setNameProduct('')
        setCodeProduct('') // Solo limpiar el valor numérico, sin prefijo
        setUbicationProduct('')
        setSpecifications('')
        navigate(-1)
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido'
        triggerModal(errorMessage, false)
      }
    }
  }

  const triggerModal = (message, success) => {
    setModalMessage(message)
    setIsSuccess(success)
    setShowModal(true)
  }

  const handleCloseModal = () => setShowModal(false)

  // Validar que solo se puedan ingresar 3 dígitos en el código
  const handleCodeChange = (e) => {
    const inputCode = e.target.value.replace(/\D/g, '').slice(0, 3) // Solo 3 números
    setCodeProduct(inputCode)
  }

  // Validar que solo se permita una letra y un número en la ubicación
  const handleUbicationChange = (e) => {
    const inputUbication = e.target.value

    // Extraer la letra y el número
    const validUbication = inputUbication
      .replace(/[^A-Za-z0-9]/g, '')
      .slice(0, 2) // Solo una letra y un número

    setUbicationProduct(validUbication)
  }

  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-50 row mt-5 h-50 mx-auto"
          style={{ paddingTop: '3rem' }}
        >
          <h1 className="text-center fw-bold mb-5" style={{ color: '#791021' }}>
            ¿Qué desea agregar?
          </h1>
          <form className="row" onSubmit={handleSubmit}>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Categoria</label>
              <input
                type="text"
                className="shadow-sm form-control"
                value={getCategories ? getCategories?.name : ''}
                readOnly
              />
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
              <label className="fw-semibold form-label">Código</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese 3 dígitos"
                value={codeProduct}
                onChange={handleCodeChange}
                maxLength="3" // Limita a 3 caracteres numéricos
              />
            </div>

            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Ubicación</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Letra y número"
                value={ubicationProduct}
                onChange={handleUbicationChange}
                maxLength="2" // Limita a 2 caracteres (letra y número)
              />
            </div>
            <div className="mb-2 col-4">
              <label className="fw-semibold form-label">
                {category === '3' ? 'Talla' : 'Especificación'}
              </label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder={`Ingrese una ${
                  category === '3' ? 'talla' : 'especificación'
                }`}
                value={specifications}
                onChange={(e) => setSpecifications(e.target.value)}
              />
            </div>
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
      <OperationModal
        showModal={showModal}
        message={modalMessage}
        isSuccess={isSuccess}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default ProductForm
