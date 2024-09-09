import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

function SuccessfulOperation({ modalSuccess, handleCloseSuccess }) {
  return (
    <Modal show={modalSuccess} centered>
      <div className="p-5 text-center fonts-letter rounded-1">
        <div className="d-flex flex-column">
          <IoMdCheckmarkCircleOutline
            className="mx-auto mb-1"
            size={140}
            style={{ color: '#791021' }}
          />
          <h3 style={{ color: '#791021' }}>¡Hecho!</h3>
          <p className="text-secondary" style={{ fontSize: '17px' }}>
            ¡Operación Realizada Exitosamente!
          </p>
        </div>
        <div className="mt-1 d-flex justify-content-center">
          <div
            className="rounded"
            style={{
              background: '#791021',
              width: 'fit-content',
              padding: '0.1rem',
            }}
          >
            <button
              className="btn glow-on-hover mx-1 px-4"
              type="button"
              onClick={() => handleCloseSuccess()}
            >
              <span className="my-auto text-white">OK</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

SuccessfulOperation.propTypes = {
  modalSuccess: PropTypes.bool,
  handleCloseSuccess: PropTypes.func,
}

export default SuccessfulOperation
