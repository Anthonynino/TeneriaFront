import { useState } from "react"
import Navbar from "../Navbar";

const ProductForm = () => {

    const [category, setCategory] = useState('')
    const handleCategory = (event) =>{
        setCategory(event.target.value)
    }

    return ( 
        <>
      <div className="vh-100 d-flex">
    <Navbar/>
        <div className="w-50 row mt-5 h-50 mx-auto ">
        <h1 className="text-center fw-bold" style={{ color: "#791021" }}>
            ¿Que deseas agregar?
          </h1>
          <div className="row">
            <div className="mb-3 h-50 col-4">
                <label  className=" fw-semibold form-label">Categoria</label>
                <select className="shadow-sm form-select" aria-label="Categoria" value={category} onChange={handleCategory}>
                    <option selected>None</option>
                    <option value="1">Electricidad</option>
                    <option value="2">Metalurgica</option>
                    <option value="3">S.Laboral</option>
                    <option value="4">Pintura</option>
                    <option value="5">Plomeria</option>
                    <option value="6">Tornilleria</option>
                </select>
            </div>
            <div className="mb-3 col-8">
                <label  className="fw-semibold form-label">Nombre del producto</label>
                <input type="text" className="shadow-sm form-control" id="exampleFormControlInput1" placeholder="Ingrese"/>
            </div>
          </div>
          <div className="row">
                <div className="mb-3 col-4">
                    <label  className="fw-semibold form-label">Codigo</label>
                    <input type="text" className="shadow-sm form-control" id="exampleFormControlInput1" placeholder="Ingrese"/>
                </div>
                <div className="mb-3 col-4">
                    <label  className="fw-semibold form-label">Estante</label>
                    <input type="text" className="shadow-sm form-control" id="exampleFormControlInput1" placeholder="Ingrese"/>
                </div>
                <div className="mb-3 col-4">
                    <label  className="fw-semibold form-label">Cantidad</label>
                    <input type="text" className="shadow-sm form-control" id="exampleFormControlInput1" placeholder="Ingrese"/>
                </div>
                
          </div>
          {category === '3' && (
            <div className="row">
                <div className="mb-2 col-4">
                    <label  className="fw-semibold form-label">Talla</label>
                    <input type="text" className="shadow-sm form-control" id="exampleFormControlInput1" placeholder="Ingrese"/>
                </div>
            </div>)}
        {category === '6' && (
            <div className="row">
                <div className="mb-2 col-4">
                    <label  className="fw-semibold form-label">Tamaño</label>
                    <input type="text" className="shadow-sm form-control" id="exampleFormControlInput1" placeholder="Ingrese"/>
                </div>
            </div>)}
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <button className=" btn btn-success fw-semibold px-3">Agregar producto</button>
                </div>
            </div>
        </div>
        
      </div>
    </>
     );
}
 
export default ProductForm;