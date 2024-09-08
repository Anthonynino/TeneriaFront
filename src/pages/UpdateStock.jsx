import { ImEnter } from "react-icons/im";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types"

function UpdateStock({
    modalUpdateStock, //Indica el modal para poder abrirlo o cerrarlo
    handleCloseUpdateStock, //Función usada para cerrar este modal

}) {

    return (
        <Modal show={modalUpdateStock} centered>
        <div
          className="p-5 text-center fonts-letter rounded-1"
        >
          <div className="d-flex flex-column">
            <ImEnter className="mx-auto text-secondary mb-1" size={100} />
            <p>¿Cuanto Desea Ingresar?</p>
            <input
              type="number"
              className="border border-secondary rounded mx-auto"
              style={{ width: "100px" }}
              min={1}
        /*       max={dataSect?.countCards} */
 /*              onFocus={(e) => e.target.blur()}
              onKeyDown={handleKeyDown} */
            />
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <button
              className="btn button-submit text-white text-white mx-2 px-5"
              type="button"
              style={{ width: "60%" }}
              onClick={() => {
                handleCloseUpdateStock()
              }} 
            >
              <span className="my-auto">Cancelar</span>
            </button>
            <button
              className="btn button-submit text-white text-white mx-2 px-5"
              type="submit"
              style={{ width: "60%" }}
            >
              <span className="my-auto">
                Aceptar
              </span>
            </button>
          </div>
        </div>
      </Modal>
    )
}

UpdateStock.propTypes = {
    modalUpdateStock: PropTypes.bool,
    handleCloseUpdateStock: PropTypes.func,
}

export default UpdateStock