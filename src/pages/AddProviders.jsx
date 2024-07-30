import Navbar from '../Navbar'

const AddProviders = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className="w-50 row mt-5 h-50 mx-auto">
          <h1 className="text-center fw-bold mb-5" style={{ color: '#791021' }}>
            ¿Que proveedor deseas agregar?
          </h1>
          <form className="row">
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
                Esta en el territorio nacional?
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  checked
                />
                <label className="form-check-label">Si</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn fw-semibold px-3"
                  style={{background: '#DAA520', color:"#ffff"}}
                  type="submit"
                >
                  Agregar proveedor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddProviders
