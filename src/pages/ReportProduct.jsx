import Navbar from '../Navbar'
import { SiMicrosoftexcel } from 'react-icons/si'
import { FaRegFilePdf } from 'react-icons/fa'
import axios from '../api/axios'
import { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { Modal } from 'react-bootstrap'
import { GrDocumentMissing } from 'react-icons/gr'

function ReportProducts() {
  const [user, setUser] = useState() // Estado para guardar el valor del localstorage del usuario
  const [minEndDate, setMinEndDate] = useState('') // Estado para manejar la fecha mínima del segundo input
  const [currentDate, setCurrentDate] = useState('') // Estado para manejar la fecha actual
  const [startDate, setStartDate] = useState('') // Estado para la fecha "Desde"
  const [endDate, setEndDate] = useState('') // Estado para la fecha "Hasta"
  const [showModal, setShowModal] = useState(false)
  const [messageModal, setMessageModal] = useState('')

  // Recupera la información del usuario desde localStorage al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem('user') // Obtener usuario almacenado
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) // Convertirlo de string a objeto
      setUser(parsedUser) // Actualizar el estado con el usuario
    }
  }, [])

  // Obtener la fecha actual en formato YYYY-MM-DD al cargar la página
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0] // Obtenemos la fecha actual en formato YYYY-MM-DD
    setCurrentDate(today) // Actualizamos el estado de la fecha actual
  }, [])

  // Función para descargar el reporte en Excel
  const downloadExcel = async () => {
    // Verificar que ambas fechas están seleccionadas
    if (!startDate || !endDate) {
      setShowModal(true)
      setMessageModal('Debes seleccionar ambas fechas.')
      return // Salir de la función si falta alguna fecha
    }
    try {
      const formattedDate = `${new Date().toISOString().split('T')[0]}` // Formatear la fecha a YYYY-MM-DD

      const response = await axios.get(
        `/reportProductExcel/${user.id}?startDate=${startDate}&endDate=${endDate}`,
        {
          responseType: 'blob', // Obtener la respuesta como un blob (archivo)
        }
      )

      // Crear enlace temporal para descargar el archivo
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = urlBlob
      link.setAttribute('download', `reporte-movimientos-${formattedDate}.xlsx`) // Nombre del archivo
      document.body.appendChild(link)
      link.click() // Hacer clic en el enlace para descargar
      link.remove() // Eliminar el enlace temporal
    } catch (error) {
      if (error.response) {
        // Manejo del error 404 específicamente
        if (error.response.status === 404) {
          setShowModal(true)
          setMessageModal(
            'No se encontraron registros en el rango de fechas seleccionado.'
          ) // Mensaje específico para error 404
        } else {
          // Mensaje general para otros errores que no sean 404
          const errorMessage =
            error.response.data.message ||
            'Error desconocido al descargar el reporte.'
          setShowModal(true)
          setMessageModal(errorMessage)
        }
      } else {
        setShowModal(true)
        setMessageModal('Error de conexión o inesperado. Intente nuevamente.')
      }
    }
  }

  // Función para descargar el reporte en PDF
  const downloadPDF = async () => {
    // Verificar que ambas fechas están seleccionadas
    if (!startDate || !endDate) {
      setShowModal(true)
      setMessageModal('Debes seleccionar ambas fechas.')
      return // Salir de la función si falta alguna fecha
    }

    try {
      const formattedDate = `${new Date().toISOString().split('T')[0]}` // Formatear la fecha a YYYY-MM-DD

      const response = await axios.get(
        `/reportProductPDF/${user.id}?startDate=${startDate}&endDate=${endDate}`,
        {
          responseType: 'blob', // Obtener la respuesta como un blob (archivo)
        }
      )

      // Crear enlace temporal para descargar el archivo
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = urlBlob
      link.setAttribute('download', `reporte-movimientos-${formattedDate}.pdf`) // Nombre del archivo
      document.body.appendChild(link)
      link.click() // Hacer clic en el enlace para descargar
      link.remove() // Eliminar el enlace temporal
    } catch (error) {
      if (error.response) {
        // Manejo del error 404 específicamente
        if (error.response.status === 404) {
          setShowModal(true)
          setMessageModal(
            'No se encontraron registros en el rango de fechas seleccionado.'
          ) // Mensaje específico para error 404
        } else {
          // Mensaje general para otros errores que no sean 404
          const errorMessage =
            error.response.data.message ||
            'Error desconocido al descargar el reporte.'
          setShowModal(true)
          setMessageModal(errorMessage)
        }
      } else {
        setShowModal(true)
        setMessageModal('Error de conexión o inesperado. Intente nuevamente.')
      }
    }
  }

  // Lista de opciones de reportes
  const cardReport = [
    {
      id: 1,
      title: 'Excel', // Título de la tarjeta
      description:
        'Formato de tablas centrado en el análisis detallado y personalizado de datos', // Descripción del formato
      icon: <SiMicrosoftexcel size={80} />, // Ícono de Excel
      color: '#207244', // Verde similar al de Excel
      action: downloadExcel, // Acción de descargar Excel
    },
    {
      id: 2,
      title: 'PDF', // Título de la tarjeta
      description:
        'Excelente formato estándar para compartir datos de manera segura y presentable.', // Descripción del formato
      icon: <FaRegFilePdf size={80} />, // Ícono de PDF
      color: '#da2727', // Rojo similar al de PDF
      action: downloadPDF, // Acción de descargar PDF
    },
  ]

  // Manejador para actualizar la fecha mínima de "Fecha Hasta"
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value // Obtener la fecha seleccionada
    setStartDate(selectedStartDate) // Guardar la fecha desde en el estado
    setMinEndDate(selectedStartDate) // Establecer la fecha mínima para el segundo input
  }

  // Manejador para guardar la "Fecha Hasta"
  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value
    setEndDate(selectedEndDate) // Guardar la fecha hasta en el estado
  }

  //Cerrar el modal con el error
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <br />
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar /> {/* Componente de navegación */}
        <div className="w-50 row my-auto mx-auto">
          <h1 className="text-center fw-bold mb-4" style={{ color: '#791021' }}>
            ¿En qué formato?
          </h1>

          {/* Inputs de fechas organizados en una fila */}
          <div className="d-flex justify-content-between mt-2">
            <div
              className="me-2"
              style={{ flex: 1, fontWeight: 'bold', color: '#791021' }}
            >
              <small>Fecha Desde</small>
              <input
                type="date"
                name="fechadesde"
                className="form-control py-2"
                required
                value={startDate}
                onChange={handleStartDateChange}
                max={currentDate}
              />
            </div>
            <div
              className="ms-2"
              style={{ flex: 1, fontWeight: 'bold', color: '#791021' }}
            >
              <small>Fecha Hasta</small>
              {startDate === '' ? (
                <Tooltip title="Debe seleccionar la fecha de inicio primero">
                  <span>
                    <input
                      type="date"
                      name="fechahasta"
                      className="form-control p-2"
                      required
                      value={endDate}
                      onChange={handleEndDateChange}
                      min={minEndDate}
                      disabled={startDate === ''}
                    />
                  </span>
                </Tooltip>
              ) : (
                <span>
                  <input
                    type="date"
                    name="fechahasta"
                    className="form-control p-2"
                    required
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={minEndDate}
                    disabled={startDate === ''}
                  />
                </span>
              )}
            </div>
          </div>

          {/* Tarjetas de formato de reporte */}
          <div className="d-flex justify-content-around mt-4">
            {cardReport.map((card) => {
              return (
                <div
                  key={card.id}
                  className="col-lg-5 col-md-6 col-sm-12 d-flex flex-column justify-content-center mx-auto"
                >
                  <div
                    style={{ background: card.color }}
                    type="button"
                    className="no-underline text-white p-4 rounded-5 shadow text-center reports-card"
                    onClick={card.action} // Descargar formato correspondiente
                  >
                    <div className="opacity-50 my-2">{card.icon}</div>
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Modal show={showModal} centered>
        <div className="p-5 text-center fonts-letter rounded-1">
          <div className="d-flex flex-column">
            {/* Cambiar el icono a VscError para error */}
            <GrDocumentMissing
              className="mx-auto mb-3"
              size={100}
              style={{ color: '#791021' }} // Color para error
            />
            <h4>{messageModal}</h4>
          </div>
          <button
            className="btn glow-on-hover mx-1 px-4 text-white mt-4"
            style={{
              background: '#791021',
            }}
            onClick={handleCloseModal} // Pasar la función directamente
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ReportProducts
