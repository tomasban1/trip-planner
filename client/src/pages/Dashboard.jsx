 
import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { PublicLocationList } from "../components/locations/PublicLocationList";



export function Dashboard(){
    const {isLoggedIn, role, likedLocations} = useContext(GlobalContext);
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

    return (
         <>
            <Header />
            {
            isLoggedIn &&
            <main>
                <section className="container">
                    <div className="row">
                        <div className="col-12">
                            <div>
                                <h1>Dashboard</h1>
                                <Link to={'/locations/new'} className="btn btn-primary">+ Nauja lokacija</Link>
                                {
                                    role === 'user' && <PublicLocationList locations={locations.filter(obj => likedLocations.includes(obj.id))} />
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            }
              {
            !isLoggedIn &&
            <main>
                <section className="container">
                    <div className="row">
                        <div className="col-12">
                            <div>
                                <h1>401</h1>
                                <p>Šis puslapis skirtas tik prisijungusiems vartotojams, eikite prisijungti.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            }
            
            <Footer />
         </>
    );
}