const LoginPage = () => {
    return ( <>
    <div className="py-5 my-5 ">
        <div className="d-flex justify-content-center border w-50 mx-auto rounded form-login shadow">
                <form className="p-5">
                    <h1 className="h3 mb-3 fw-bold text-center">Inicia sesion</h1>
                    <div className="text-center">
                        <img src="../src/assets/logo2.png" alt="" className=" logo mb-4"/>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="email" className="form-control shadow-sm mb-1 input-login" placeholder="name@example.com"/>
                        <label >Usuario</label>
                    </div>
                    <div className="form-floating">
                        
                        <input type="password" className="form-control shadow-sm mb-1 input-login" placeholder="Password"/>
                        <label >Password</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2 mt-4 mb-3 border rounded-pill fw-bold button-submit" type="submit">Ingresa</button>
                    <p className="not-acount">No tienes cuenta? <a href="#">Registrate</a></p>
        
                </form>
        </div>
    </div>
        
        
    </> );
}
 
export default LoginPage;