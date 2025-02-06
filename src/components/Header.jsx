import { NavLink } from "react-router-dom";

function Header({ className }) {

    return (
        <header className={`flex h-auto items-center px-8 py-4 ${className} right-0 left-0 z-50 bg-[#5E3472] rounded-md mx-4`}>
            <NavLink to={"/"}><img className="logo w-12" src="/img/logo_menu.png" alt="logo MMINextLevel" /></NavLink>
        </header>
    )

};

export default Header;