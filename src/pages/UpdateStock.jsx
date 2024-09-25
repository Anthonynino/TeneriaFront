import { ImEnter, ImExit } from 'react-icons/im'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { updateStock } from '../api/products'
import { getAllDepartments } from '../api/departments'

function UpdateStock({
  modalUpdateStock, // Indica el modal para poder abrirlo o cerrarlo
  handleCloseUpdateStock, // Función usada para cerrar este modal
  productsValues, // Data de los productos para el select
  isExit, // Recibimos la variable que indica si es salida o entrada
  fetchProductTable, // Función encargada de recargar la tabla de una vez se actualice el stock de los productos
  setShowModal, // Estado para abrir el modal de error o de éxito
  setModalMessage, // Estado para enviar un mensaje al modal
  setModalTitle, // Enviar el título si es error, etc.
  setIsSuccess, // Indicar que si fue un error o fue un éxito
}) {
  const [countPlus, setCountPlus] = useState(0) // Estado encargado de almacenar el valor de la cantidad
  const [selectedProduct, setSelectedProduct] = useState('') // Estado para manejar la selección del producto
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [user, setUser] = useState() // Estado para guardar el valor del localstorage del usuario
  const [arrayDepartments, setArrayDepartments] = useState([]) // Guardar la data de los departamentos

  useEffect(() => {
    const fetchDepartments = async () => {
      // Llamar el servicio para obtener los departamentos
      const data = await getAllDepartments()
      setArrayDepartments(data.data)
    }

    if (!modalUpdateStock) {
      setCountPlus(0)
      setSelectedProduct('')
      setSelectedDepartment('')
    }

    // Recupera la información del usuario desde localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    }

    fetchDepartments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Maneja el cambio en el select de los productos
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value)
  }

  // Maneja el cambio en el select de los departamentos
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value)
  }

  // Función para manejar los cambios en el campo de entrada
  const handleChangeCount = (event) => {
    let value = parseInt(event.target.value, 10)

    if (isNaN(value)) {
      return
    }

    // Almacenamos el valor tal como se introdujo, positivo o negativo
    setCountPlus(value)
  }

  // Función encargada de actualizar el stock de los productos
  const handleUpdateStock = async () => {
    // Validación de campos requeridos
    if (
      !selectedProduct ||
      countPlus === undefined ||
      !user ||
      (isExit && !selectedDepartment)
    ) {
      handleCloseUpdateStock()
      setModalTitle('Error')
      setModalMessage('Por favor, complete todos los campos requeridos.')
      setIsSuccess(false)
      setShowModal(true)
      return // Detiene la ejecución si falta algún campo
    }

    // Validación para asegurarse de que la cantidad sea mayor a 0
    if (countPlus === 0) {
      setModalTitle('Error')
      setModalMessage('La cantidad a ingresar o retirar debe ser mayor a 0.')
      setIsSuccess(false)
      setShowModal(true)
      handleCloseUpdateStock()
      return // Detiene la ejecución si la cantidad es 0
    }

    try {
      // Lógica para aceptar el cambio, si es salida, asegurarse de que sea negativo
      const updateData = {
        productId: selectedProduct,
        count: isExit ? -Math.abs(countPlus) : countPlus, // Coloca el valor negativo si es salida
        userId: user.id,
        departmentId: isExit ? selectedDepartment : null,
        movementType: isExit ? 'Salida' : 'Entrada',
      }

      // Realiza la actualización del stock
      const response = await updateStock(updateData)

      // Verifica que la respuesta sea exitosa
      if (response.status === 200) {
        setModalTitle('Éxito')
        setModalMessage('El stock se actualizó correctamente.')
        setIsSuccess(true)
        setShowModal(true)
        fetchProductTable()
        handleCloseUpdateStock() // Cierra el modal después de procesar
      }
    } catch (error) {
      console.error('Error al actualizar el stock:', error)
      setModalTitle('Error')
      setModalMessage(error.response?.data?.message || 'Error desconocido')
      setIsSuccess(false)
      setShowModal(true)
      handleCloseUpdateStock()
    }
  }

  return (
    <>
      <Modal show={modalUpdateStock} centered>
        <div className="p-5 fonts-letter rounded-1">
          <div className="d-flex flex-column">
            {/* Cambiamos el icono dependiendo de si es entrada o salida */}
            {isExit ? (
              <ImExit className="mx-auto text-secondary mb-2" size={100} />
            ) : (
              <ImEnter className="mx-auto text-secondary mb-2" size={100} />
            )}

            <label
              htmlFor="Productos"
              style={{ fontSize: '15px', color: '#791021' }}
              className="fw-bold"
            >
              Producto
            </label>
            <select
              id="Productos"
              className="form-select border border-secondary mb-3"
              aria-label="Seleccionar producto"
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

            {/* Solo mostramos el select de departamentos si es una salida (isExit es true) */}
            {isExit && (
              <>
                <label
                  htmlFor="Departments"
                  style={{ fontSize: '15px', color: '#791021' }}
                  className="fw-bold"
                >
                  Departamento de salida
                </label>
                <select
                  id="Departments"
                  className="form-select border border-secondary mb-3"
                  aria-label="Seleccionar departamento"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Seleccionar departamento</option>
                  {arrayDepartments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label
              htmlFor="cantidadAIngresar"
              style={{ fontSize: '15px', color: '#791021' }}
              className="fw-bold"
            >
              Cantidad a {isExit ? 'Salir' : 'Ingresar'}
            </label>
            <input
              id="cantidadAIngresar"
              type="number"
              className="form-control border border-secondary rounded py-1"
              style={{ width: '70px' }}
              min={0}
              value={countPlus}
              onChange={handleChangeCount}
            />
          </div>

          {/* Botones para aceptar o cancelar */}
          <div className="mt-3 d-flex justify-content-center">
            <button
              className="btn button-submit text-white text-white mx-2 px-5"
              type="button"
              style={{ width: '60%' }}
              onClick={handleCloseUpdateStock}
            >
              <span className="my-auto">Cancelar</span>
            </button>
            <button
              className="btn button-submit text-white text-white mx-2 px-5"
              type="submit"
              style={{ width: '60%' }}
              onClick={handleUpdateStock}
            >
              <span className="my-auto">Aceptar</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

UpdateStock.propTypes = {
  modalUpdateStock: PropTypes.bool,
  handleCloseUpdateStock: PropTypes.func,
  productsValues: PropTypes.array,
  arrayDepartments: PropTypes.array,
  isExit: PropTypes.bool,
  fetchProductTable: PropTypes.func,
  setShowModal: PropTypes.func.isRequired,
  setModalMessage: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
  setIsSuccess: PropTypes.func.isRequired,
}

export default UpdateStock
