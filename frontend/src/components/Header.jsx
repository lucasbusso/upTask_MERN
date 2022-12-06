import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Finder from "./Finder"

const Header = () => {
    const { handleFinder, logOut } = useProyectos();
    const { logOutAuth } = useAuth();

    const handleLogOut = () => {
        logOut();
        logOutAuth();
        localStorage.removeItem('token');
    }
    
    return (
        <header className="px-4 py-5 bg-white border-b ">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">upTask</h2>
    
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <button 
                        type="button"
                        className="font-bold uppercase"
                        onClick={handleFinder}
                    >Find project</button>
                    <Link 
                        to="/projects"
                        className="font-bold uppercase"
                    >
                        Projects
                    </Link>
                    <button 
                        className="text-white text-sm bg-sky-600 p-3 rounded-md font-bold"
                        type="button"
                        onClick={handleLogOut}
                    >
                        Sign off
                    </button>

                    <Finder />
                </div>
            </div>
        </header>
    )
}

export default Header