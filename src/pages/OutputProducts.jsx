import Navbar from "../Navbar";

const OutputProducts = () => {
    return ( 
        <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-50 row mt-5 h-50 mx-auto"
          style={{ paddingTop: '3rem' }}
        >
          <h1 className="text-center fw-bold mb-5" style={{ color: '#791021' }}>
            ¿Que producto deseas despachar?
          </h1>
          <form className="row" >
            <div className="mb-3 col-8">
              <label className="fw-semibold form-label">
                Nombre del producto
              </label>
              <input
                type="text"
                className="shadow-sm form-control"
                id="exampleFormControlInput1"
                placeholder="Ingrese un producto"
              />
            </div>

            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Codigo</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese un codigo"
              />
            </div>
            <div className="mb-3 col-6">
              <label className="fw-semibold form-label">Departamento</label>
              <input
                type="text"
                className="shadow-sm form-control"
                placeholder="Ingrese el departamento destino"
              />
            </div>
            <div className="mb-3 col-4">
              <label className="fw-semibold form-label">Cantidad</label>
              <input
                type="number"
                className="shadow-sm form-control"
                placeholder="Ingrese una cantidad"
                min={1}
              />
            </div>  
            <div className="row mt-2">
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn fw-semibold px-3 button-hover"
                  style={{ backgroundColor: '#DAA520', color: '#ffff' }}
                  type="submit"
                >
                  Agregar producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
     );
}
 
export default OutputProducts;