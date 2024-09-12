import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { GoAlertFill } from 'react-icons/go'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

function OperationModal({ showModal, handleClose, isSuccess, message }) {
  return (
    <Modal show={showModal} centered onHide={handleClose}>
      <div className="p-5 text-center fonts-letter rounded-1">
        <div className="d-flex flex-column">
          {isSuccess ? (
            <IoMdCheckmarkCircleOutline
              className="mx-auto mb-1"
              size={140}
              style={{ color: '#DAA520' }} // Color para éxito
            />
          ) : (
            <GoAlertFill
              className="mx-auto mb-1"
              size={140}
              style={{ color: '#791021' }} // Color para error
            />
          )}
          <h3 style={{ color: isSuccess ? '#DAA520' : '#791021' }}>
            {isSuccess ? '¡Éxito!' : '¡Error!'}
          </h3>
          <p className="text-secondary" style={{ fontSize: '17px' }}>
            {message}
          </p>
        </div>
        <div className="mt-1 d-flex justify-content-center">
          <div
            className="rounded"
            style={{
              background: isSuccess ? '#DAA520' : '#791021',
              width: 'fit-content',
              padding: '0.1rem',
            }}
          >
            <button
              className="btn glow-on-hover mx-1 px-4"
              type="button"
              onClick={handleClose}
            >
              <span className="my-auto text-white">OK</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

OperationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default OperationModal
