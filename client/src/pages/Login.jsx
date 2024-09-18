import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Login() {
  const minUsernameLength = 3;
  const maxUsernameLength = 20;
  const minPasswordLength = 12;
  const maxPasswordLength = 100;
  const [username, setUsername] = useState('');
  const [isformValidated, setIsFormValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  
    function submitForm(e){
      e.preventDefault();
      setIsFormValidated(true);

      let usernameError = '';
      
      if(username.length < minUsernameLength){
        usernameError = (`Vartotojo vardas yra per trumpas, turi būti mažiausiai ${minUsernameLength} simboliai.`)
      } else if(username.length > maxUsernameLength){
        usernameError = (`Slaptažodis yra per ilgas, daugiausiai gali būti ${maxUsernameLength} simbolių.`)
      }  
      setusernameError(usernameError);

      let passwordError = '';

      if(password.length < minPasswordLength){
        passwordError = `Slaptažodis yra per trumpas, turi būti mažiausiai ${minPasswordLength} simbolių.`
      }else if(password.length > maxPasswordLength){
        passwordError = `Slaptažodis yra per ilgas, turi būti mažiausiai ${maxPasswordLength} simbolių.`
      }
      setpasswordError(passwordError)


      if(!usernameError && !passwordError){

        fetch('http://localhost:5020/api/login', {
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Content-Type' : 'application/json',
          
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then(res => res.json())
        .then(msg => setApiResponse(msg))
        .catch(err => console.error(err))
        
    }
      }
      

    return (
        <>
            <Header />
                <main className="form-signin container">
                    <div className="row">
                        <form onSubmit={submitForm} className="col-12 col-md-8 offset-md-4 col-lg-16 col-xl-4">
                            <h1 className="h3 mb-3 fw-normal">Prisijungti</h1>
                            
                            {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.msg}</p> : null}

                            <div className="form-floating">
                              <input value={username} onChange={e => setUsername(e.target.value.trim())} type="text" className={`form-control ` + (isformValidated ? usernameError ? 'is-invalid' : 'is-valid' : '')} />
                              <label htmlFor="floatingInput">Vartotojo vardas</label>
                              {usernameError ? <p className="invalid-feedback">{usernameError}</p> : null}
                            </div>
                            <div className="form-floating">
                              <input value={password} onChange={e => setPassword(e.target.value)} type="password" className={`form-control ` + (isformValidated ? passwordError ? 'is-invalid' : 'is-valid' : '')} id="floatingPassword" placeholder="Password"/>
                              <label htmlFor="floatingPassword">Slaptažodis</label>
                              {passwordError ? <p className="invalid-feedback">{passwordError}</p> : null}
                            </div>

                            <div className="form-check text-start my-3">
                              <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                              <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit">Prisujungti</button>
                        </form>
                    </div>
        
                </main>
            <Footer />
        </>
    );
}