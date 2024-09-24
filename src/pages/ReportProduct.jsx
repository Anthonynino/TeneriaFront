import Navbar from '../Navbar'
import { SiMicrosoftexcel } from 'react-icons/si'
import { FaRegFilePdf } from 'react-icons/fa'
import axios from '../api/axios'

function ReportProducts() {
  const downloadExcel = async () => {
    try {
      //formateo de fecha
      const currentDate = new Date()
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
      //Petición a la API
      const response = await axios.get('/reportProductExcel', {
        responseType: 'blob',
      })
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = urlBlob
      link.setAttribute('download', `reporte-movimientos-${formattedDate}.xlsx`)
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
      const response = await axios.get('/reportProductPDF', {
        responseType: 'blob',
      })
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = urlBlob
      link.setAttribute('download', `reporte-movimientos-${formattedDate}.pdf`)
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
        'Formato de tablas centrado en el análisis detallado y personalizado de datos',
      icon: <SiMicrosoftexcel size={80} />,
      color: '#207244', // Verde similar al de Excel
      action: downloadExcel,
    },
    {
      id: 2,
      title: 'PDF',
      description:
        'Excelente formato estándar para compartir datos de manera segura y presentable.',
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
                  style={{ background: card.color }}
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

export default ReportProducts
