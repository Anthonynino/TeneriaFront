import { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { getAllCategories } from '../api/categories'
import { createProductRequest } from '../api/products'
import { GoAlertFill } from 'react-icons/go'
import { getAllSuppliers } from '../api/suppliers'

const ProductForm = () => {
  const { categoryId } = useParams()
  const [category, setCategory] = useState()
  const [getCategories, setGetCategories] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [fadeOutTimeout, setFadeOutTimeout] = useState(null)
  const [provider, setProvider] = useState()
  const [getSuppliers, setGetSuppliers] = useState()

  const handleCategory = (event) => {
    setCategory(event.target.value)
  }

  const handleProvider = (event) => {
    setProvider(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const categoryId = e.target[0].value
    const supplierId = e.target[1].value
    const nameProduct = e.target[2].value
    const codeProduct = e.target[3].value
    const ubicationProduct = e.target[4].value
    const quantityProduct = e.target[5].value
    const quantityInt = parseInt(quantityProduct)
    const size = e.target[6].value
    if (
      categoryId === '' ||
      supplierId === '' ||
      nameProduct === '' ||
      codeProduct === '' ||
      ubicationProduct === '' ||
      quantityProduct === ''
    ) {
      triggerAlert('Los campos deben estar llenos')
    } else {
      await createProductRequest(
        nameProduct,
        codeProduct,
        ubicationProduct,
        quantityInt,
        size,
        categoryId,
        supplierId
      )
    }
  }

  const triggerAlert = (message) => {
    setAlertMessage(message)
    setShowAlert(true)
    // Si hay un timeout en proceso, lo limpiamos
    if (fadeOutTimeout) clearTimeout(fadeOutTimeout)
    // Configuramos el timeout para desvanecer la alerta
    const timeout = setTimeout(() => {
      setShowAlert(false)
      setAlertMessage('')
    }, 3000) // Duración de la animación de desvanecimiento
    setFadeOutTimeout(timeout)
  }

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRes = await getAllCategories()
      setGetCategories(categoriesRes)
      const suppliersRes = await getAllSuppliers()
      setGetSuppliers(suppliersRes)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setCategory(categoryId)
  }, [categoryId])

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
              <label className=" fw-semibold form-label">Categoria</label>
              <select
                className="shadow-sm form-select"
                aria-label="Categoria"
                value={category}
                onChange={handleCategory}
              >
                <option value="">Seleccione</option>
                {getCategories?.data.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3 col-md-4">
              <label className="fw-semibold form-label">Proveedor</label>
              <select
                className="shadow-sm form-select"
                aria-label="Proveedor"
                value={provider}
                onChange={handleProvider}
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
                id="exampleFormControlInput1"
                placeholder="Ingrese un producto"
              />
            </div>

            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Codigo</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un codigo"
              />
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Ubicación</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese una ubicación"
              />
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Cantidad</label>
              <input
                type="number"
                className="shadow-sm form-control"
                placeholder="Ingrese una cantidad"
                min={1}
              />
            </div>
            {category === '3' && (
              <div className="mb-2 col-4">
                <label className="fw-semibold form-label">Talla</label>
                <input
                  type="text"
                  className="shadow-sm form-control"
                  placeholder="Ingrese una talla"
                />
              </div>
            )}
            {category === '6' && (
              <div className="mb-2 col-4">
                <label className="fw-semibold form-label">Tamaño</label>
                <input
                  type="text"
                  className="shadow-sm form-control"
                  placeholder="Ingrese un tamaño"
                />
              </div>
            )}
            <div className="row mt-2">
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn fw-semibold px-3 button-hover"
                  style={{ backgroundColor: '#DAA520', color: '#ffff' }}
                  type="submit"
                >
                  Agregar producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showAlert && (
        <div
          className="alert position-fixed bottom-0 end-0 mb-3 me-3 text-white alert-animation"
          style={{ background: '#DF3030', zIndex: '100' }}
          role="alert"
        >
          <div className="mb-2">
            <span style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}>
              <GoAlertFill color="yellow" />
            </span>
            {alertMessage}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductForm
