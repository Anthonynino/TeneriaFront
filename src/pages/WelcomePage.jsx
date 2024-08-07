import { Link } from "react-router-dom";
import imgLeathers from "../assets/Leathers.jpg"
import imgTenería from "../assets/Planta-Teneria-Rubio.jpg"
function WelcomePage() {

  const welcomeCards = [
    {
      id: 0,
      title: "Misión",
      description: "Abastecer al sector manufacturero con los productos y características necesarias, en tiempo y calidad óptimos para garantizar la fluidez del mercado. Para ello, se ofrece productos innovadores con tecnología de punta que revolucionan el mercado que contribuyen al progreso del país.",
      img: imgTenería
    },
    {
      id: 1,
      title: "Vision",
      description: "Permanecer como líder en el mercado nacional y expandir su presencia a mercados internacionales, ofreciendo productos de primera calidad que satisfagan las necesidades y expectativas de nuestros clientes.",
      img: imgLeathers
    },
  ]
  return (
    <>
      <nav className="navbar shadow fixed-top bg-light">
        <div className="container-fluid">
          <img
            src="../src/assets/logo1.png"
            alt=""
            style={{ height: "60px", width: "80px" }}
          />
          <Link
          to="/login"
            className="navbar-brand fs-3 fw-bold txt-shadow"
            style={{ color: "#791021" }}
          >
          ¡INGRESA YA! 
          </Link>
        </div>
      </nav>
      <div className="row mt-5" style={{minHeight:"100vh"}}>
      <div className="col-4 p-5 text-center d-flex" style={{background:"#791021"}}>
        <div className="my-auto">
        <h1 className="text-warning">Bienvenido al sistema de </h1>
        <h3 className="text-white">Tenería Rubio C.A</h3>
        <Link to="/login">
        <button
          className="text-white w-100 py-2 mt-4 mb-3 btn rounded-pill fw-bold bg-warning"
        >
          Ingresar
        </button>
        </Link>
        </div>
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade col-8 p-5 bg-warning d-flex"
      >
        <div className="carousel-inner p-5 my-auto">
        {
          welcomeCards.map((w) => (
            <div key={w.id} className="carousel-item active bg-light p-4 rounded-3" style={{minHeight:"420px"}}>
            <h2 style={{color:"#791021"}} className="text-center fw-bold">{w.title}</h2>
            <p className="fs-6" style={{fontFamily: "sans-serif", textAlign: "center"}}>
              {w.description}
            </p>
            <div className="d-flex mx-auto" style={{maxWidth:"350px"}}>
            <img src={w.img} style={{height:"200px", width:"100%"}} className="rounded-3"/> 
            </div>
          </div>
          ))
        }
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    </>
  );
}

export default WelcomePage;
