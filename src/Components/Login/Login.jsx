import { useState } from "react"
import { Link, useNavigate } from "react-router"
import useUserStore from "../../stores/UserStore"

const Login = () =>{

    const navigate = useNavigate()

    const {errorMessage, login, loggedIn, username, userType} = useUserStore()

    // if(loggedIn){
    //     navigate("/")
    // }

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.username.length === 0) return null;
        if(formData.password.length === 0) return null;

        login(formData.username, formData.password)
        
        console.log(loggedIn, errorMessage, username, userType)
        if(loggedIn){
            navigate("/")
        }

    }

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Connexion</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Nom d'utilisateur
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChangeInput}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChangeInput}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Se connecter
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Pas encore de compte ?
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                S'inscrire ici
                </Link>
            </p>
            { errorMessage && <h4 className="mt-4 text-center text-red-600">{errorMessage}</h4> }
        </div>
    )
}

export default Login