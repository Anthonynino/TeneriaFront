import { Link } from 'react-router-dom'
import imgLeathers from '../assets/Leathers2.jpg'
import imgTenería from '../assets/Planta-Teneria-Rubio.jpg'

function WelcomePage() {
  const welcomeCards = [
    {
      id: 0,
      title: 'Misión',
      description:
        'Proveer al sector manufacturero con productos innovadores y tecnología avanzada para asegurar calidad y fluidez en el mercado. Contribuir al desarrollo del país con nuestros productos.',
      img: imgTenería,
    },
    {
      id: 1,
      title: 'Visión',
      description:
        'Permanecer como líder en el mercado nacional y expandir nuestra presencia a mercados internacionales, ofreciendo productos de primera calidad que satisfagan las necesidades de nuestros clientes.',
      img: imgLeathers,
    },
  ]

  return (
    <>
      <nav className="navbar shadow fixed-top bg-light">
        <div className="container-fluid">
          <img
            src="../src/assets/logo1.png"
            alt=""
            style={{ height: '60px', width: '80px' }}
          />
        </div>
      </nav>
      <div
        className="container mt-5"
        style={{ minHeight: '100vh', minWidth: '100%' }}
      >
        <div
          className="row justify-content-center align-items-center"
          style={{
            minHeight: '90vh',
            backgroundColor: '#791021',
          }}
        >
          <div
            className="col-6 text-center py-5"
            style={{ backgroundColor: '#791021', color: '#fff' }}
          >
            <div>
              <h1 className="text-warning">Bienvenido al sistema de</h1>
              <h3 className="text-white">Tenería Rubio C.A</h3>
              <Link to="/login">
                <button
                  className="text-white w-100 py-2 mt-4 mb-3 btn rounded-pill fw-bold button-hover"
                  style={{ backgroundColor: '#DAA520' }}
                >
                  Ingresar
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: '80vh', backgroundColor: '#DAA520' }}
        >
          {welcomeCards.map((w) => (
            <div className="col-md-6 p-3" key={w.id}>
              <div className="card shadow-sm d-flex flex-column">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="text-center">
                    <h2 style={{ color: '#791021' }} className="fw-bold">
                      {w.title}
                    </h2>
                    <p
                      className=" fw-bold"
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      {w.description}
                    </p>
                  </div>
                  <img
                    src={w.img}
                    style={{
                      height: '300px',
                      width: 'auto',
                      objectFit: 'cover',
                    }}
                    className="rounded-3 mt-1"
                    alt={w.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default WelcomePage
