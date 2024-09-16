import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Register() {
    return (
        <>
            <Header />
                <main className="form-signin container">
                    <div className="row">
                        <form className="col-12 col-md-8 offset-md-4 col-lg-16 col-xl-4">
                            <h1 className="h3 mb-3 fw-normal">Registracija</h1>
                            <div className="form-floating">
                              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                              <label htmlFor="floatingInput">Vartotojo vardas</label>
                            </div>
                            <div className="form-floating">
                              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                              <label htmlFor="floatingPassword">Slaptažodis</label>
                            </div>

                            <div className="form-check text-start my-3">
                              <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Remember me
                              </label>
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit">Registruotis</button>
                        </form>
                    </div>
        
                </main>
            <Footer />
        </>
    );
}