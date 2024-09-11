import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LocationCard } from "../components/locations/LocationCard";


export function Locations(){
    const locationsData = [];
    
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
                        {locationsData.map((location, index) => <LocationCard key={index} {...location} />)}
                      </div>
                    </div>
                  </main>
            <Footer />
        </>
    );
}