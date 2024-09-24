/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";


export function SecretContent({dedicatedRole}){
    const {isLoggedIn, role} = useContext(GlobalContext);

    return (
        <main className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Turinys nepasiekiamas</h1>
                    {role !== dedicatedRole &&
                        <p>Turinys skirtas tik "{dedicatedRole}" vartotojams</p>
                    }
                    {!isLoggedIn &&
                        <Link to={'/login'} className="btn btn-primary">Login</Link>
                    }
                    
                </div>
            </div>
        </main>
    );
}