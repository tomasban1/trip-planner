import { useState } from "react";

export function NewLocationForm(){

  const [name, setname] = useState('');
  const [nameError, setnameError] = useState('');
  const [img, setImg] = useState('');
  const [imgError, setImgError] = useState('');
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
 
  
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  function isValid(str){
    return typeof str === 'string' && str.length > 0
  }

   function submitForm(e){
      e.preventDefault();
      setIsFormValidated(true);
     
      setnameError(isValid(name) ? '' : 'Truksta pavadinimo');
      setImgError(isValid(img) ? '' : 'Truksta nuorodos');
      setCountryError(isValid(country) ? '' : 'Truksta salies pavadinimo');
      setCityError(isValid(city) ? '' : 'Truksta miesto pavadinimo');

     


      if(!nameError && !imgError && !countryError && !cityError){

        fetch('http://localhost:5020/api/locations', {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name,
          img,
          country,
          city,
        }),
      })
        .then(res => res.json())
        .then(data => setApiResponse(data))
        .catch(err => console.error(err))
        
    }
      }

    
    return (
         <>         
            <main className="form-signin container">
                <div className="row">
                    <form onSubmit={submitForm} className="col-12 col-md-8 offset-md-4 col-lg-16 col-xl-4">
                        <h1 className="h3 mb-3 fw-normal">Nauja lokacija</h1>
                        
                        {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.data}</p> : null}
                        {apiResponse && apiResponse.status === 'error' ? <p className="alert alert-danger">{apiResponse.data}</p> : null}

                        <div className="form-floating">
                          <input value={name} onChange={e => setname(e.target.value.trim())} type="text" placeholder="Nemunas" className={`form-control ` + (isFormValidated ? nameError ? 'is-invalid' : 'is-valid' : '')} />
                          <label htmlFor="floatingInput">Vietos pavadinimas</label>
                          {nameError ? <p className="invalid-feedback">{nameError}</p> : null}
                        </div>

                        <div className="form-floating">
                          <input value={img} onChange={e => setImg(e.target.value)} type="Text" className={`form-control ` + (isFormValidated ? imgError ? 'is-invalid' : 'is-valid' : '')} id="floatingPassword" placeholder="Nuotrauka"/>
                          <label htmlFor="floatingPassword">Vietos nuotrauka</label>
                          {imgError ? <p className="invalid-feedback">{imgError}</p> : null}
                        </div>

                        <div className="form-floating">
                          <input value={country} onChange={e => setCountry(e.target.value)} type="Text" className={`form-control ` + (isFormValidated ? countryError ? 'is-invalid' : 'is-valid' : '')} id="floatingPassword" placeholder="Šalis"/>
                          <label htmlFor="floatingPassword">Šalis</label>
                          {countryError ? <p className="invalid-feedback">{countryError}</p> : null}
                        </div>

                        <div className="form-floating">
                          <input value={city} onChange={e => setCity(e.target.value)} type="Text" className={`form-control ` + (isFormValidated ? cityError ? 'is-invalid' : 'is-valid' : '')} id="floatingPassword" placeholder="Miestas"/>
                          <label htmlFor="floatingPassword">Miestas</label>
                          {cityError ? <p className="invalid-feedback">{cityError}</p> : null}
                        </div>
                       
                        <button className="btn btn-primary w-100 py-2" type="submit">Prideti</button>
                    </form>
                </div>
    
            </main>
        </>
    );
}