import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { editSupplier } from '../api/suppliers'
import { useNavigate, useParams } from 'react-router-dom'
import OperationModal from './SuccessfulOperation'
import { getOneSupplier } from '../api/suppliers'

const EditSupplier = () => {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('si')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [isSuccess, setIsSuccess] = useState(true)
  const [nameCompany, setNameCompany] = useState('')
  const [ubication, setUbication] = useState('')
  const [fullCode, setFullCode] = useState('') // Nuevo campo para el código completo
  const [codeNumber, setNumberCode] = useState('') // Parte numérica editable

  const resetForm = () => {
    setSelectedOption('si')
    document.getElementById('editSupplierForm').reset()
  }

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleCodigoNumericoChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && value.length <= 3) {
      setNumberCode(value) // Solo permite hasta 3 dígitos
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const companyName = e.target[0].value
    const location = e.target[1].value
    const finalCode = fullCode.slice(0, -3) + codeNumber

    if (companyName === '' || location === '' || codeNumber === '') {
      setIsSuccess(false)
      setModalTitle('Error')
      setModalMessage('Todos los campos deben estar llenos.')
      setShowModal(true)
    } else {
      try {
        await editSupplier(
          supplierId,
          companyName,
          location,
          selectedOption === 'si',
          finalCode
        )
        resetForm()
        setIsSuccess(true)
        setModalTitle('¡Hecho!')
        setModalMessage('¡Operación realizada exitosamente!')
        setShowModal(true)
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          'Hubo un problema al realizar la operación.'
        setIsSuccess(false)
        setModalTitle('Error')
        setModalMessage(errorMessage)
        setShowModal(true)
      }
    }
  }

  const handleCloseModal = () => setShowModal(false)

  useEffect(() => {
    const fetchData = async () => {
      const supplierData = await getOneSupplier(supplierId)
      setNameCompany(supplierData.data.name)
      setUbication(supplierData.data.location)
      setFullCode(supplierData.data.code)
      setNumberCode(supplierData.data.code.slice(-3))
      setSelectedOption(
        supplierData
          ? supplierData.data.IsInNationalTerritory == true
            ? 'si'
            : 'no'
          : ''
      )
    }
    fetchData()
  }, [supplierId])

  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-50 row mt-5 h-50 mx-auto"
          style={{ paddingTop: '4rem' }}
        >
          <h1 className="text-center fw-bold mb-5" style={{ color: '#791021' }}>
            ¿Qué desea editar?
          </h1>
          <form className="row" onSubmit={handleSubmit} id="editSupplierForm">
            <div className="mb-3 col-6">
              <label className="fw-semibold form-label">
                Nombre de la empresa
              </label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un nombre"
                value={nameCompany}
                onChange={(e) => setNameCompany(e.target.value)}
              />
            </div>
            <div className="mb-3 col-6">
              <label className="fw-semibold form-label">Ubicación</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese una ubicación"
                value={ubication}
                onChange={(e) => setUbication(e.target.value)}
              />
            </div>
            <div className="mb-3 col-6">
              <label className="fw-semibold form-label d-flex">
                ¿Está en el territorio nacional?
              </label>
              <div className="d-flex mt-3">
                <div className="form-check me-3">
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
            </div>
            <div className="mb-3 col-6">
              <label className="fw-semibold form-label">
                Código del proveedor
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  {fullCode.slice(0, -3)}
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={codeNumber}
                  onChange={handleCodigoNumericoChange}
                  maxLength="3"
                  placeholder="###"
                />
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
                  Editar proveedor
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

export default EditSupplier
