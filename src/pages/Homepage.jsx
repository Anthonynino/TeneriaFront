import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { getAllQuantities } from '../api/dashboard'
import { FaUsers, FaTruck, FaBox, FaChartBar } from 'react-icons/fa'

function Homepage() {
  const [userNumber, setUserNumber] = useState(0)
  const [productNumber, setProductNumber] = useState(0)
  const [supplierNumber, setSupplierNumber] = useState(0)

  const cardHome = [
    {
      id: 1,
      title: 'Usuarios',
      icon: <FaUsers size={48} />,
      color: '#2F4F4F',
      total: userNumber,
    },
    {
      id: 2,
      title: 'Proveedores',
      icon: <FaTruck size={48} />,
      color: ' #999999',
      total: supplierNumber,
    },
    {
      id: 3,
      title: 'Productos',
      icon: <FaBox size={48} />,
      color: '#801817',
      total: productNumber,
    },
    {
      id: 4,
      title: 'Reportes',
      icon: <FaChartBar size={48} />,
      color: '#4E3D2E',
      total: 0,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      const getAllValues = await getAllQuantities()
      setUserNumber(getAllValues.data.userQuantity)
      setProductNumber(getAllValues.data.productQuantity)
      setSupplierNumber(getAllValues.data.supplierQuantity)
    }
    fetchData()
  }, [])

  return (
    <>
      <br />
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className="w-50 row my-auto mx-auto">
          <h1 className="text-center fw-bold" style={{ color: '#791021' }}>
            Panel de Administración
          </h1>
          {cardHome.map((card) => {
            return (
              <div
                key={card.id}
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center mx-auto"
              >
                <div
                  style={{ background: card.color }}
                  className="no-underline text-white p-3 my-2 rounded-4 shadow card-scale"
                >
                  <div
                    className="text-center"
                    style={{ filter: 'opacity(0.4)' }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-center">{card.title}</h3>
                  <p className="text-center">
                    <b style={{ fontSize: '24px' }}>{card.total}</b>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Homepage
