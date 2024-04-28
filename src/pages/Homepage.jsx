import { Link } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GrDropbox } from "react-icons/gr";
import { IoBulbSharp } from "react-icons/io5";
import { FaHelmetSafety } from "react-icons/fa6";
import { AiFillTool } from "react-icons/ai";
import { GiSolderingIron } from "react-icons/gi";
import { GiLargePaintBrush } from "react-icons/gi";
import { GiNails } from "react-icons/gi";
function Homepage() {
  const cards = [
    {
      id: 0,
      title: "Electricidad",
      color: "#FFD700",
      icon: <IoBulbSharp size={70}/>,
    },
    {
      id: 1,
      title: "Plomería",
      color: "#E65A24",
      icon: <AiFillTool  size={70}/>,
    },
    {
      id: 2,
      title: "S.Laboral",
      color: "#2F4F4F",
      icon: <FaHelmetSafety size={70}/>,
    },
    {
      id: 3,
      title: "Metalurgia",
      color: " #999999",
      icon: <GiSolderingIron size={70} />,
    },
    {
      id: 4,
      title: "Pintura",
      color: "#801817",
      icon: <GiLargePaintBrush size={70}/>,
    },
    {
      id: 5,
      title: "Tornillería",
      color: "#4E3D2E",
      icon: <GiNails size={70}/>,
    },
  ];
  return (
    <>
      <div className="vh-100 d-flex">
        <div
          className="shadow"
          style={{ background: "#791021", width: "380px", height: "100%" }}
        >
          <h3 className="text-white text-center pt-5 mb-5">
            ¡Bienvenido Almacenista!
          </h3>
          <ul className="list-group list-group-flush">
            <Link
              to="/"
              className="position-relative list-group-item fw-bold mb-3 text-white"
              style={{ background: "#F4D010" }}
            >
              <h4 className="d-inline">Ver Categorías</h4>
              <MdCategory
                className="position-absolute mx-2"
                style={{ top: "10px" }}
                size={30}
              />
            </Link>
            <Link
              to="/"
              className="position-relative list-group-item fw-bold mb-3 text-white"
              style={{ background: "#F4D010" }}
            >
              <h4 className="d-inline">Ver Reportes</h4>
              <HiDocumentReport
                className="position-absolute mx-2"
                style={{ top: "10px" }}
                size={30}
              />
            </Link>
            <Link
              to="/"
              className="position-relative list-group-item fw-bold mb-3 text-white"
              style={{ background: "#F4D010" }}
            >
              <h4 className="d-inline">Realizar Ingreso</h4>
              <FaArrowRightLong
                className="position-absolute mx-2"
                style={{ top: "10px" }}
                size={30}
              />
            </Link>
            <Link
              to="/"
              className="position-relative list-group-item fw-bold mb-3 text-white"
              style={{ background: "#F4D010" }}
            >
              <h4 className="d-inline">Realizar Salida</h4>
              <FaArrowLeftLong
                className="position-absolute mx-2 "
                style={{ top: "10px" }}
                size={30}
              />
            </Link>
            <Link
              to="/"
              className="position-relative list-group-item fw-bold text-white"
              style={{ background: "#ff0000" }}
            >
              <h4 className="d-inline">Salir</h4>
              <ImExit
                className="position-absolute mx-2"
                style={{ top: "12px" }}
                size={30}
              />
            </Link>
          </ul>
          <div className="text-white text-center mt-5">
            <GrDropbox style={{ opacity: "0.5" }} size={200} />
          </div>
        </div>
        <div className="w-50 row my-auto mx-auto ">
        <h1 className="text-center fw-bold" style={{ color: "#791021" }}>
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
                  className="no-line text-white p-3 my-2 rounded-4 shadow"
                  type="button"
                >
                  <div
                    className="text-center"
                    style={{ filter: "opacity(0.4)" }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-center">{card.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Homepage;
