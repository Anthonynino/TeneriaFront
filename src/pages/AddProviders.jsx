import Navbar from "../Navbar";
import { useState } from "react";
import { GoAlertFill } from "react-icons/go";
import { addSupplier } from "../api/providers";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProviders = () => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState("si"); // Estado para controlar la selección del botón de radio
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fadeOutTimeout, setFadeOutTimeout] = useState(null);
  const [modalSuccess, setModalSucces] = useState(false);
  // Function to reset the form after submission
  const resetForm = () => {
    setSelectedOption("si"); // Reset radio button to default
    document.getElementById("addSupplierForm").reset(); // Clear all input fields
  };

  // Maneja el cambio en los botones de radio
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyName = e.target[0].value;
    const RIF = e.target[1].value;
    const location = e.target[2].value;
    if (companyName === "" || RIF === "" || location === "") {
      triggerAlert("Los campos deben estar llenos");
    } else {
      await addSupplier(
        companyName,
        RIF,
        location,
        selectedOption == "si" ? true : false
      );
      resetForm();
      setModalSucces(true);
    }
  };

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    // Si hay un timeout en proceso, lo limpiamos
    if (fadeOutTimeout) clearTimeout(fadeOutTimeout);
    // Configuramos el timeout para desvanecer la alerta
    const timeout = setTimeout(() => {
      setShowAlert(false);
      setAlertMessage("");
    }, 3000); // Duración de la animación de desvanecimiento
    setFadeOutTimeout(timeout);
  };

  return (
    <>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div
          className="w-50 row mt-5 h-50 mx-auto "
          style={{ paddingTop: "4rem" }}
        >
          <h1 className="text-center fw-bold mb-5" style={{ color: "#791021" }}>
            ¿Que proveedor deseas agregar?
          </h1>
          <form className="row" onSubmit={handleSubmit} id="addSupplierForm">
            <div className="mb-3 col-6">
              <label className="fw-semibold form-label">
                Nombre de la empresa
              </label>
              <input
                type="text"
                className="shadow-sm form-control"
                id="exampleFormControlInput1"
                placeholder="Ingrese un nombre"
              />
            </div>

            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">RIF</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un codigo"
              />
            </div>
            <div className="mb-3 col-7">
              <label className="fw-semibold form-label">Ubicación</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese una ubicación"
              />
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">
                ¿Está en el territorio nacional?
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radioSi"
                  name="territorioNacional"
                  value="si"
                  checked={selectedOption === "si"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="radioSi">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="radioNo"
                  name="territorioNacional"
                  value="no"
                  checked={selectedOption === "no"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="radioNo">
                  No
                </label>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn fw-semibold px-5 button-hover mx-1"
                  style={{ background: "#791021", color: "#ffff" }}
                  onClick={() => navigate(-1)}
                >
                            Regresar
                </button>
                <button
                  className="btn fw-semibold px-3 button-hover mx-1"
                  style={{ background: "#DAA520", color: "#ffff" }}
                  type="submit"
                >
                  Agregar proveedor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showAlert && (
        <div
          className="alert position-fixed top-0 start-50 translate-middle-x mt-5 text-white alert-animation"
          style={{ background: "#DF3030", zIndex: "100" }}
          role="alert"
        >
          <div className="mb-2">
            <span style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}>
              <GoAlertFill color="yellow" />
            </span>
            {alertMessage}
          </div>
        </div>
      )}

      <Modal show={modalSuccess} centered>
        <div className="p-5 text-center fonts-letter rounded-1">
          <div className="d-flex flex-column">
            <IoMdCheckmarkCircleOutline
              className="mx-auto text-success mb-1"
              size={140}
            />
            <h3 className="text-success">¡Hecho!</h3>
            <p className="text-secondary" style={{ fontSize: "17px" }}>
              ¡Operación Realizada Exitosamente!
            </p>
          </div>
          <div className="mt-1 d-flex justify-content-center">
            <button
              className="btn bg-success text-white d-flex justify-content-center text-white mx-2 px-5"
              type="button"
              style={{ width: "60%" }}
              onClick={() => setModalSucces(false)}
            >
              <span className="my-auto fw-bold">OK</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProviders;
