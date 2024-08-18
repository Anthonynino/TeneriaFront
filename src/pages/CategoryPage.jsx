import Navbar from '../Navbar';
import { cards } from '../json/AllObjects';
import { Link } from 'react-router-dom';

function CategoryPage() {
  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-75 row my-auto mx-auto"
          style={{ paddingTop: '3rem' }}
        >
          <h1 className="text-center fw-bold mb-4" style={{ color: '#791021' }}>
            ¿Qué deseas buscar?
          </h1>
          {cards.map((card) => {
            return (
              <div
                key={card.id}
                className="col-lg-4 col-md-4 col-sm-6 col-xs-12 d-flex justify-content-center mb-4"
              >
                <Link
                  to={`/homepage/productstable/${card.id}/${card.title}`}
                  style={{
                    background: card.color,
                    height: '200px',
                    width: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="no-underline text-white p-4 rounded-4 shadow card-scale d-flex flex-column justify-content-center align-items-center"
                  type="button"
                >
                  <div
                    className="text-center mb-3"
                    style={{ filter: 'opacity(0.8)', fontSize: '3rem' }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-center">{card.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
