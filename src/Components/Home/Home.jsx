import { Link } from "react-router"
import Layout from "../Layout/Layout"

const Home = () =>{
    return (
        <div className="max-w-4xl mx-auto text-center">
            <div className="py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenue sur DTM</h1>
                <p className="text-xl text-gray-600 mb-8">
                La façon la plus simple de gérer vos tâches quotidiennes
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-2xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Créez des tâches</h3>
                <p className="text-gray-600">
                    Ajoutez facilement vos tâches avec un titre et une description
                </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-2xl mb-4">✅</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Suivez votre progression
                </h3>
                <p className="text-gray-600">
                    Marquez vos tâches comme terminées et gardez une trace de vos
                    accomplissements
                </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-2xl mb-4">🔄</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Restez organisé</h3>
                <p className="text-gray-600">
                    Gérez vos tâches efficacement et augmentez votre productivité
                </p>
                </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à commencer ?</h2>
                <div className="space-x-4">
                    <Link to="/register" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                        Créer un compte
                    </Link>
                    <Link to="/login" className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-50">
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home