import Navbar from '../Navbar'
import { SiMicrosoftexcel } from 'react-icons/si'
import { FaRegFilePdf } from 'react-icons/fa'
import axios from '../api/axios'
import { useEffect, useState } from 'react'

function ReportSupplier() {
  const [user, setUser] = useState() // Estado para guardar el valor del localstorage del usuario
  useEffect(() => {
    // Recupera la información del usuario desde localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    }
  }, [])
  const downloadExcel = async () => {
    try {
      //formateo de fecha
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
      //Petición a la API
      const response = await axios.get(`/reportSupplierExcel/${user.id}`, {
        responseType: 'blob',
      })
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = urlBlob
      link.setAttribute('download', `reporte-proveedores-${formattedDate}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error(error)
    }
  }

  const downloadPDF = async () => {
    try {
      //formateo de fecha
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
      //Petición a la API
      const response = await axios.get(`/reportSupplierPDF/${user.id}`, {
        responseType: 'blob',
      })
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = urlBlob
      link.setAttribute('download', `reporte-proveedores-${formattedDate}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error(error)
    }
  }

  const cardReport = [
    {
      id: 1,
      title: 'Excel',
      description:
        'Formato de tablas centrado en el análisis detallado y personalizado.',
      icon: <SiMicrosoftexcel size={80} />,
      color: '#207244', // Verde similar al de Excel
      action: downloadExcel,
    },
    {
      id: 2,
      title: 'PDF',
      description:
        'Excelente formato estándar para compartir datos de manera presentable.',
      icon: <FaRegFilePdf size={80} />,
      color: '#da2727', // Rojo similar al de PDF
      action: downloadPDF,
    },
  ]

  return (
    <>
      <br />
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className="w-50 row my-auto mx-auto">
          <h1 className="text-center fw-bold mb-4" style={{ color: '#791021' }}>
            ¿En qué formato?
          </h1>
          {cardReport.map((card) => {
            return (
              <div
                key={card.id}
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center mx-auto"
              >
                <div
                  style={{ background: card.color, height: '260px' }}
                  type="button"
                  className="no-underline text-white p-4 rounded-5 shadow text-center reports-card"
                  onClick={card.action}
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
    </>
  )
}

export default ReportSupplier
