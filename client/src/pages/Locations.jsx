import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

import { PublicLocationList } from "../components/locations/PublicLocationList";
import { AdminLocationList } from "../components/locations/AdminLocationList";
import { GlobalContext } from "../context/GlobalContext";


export function Locations(){
    const { role } = useContext(GlobalContext);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5020/api/locations')
            .then(res => res.json())
            .then(obj => {
                if (typeof obj !== 'object') {
                    throw new Error('Is serverio atejo ne objektas');
                } else {
                    setLocations(obj.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    let list = null;

    if(role === 'admin'){
        list = <AdminLocationList locations={locations}/>
    }else {
        list =     <PublicLocationList locations={locations} />
    }
    
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
                    {list}
                  </main>
            <Footer />
        </>
    );
}