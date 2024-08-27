import { addSuppliersRequest } from '../api/suppliers'
import Navbar from '../Navbar'
import { useState } from 'react'

const AddProviders = () => {
  // Estado para controlar la selección del botón de radio
  const [selectedOption, setSelectedOption] = useState('si')

  // Maneja el cambio en los botones de radio
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value)
  }
  
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [fadeOutTimeout, setFadeOutTimeout] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const rif = e.target[1].value
    const ubication = e.target[2].value
    
    if (
      name === '' ||
      rif === '' ||
      ubication === ''
      
    ) {
      triggerAlert('Los campos deben estar llenos')
    } else {
      console.log({name, rif, ubication});
      
      await addSuppliersRequest(
        name,
        rif,
        ubication,
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


  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-50 row mt-5 h-50 mx-auto"
          style={{ paddingTop: '4rem' }}
        >
          <h1 className="text-center fw-bold mb-5" style={{ color: '#791021' }}>
            ¿Que proveedor deseas agregar?
          </h1>
          <form className="row" onSubmit={handleSubmit}>
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
                placeholder="Ingrese un codigo"
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
                  className="btn fw-semibold px-3 button-hover"
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
    </>
  )
}

export default AddProviders
