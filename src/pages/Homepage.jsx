import Navbar from '../Navbar'
import { cards } from '../json/AllObjects'
import { Link } from 'react-router-dom'

function Homepage() {

  return (
    <>
      <div className="d-flex" style={{minHeight:"100vh"}}>
        <Navbar/>
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
                <Link
                 to={`/homepage/productstable/${card.id}/${card.title}`}
                  style={{
                    background: card.color,
                  }}
                  className="no-underline text-white p-3 my-2 rounded-4 shadow card-scale"
                  type="button"
                >
                  <div
                    className="text-center"
                    style={{ filter: 'opacity(0.4)' }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-center">{card.title}</h3>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Homepage
