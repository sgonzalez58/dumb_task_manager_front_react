import { Link, Outlet, useNavigate } from "react-router"
import useUserStore from "../../stores/UserStore"


const Layout = () => {

    const navigate = useNavigate()

    const {username, userType, loggedIn, logout} = useUserStore()

    const handleDisconnect = () =>{
        logout();
        return navigate('/login');
    }

    return (
        <>
            <header className="bg-white shadow">
                <nav className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">DTM</Link>
                        </div>
                        { loggedIn && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Bienvenue, {username}</span>
                                <Link to="/tasks" className="text-gray-600 hover:text-gray-900">
                                    Mes tâches
                                </Link>
                                { userType == 'admin' || userType == 'superAdmin' && (
                                    <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                                        Administration
                                    </Link>
                                )}
                                <button onClick={handleDisconnect} className="text-gray-600 hover:text-gray-900">
                                    Se déconnecter
                                </button>
                            </div>
                        )}
                        { !loggedIn && (

                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-gray-900">Connexion</Link>
                                <Link to="/register" className="text-gray-600 hover:text-gray-900">Inscription</Link>
                            </div>
                        )}                            
                    </div>
                </nav>
            </header>
            
            <Outlet />
        </>
    )
}

export default Layout