import Navbar from '../Navbar'
import { useState } from 'react'
import { addSupplier } from '../api/providers'
import { useNavigate } from 'react-router-dom'
import OperationModal from './SuccessfulOperation'

const AddProviders = () => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('si')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [isSuccess, setIsSuccess] = useState(true)

  //Funcion para resetear los valores del form despues de el envio
  const resetForm = () => {
    setSelectedOption('si')
    document.getElementById('addSupplierForm').reset()
  }

  // Maneja el cambio en los botones de radio
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const companyName = e.target[0].value
    const RIF = e.target[1].value
    const location = e.target[2].value
    if (companyName === '' || RIF === '' || location === '') {
      setIsSuccess(false)
      setModalTitle('Error')
      setModalMessage('Los campos deben estar llenos.')
      setShowModal(true)
    } else {
      try {
        await addSupplier(
          companyName,
          RIF,
          location,
          selectedOption === 'si'
        )
        resetForm()
        setIsSuccess(true)
        setModalTitle('¡Hecho!')
        setModalMessage('¡Operación realizada exitosamente!')
        setShowModal(true)
      } catch (error) {
        setIsSuccess(false)
        setModalTitle('Error')
        setModalMessage('Hubo un problema al realizar la operación.')
        setShowModal(true)
      }
    }
  }

  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-50 row mt-5 h-50 mx-auto"
          style={{ paddingTop: '4rem' }}
        >
          <h1 className="text-center fw-bold mb-5" style={{ color: '#791021' }}>
            ¿Qué proveedor deseas agregar?
          </h1>
          <form className="row" onSubmit={handleSubmit} id="addSupplierForm">
            <div className="mb-3 col-6">
              <label className="fw-semibold form-label">
                Nombre de la empresa
              </label>
              <input
                type="text"
                className="shadow-sm form-control"
                id="exampleFormControlInput1"
                placeholder="Ingrese un nombre"
              />
            </div>

            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">RIF</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un código"
              />
            </div>
            <div className="mb-3 col-7">
              <label className="fw-semibold form-label">Ubicación</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese una ubicación"
              />
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">
                ¿Está en el territorio nacional?
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radioSi"
                  name="territorioNacional"
                  value="si"
                  checked={selectedOption === 'si'}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="radioSi">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radioNo"
                  name="territorioNacional"
                  value="no"
                  checked={selectedOption === 'no'}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="radioNo">
                  No
                </label>
              </div>
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
                  Agregar proveedor
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
      />
    </>
  )
}

export default AddProviders
