/* eslint-disable react/prop-types */
import { useState } from "react";
import { LocationTableRow } from "./LocationTableRow";

export function AdminLocationList({locations}){
  const [linkVisibility, setLinkVisibility] = useState(false);

    return (
        <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
              <button onClick={() => setLinkVisibility(prev => !prev)}>Rodyti/nerodyti foto nuorodos</button>
              <table className="table table-bordered border-primary">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">nuotrauka</th>
                      <th scope="col">Pavadinimas</th>
                      {linkVisibility ? <th scope="col">Nuotraukos nuoroda</th> : null}
                      <th scope="col">Šalis</th>
                      <th scope="col">Miestas</th>
                      <th scope="col">Gatvė</th>
                      <th scope="col">Numeris</th>
                      <th scope="col">Pašto kodas</th>
                      <th scope="col">Veiksmai</th>
                    </tr>
                  </thead>
                  <tbody>
                     {locations.map((location, index) => <LocationTableRow key={index} index={index} {...location} linkVisibility={linkVisibility} />)}
                     
                  </tbody>
              </table>
             
            </div>
        </div>
    );
}