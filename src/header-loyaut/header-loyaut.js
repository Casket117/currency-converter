import './header-loyaut.scss';

import { NavLink, Outlet } from 'react-router-dom';

const HeaderLoyaut = () => {

    const setActive = ({isActive}) => isActive ? "active-link" : '';

    return (
        <>
            <header>
                <div className="container-links">
                    <div className="container-link-item">
                        <NavLink to="/" className={setActive}>Exchange Currency</NavLink>
                    </div>
                    <div className="container-link-item">
                        <NavLink to="/rates" className={setActive}>Currency Rates</NavLink>
                    </div>
                </div>
            </header>
            <div className="container">
                <Outlet/>
            </div>
        </>
    )
}

export {HeaderLoyaut};