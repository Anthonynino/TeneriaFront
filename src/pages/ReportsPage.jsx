import Navbar from "../Navbar";
import { FaTruck } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ReportPage() {
  const cardReport = [
    {
      id: 1,
      title: "Proveedores",
      icon: <FaTruck size={100} />,
      color: "#801817",
      link: "report-suppliers",
    },
    {
      id: 2,
      title: "Transacciones",
      icon: <FaArrowRightArrowLeft size={100} />,
      color: "#801817",
      link: "transacciones",
    },
  ];

  return (
    <>
      <br />
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="w-50 row my-auto mx-auto">
          <h1 className="text-center fw-bold mb-4" style={{ color: "#791021" }}>
            ¿Generar reporte en?
          </h1>
          {cardReport.map((card) => {
            return (
              <div
                key={card.id}
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center mx-auto"
              >
                <Link
                  to={`/${card.link}`}
                  style={{color: card.color }}
                  className="no-underline px-3 py-4 my-2 rounded-5 shadow reports-card"
                >
                  <div
                    className="text-center mb-1"
                    style={{ filter: "opacity(0.4)" }}
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

export default ReportPage;
