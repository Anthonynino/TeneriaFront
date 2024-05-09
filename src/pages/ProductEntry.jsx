import { menuOption } from "../json/AllObjects";
import { Link } from "react-router-dom";
import { GrDropbox } from "react-icons/gr";
import { useState } from "react";

const ProductForm = () => {

    const [category, setCategory] = useState('')
    const handleCategory = (event) =>{
        console.log(event.target.value);
        setCategory(event.target.value)
    }

    return ( 
        <>
      <div className="vh-100 d-flex">
        <div
          className="shadow menu">
          <h3 className="text-white text-center pt-5 mb-5">
            ¡Bienvenido Almacenista!
          </h3>
          <ul className="list-group list-group-flush">
            {menuOption.map((opt) => (            
            <Link
              to={opt.link}
              className="position-relative list-group-item fw-bold mb-3 text-white"
              style={{ background: "#F4D010", border: "0"}}
            >
              <h4 className="d-inline">{opt.title}</h4>
            {opt.icon}
            </Link>
          ))}
          </ul>
          <div className="text-white text-center mt-5">
            <GrDropbox style={{ opacity: "0.5" }} size={200} />
          </div>
        </div>
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
                    <label  className="fw-semibold form-label">Tamano</label>
                    <input type="text" className="shadow-sm form-control" id="exampleFormControlInput1" placeholder="Ingrese"/>
                </div>
            </div>)}
            <div className="row justify-content-end ">
                <div className="col-3">
                  <button className=" btn btn-success fw-semibold">Agregar producto</button>
                </div>
            </div>
        </div>
        
      </div>
    </>
     );
}
 
export default ProductForm;