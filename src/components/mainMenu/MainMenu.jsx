import './MainMenu.css';
import {NavLink} from "react-router-dom";

function MainMenu(){

    return (
        <div className="main-menu-container">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                            Menu
                        </NavLink>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink to="/reservations" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>*/}
                    {/*        Reservation*/}
                    {/*    </NavLink>*/}
                    {/*</li>*/}
                    <li>
                        <NavLink to="/login" className ={({isActive})=> isActive ? 'active-menu-link' : 'default-menu-link'}>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default MainMenu;