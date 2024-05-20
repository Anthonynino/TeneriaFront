import { useNavigate } from 'react-router-dom'
import { GrDropbox } from 'react-icons/gr'
import { cards, menuOption } from '../json/AllObjects'
import { useAuth } from '../context/AuthContext'

function Homepage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleActionButton = async (values) => {
    try {
      if (values.title === 'Salir') {
        await logout()
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="vh-100 d-flex">
        <div className="shadow menu">
          <h3 className="text-white text-center pt-5 mb-5">
            ¡Bienvenido Almacenista!
          </h3>
          <ul className="list-group list-group-flush">
            {menuOption.map((opt) => (
              <div
                key={opt.id}
                className="position-relative list-group-item fw-bold mb-3 text-white"
                style={{ background: '#F4D010', border: '0', cursor: 'pointer' }}
                onClick={() => {
                  handleActionButton(opt)
                }}
              >
                <h4 className="d-inline">{opt.title}</h4>
                {opt.icon}
              </div>
            ))}
          </ul>
          <div className="text-white text-center mt-5">
            <GrDropbox style={{ opacity: '0.5' }} size={200} />
          </div>
        </div>
        <div className="w-50 row my-auto mx-auto ">
          <h1 className="text-center fw-bold" style={{ color: '#791021' }}>
            ¿Que deseas buscar?
          </h1>
          {cards.map((card) => {
            return (
              <div
                key={card.id}
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center mx-auto"
              >
                <div
                  style={{
                    background: card.color,
                  }}
                  className="no-line text-white p-3 my-2 rounded-4 shadow card-scale"
                  type="button"
                >
                  <div
                    className="text-center"
                    style={{ filter: 'opacity(0.4)' }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-center">{card.title}</h3>
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
