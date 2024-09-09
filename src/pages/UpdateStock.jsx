import { ImEnter, ImExit } from 'react-icons/im'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { updateStock } from '../api/products'
import SuccessfulOperation from './SuccessfulOperation'
import { getAllDepartments } from '../api/departments'

function UpdateStock({
  modalUpdateStock, // Indica el modal para poder abrirlo o cerrarlo
  handleCloseUpdateStock, // Función usada para cerrar este modal
  productsValues, // Data de los productos para el select
  isExit, // Recibimos la variable que indica si es salida o entrada
  fetchProductTable, //Funcion encargada de recargar la tabla de una vez se actualice el stock de los productos
}) {
  const [countPlus, setCountPlus] = useState(0) // Estado encargado de almacenar el valor de la cantidad
  const [selectedProduct, setSelectedProduct] = useState('') // Estado para manejar la selección del producto
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [user, setUser] = useState() //Estado para guardar el valor del localstorage del usuario
  const [modalSuccess, setModalSuccess] = useState(false) //Modal para mostrar que la acción se realizó exitosamente
  const [arrayDepartments, setArrayDepartments] = useState([]) //Guardar la data de los departamentos

  // Cuando el modal se cierra, restablece los estados
  useEffect(() => {
    const fecthDepartments = async () => {
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
    fecthDepartments()
  }, [modalUpdateStock])

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

    if (isExit) {
      // Si es salida, siempre negativo, no permitir valores positivos
      if (value > 0) {
        value = 0
      }
    } else {
      // Si es entrada, siempre positivo, no permitir valores menores que 1
      if (value < 1) {
        value = 1
      }
    }

    setCountPlus(value) // Actualizamos el estado
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
      alert('Por favor, complete todos los campos requeridos.')
      return // Detiene la ejecución si falta algún campo
    }

    try {
      // Lógica para aceptar el cambio
      const updateData = {
        productId: selectedProduct,
        count: countPlus,
        userId: user.id,
        departmentId: isExit ? selectedDepartment : null,
        movementType: isExit ? 'Salida' : 'Entrada',
      }

      // Realiza la actualización del stock
      const response = await updateStock(updateData)

      // Verifica que la respuesta sea exitosa
      if (response.status === 200) {
        setModalSuccess(true)
        fetchProductTable()
        handleCloseUpdateStock() // Cierra el modal después de procesar
      }
    } catch (error) {
      console.error('Error al actualizar el stock:', error)
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
              min={isExit ? -Infinity : 1} // Permitimos decrementar en salida, pero no en entrada
              value={isExit ? countPlus : Math.abs(countPlus)} // Si es salida, muestra el valor negativo, si es entrada, positivo
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
      {/* Componente para mostrar un modal con operacion exitosa */}
      <SuccessfulOperation
        modalSuccess={modalSuccess}
        handleCloseSuccess={() => setModalSuccess(false)}
      />
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
}

export default UpdateStock
