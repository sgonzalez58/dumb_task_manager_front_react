import { Link } from "react-router"

const Login = () =>{
    return (
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-8">Inscription</h1>

            {/* <% if (typeof err !== 'undefined') { %>
            <div class="mb-4 p-4 text-red-700 bg-red-100 rounded-md"><%= err %></div>
            <% } %> */}

            <form action="/register" method="POST" class="space-y-6">
                <div class="space-y-2">
                <label for="username" class="block text-sm font-medium text-gray-700">
                    Nom d'utilisateur
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">
                    Mot de passe
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                <div class="space-y-2">
                <label
                    for="confirmPassword"
                    class="block text-sm font-medium text-gray-700"
                >
                    Confirmer le mot de passe
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                <div class="space-y-2">
                <label class="flex items-center">
                    <input
                    type="checkbox"
                    name="gdpr"
                    required
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 block text-sm text-gray-700">
                    J'accepte que mes données soient utilisées pour la gestion de mon
                    compte
                    </span>
                </label>
                </div>

                <button
                type="submit"
                class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                S'inscrire
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-gray-600">
                Déjà un compte ?
                <a href="/login" class="font-medium text-blue-600 hover:text-blue-500">
                Se connecter ici
                </a>
            </p>
            </div>
    )
}

export default Login