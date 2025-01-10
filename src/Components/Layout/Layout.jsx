import { Link, Outlet } from "react-router"


const Layout = () => {
    return (
        <>
            <header className="bg-white shadow">
                <nav className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">DTM</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/tasks" className="text-gray-600 hover:text-gray-900">
                                Mes tâches
                            </Link>
                            
                            <Link to="/login" className="text-gray-600 hover:text-gray-900">Connexion</Link>
                            <Link to="/register" className="text-gray-600 hover:text-gray-900">Inscription</Link>
                        </div>
                    </div>
                </nav>
            </header>
            
            <Outlet />
        </>
    )
}

export default Layout