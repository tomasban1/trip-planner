import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/react.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';


export function Header(){
  const {isLoggedIn, changeLoginStatus, role, username} = useContext(GlobalContext);
  const navigate = useNavigate();

  function logout(){
    
    fetch('http://localhost:5020/api/logout', {
      credentials: 'include',
    })
      .then(() => {
          changeLoginStatus(false);
          navigate('/');
      })
      .catch(err => console.error(err));
  }

    return (
        <div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <Link to='/' className="d-inline-flex link-body-emphasis text-decoration-none">
             <img src={logo} alt="Logo" />
        </Link>
      </div>

      <ul className="nav col-12 col-md-auto justify-content-center mb-md-0">
        <li>
          <Link to='/' className="nav-link px-2">Pagrindinis</Link>
        </li>
        <li>
          <Link to='/locations' className="nav-link px-2">Lankytinos vietos</Link>
        </li>

        <li>
          <Link to='/404' className="nav-link px-2">404</Link>
        </li>
      </ul>

      {!isLoggedIn && <div className="col-md-3 nav justify-content-end">
        <Link to='/login' className="btn btn-outline-primary me-2">Prisijungti</Link>
        <Link to='/register' className="btn btn-primary">Registruotis</Link>
      </div>}

      {isLoggedIn && <div className="col-md-3 nav justify-content-end">
        <p>{username} ({role})</p>
        <Link to='/dashboard' className="nav-link px-2">To dashboard</Link>
        <button onClick={logout} className="btn btn-outline-primary me-2">Log out</button>
      </div>}


    </header>
  </div>
    );
}