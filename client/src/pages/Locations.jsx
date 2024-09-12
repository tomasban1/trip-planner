import { useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LocationCard } from "../components/locations/LocationCard";


export function Locations(){
    const [locations, setLocations] = useState([]);
    useEffect(() => {
      let inProgressMsg = '';

      fetch('http://localhost:5020/api/locations')
          .then(res => res.json())
          .then(obj => {
            if(typeof obj !== 'object'){
              inProgressMsg = 'fail 1';
              throw new Error('Is serverio atejo ne objektas')
            }else {
              inProgressMsg = 'Duomenys gauti';
              setLocations(obj.data)
            }
          })
          .catch(err => {
            inProgressMsg = 'fail 2';
            console.log(err);
            
          })
          .finally(() =>{
            console.log(inProgressMsg);
          })
    }, []);
    
    
    return (
        <>
            <Header />
                  <main>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>Lankytinos vietos</h1>
                                <p>Pažiūrėk ir išsirink vietas, kurias norėtum aplankyti!</p>
                            </div>
                        </div>
                    </div>
                    <div className="container px-4 py-5">
                      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        {locations.map((location, index) => <LocationCard key={index} {...location} />)}
                      </div>
                    </div>
                  </main>
            <Footer />
        </>
    );
}