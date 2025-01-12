import { Link, useNavigate } from "react-router"
import useUserStore from "../../stores/UserStore"
import { useEffect, useState } from "react"

const Tasks = () =>{

    const navigate = useNavigate()

    const isLoggedIn = useUserStore((state) => state.loggedIn)
    const token = useUserStore((state) => state.token)

    const {tasks, setTasks} = useState([]);

    useEffect(()=>{
        if(!isLoggedIn || !token){
            navigate('/login')
            return
        }
        fetch("http://localhost:3000/api/tasks", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                console.log(response.json)
                return response.json()
            })
            .then((data) => {
                setBookList(data)
                setFilled(true)
            })
            .catch((error) => console.error(error.message))
    }, [])

    const handleToggle = (e) =>{
        document.getElementById('addTaskModal').classList.toggle('hidden')
    }

    const handleSubmit = (e) => {

    }

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Mes tâches</h1>
                <button onClick={handleToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                Nouvelle tâche
                </button>
            </div>

        <div className="grid gap-4">
            {/* <% data.map((el) => { %>
            <div
            className="bg-white p-4 rounded-lg shadow-md <%= el.completed ? 'border-l-4 border-green-500' : '' %>"
            >
            <div className="flex justify-between items-center">
                <div className="flex-1">
                <h3
                    className="text-lg font-semibold text-gray-900 <%= el.completed ? 'line-through text-gray-500' : '' %>"
                >
                    <%= el.title %>
                </h3>
                <p
                    className="text-gray-600 mt-1 <%= el.completed ? 'line-through' : '' %>"
                >
                    <%= el.description %>
                </p>
                </div>
                <div className="flex items-center gap-4">
                <form
                    action="/tasks/toggle/<%= el.id %>"
                    method="POST"
                    className="inline"
                >
                    <input type="checkbox" <%= el.completed ? 'checked' : '' %>
                    onchange="this.form.submit()" className="h-5 w-5 text-blue-600
                    focus:ring-blue-500 border-gray-300 rounded cursor-pointer" />
                </form>
                <Link
                    to={deleteTask}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                >
                    Supprimer
                </a>
                </div>
            </div>
            </div>
            <% }) %> */}
        </div>

        <div
            id="addTaskModal"
            className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        >
            <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Nouvelle tâche</h3>
                    <button
                    onClick={handleToggle}
                    className="text-gray-400 hover:text-gray-600"
                    >
                    ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700"
                            >Titre</label
                        >
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                            >Description</label
                        >
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="completion"
                            name="completion"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="completion" className="ml-2 block text-sm text-gray-700">
                            Tâche terminée
                        </label>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleToggle}
                            className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Tasks