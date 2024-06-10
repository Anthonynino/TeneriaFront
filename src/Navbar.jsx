import { GrDropbox } from 'react-icons/gr'
import { menuOption } from './json/AllObjects'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Navbar() {
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
    <div className="shadow menu" style={{minHeight:"100vh"}}>
      <h3 className="text-white text-center pt-5 mb-5">
        ¡Bienvenido Almacenista!
      </h3>
      <ul className="list-group list-group-flush">
        {menuOption.map((opt) => (
          <Link to={opt.link}
            key={opt.id}
            className="position-relative list-group-item fw-bold mb-3 text-white"
            style={{ background: '#F4D010', border: '0', cursor: 'pointer' }}
            onClick={() => {
              handleActionButton(opt)
            }}
          >
            <h4 className="d-inline">{opt.title}</h4>
            {opt.icon}
          </Link>
        ))}
      </ul>
      <div className="text-white text-center mt-4">
        <GrDropbox style={{ opacity: '0.5' }} size={180} />
      </div>
    </div>
  )
}
export default Navbar
