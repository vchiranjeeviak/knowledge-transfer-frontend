import { Link } from 'react-router-dom';
import '../../global.css';
import isAuthenticated from '../logical/Auth'

const Header = () => {

    return (

        <div className="header text-white">
            <ul className="navbar container bd-navbar-nav flex-row collapse show  nav-tabs justify-content-start ">

                <li className="nav-item"><Link to='/' className='text-white nav-link'>Knowledge Transfer</Link></li>
                <li className="nav-item text-white nav-link" ><Link to='/buybooks' className='text-white'>Buy Books</Link></li>
                {isAuthenticated() && <li className="nav-item text-white  nav-link "><Link to='/sellbooks' className='text-white'>Sell Books</Link></li>}
                {isAuthenticated() && <li className="nav-item text-white  nav-link "><Link to='/addedbooks' className='text-white'>Added Books</Link></li>}
                {isAuthenticated() && <li className="nav-item text-white  nav-link "><Link to='/profile' className='text-white'>Profile</Link></li>}
                {isAuthenticated() && <li className="nav-item text-white  nav-link "><Link to='/cart' className='text-white'>Cart</Link></li>}
                {!isAuthenticated() && <li className="nav-item nav-link"><Link to='/signup' className='text-white'>Signup</Link></li>}
                {!isAuthenticated() && <li className="nav-item nav-link ms-auto"><Link to='/signin' className='text-white'>Signin</Link></li>}
                {isAuthenticated() && <li className="nav-item nav-link ms-auto"><Link to='/signout' className='text-white'>Signout</Link></li>}
            </ul>
        </div>
    );
}

export default Header;