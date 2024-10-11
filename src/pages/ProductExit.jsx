import { useState } from 'react'
import { FaPlus } from 'react-icons/fa' // Asegúrate de instalar react-icons
import Navbar from '../Navbar'

const ProductEntry = () => {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [countPlus, setCountPlus] = useState(0)
  const [description, setDescription] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [invoiceItems, setInvoiceItems] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')

  const productsValues = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
    { id: 3, name: 'Producto 3' },
  ]

  const departments = [
    { id: 1, name: 'Departamento A' },
    { id: 2, name: 'Departamento B' },
    { id: 3, name: 'Departamento C' },
  ]

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value)
  }

  const handleChangeCount = (e) => {
    setCountPlus(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleRecipientChange = (e) => {
    setRecipientName(e.target.value)
  }

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value)
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (selectedProduct && countPlus > 0) {
      const product = productsValues.find((p) => p.id == selectedProduct)
      setInvoiceItems((prevItems) => [
        ...prevItems,
        { name: product.name, quantity: countPlus },
      ])
      // Resetear los campos después de añadir
      setSelectedProduct('')
      setCountPlus(0)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Descripción:', description)
    console.log('Nombre del receptor:', recipientName)
    console.log('Departamento:', selectedDepartment)
    console.log('Productos:', invoiceItems)
    // Aquí iría la lógica para guardar la factura
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ marginTop: '13px' }}>
        <div
          className="border rounded pt-1 shadow-lg"
          style={{
            maxWidth: '500px',
            margin: 'auto',
            padding: '15px',
            marginTop: '60px',
          }}
        >
          <div className="text-center">
            <h2 className="fw-bold" style={{ color: '#791021' }}>
              Generar salida
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
                  {productsValues.map((product) => (
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
                  <FaPlus /> {/* Icono de añadir */}
                  Añadir
                </button>
              </div>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="bg-secondary text-white">
                <tr>
                  <th style={{ color: '#791021' }}>Cantidad</th>
                  <th style={{ color: '#791021' }}>Unidad</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No hay productos añadidos
                    </td>
                  </tr>
                ) : (
                  invoiceItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.quantity}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Nuevo Select para Departamentos */}
          <div className="mb-3">
            <label
              htmlFor="departamentos"
              style={{ fontSize: '14px', color: '#791021' }}
              className="fw-bold"
            >
              Departamento
            </label>
            <select
              id="departamentos"
              className="form-select"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">Seleccionar departamento</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-12">
                <label
                  htmlFor="description"
                  style={{ fontSize: '14px', color: '#791021' }}
                  className="fw-bold"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  value={description}
                  rows={1}
                  onChange={handleDescriptionChange}
                />
              </div>

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
                  type="submit"
                  className="btn fw-semibold px-4 button-hover mt-1 mx-2"
                  style={{
                    background: '#791021',
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
  )
}

export default ProductEntry
