import { useNavigate } from "react-router"
import useUserStore from "../../stores/UserStore"
import { useEffect, useState } from "react"

const Tasks = () =>{

    const navigate = useNavigate()

    const isLoggedIn = useUserStore((state) => state.loggedIn)
    const token = useUserStore((state) => state.token)

    const [errorTask, setErrorTask] = useState({errorStatus: false, errorMessage: ""})

    const [tasks, setTasks] = useState([]);

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
                return response.json()
            })
            .then((data) => {
                const rawTasks = data.data;
                rawTasks.sort((a, b) => {
                    const dateA = new Date(a.createdat).getTime()
                    const dateB = new Date(b.createdat).getTime()
                    return dateA - dateB;
                })
                setTasks(rawTasks)
                console.log(tasks, rawTasks)
            })
            .catch((error) => console.error(error.message))
    }, [])

    const handleToggle = () =>{
        document.getElementById('addTaskModal').classList.toggle('hidden')
    }

    const [formData, setFormData] = useState({
        title: '',
        description: "",
        completion: false
    })
    
    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.title.length === 0) return null;

        fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            body: JSON.stringify({
                title: formData.title,
                description: formData.description,
                completion: formData.completion
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            if(data.err){
                setErrorTask({errorStatus: true, errorMessage: data.err})
                return
            }else{
                setTasks(tasks => [
                    ...tasks,
                    data.task
                ].sort((a, b) => {
                    const dateA = new Date(a.createdat).getTime()
                    const dateB = new Date(b.createdat).getTime()
                    return dateA - dateB;
                }));
                setFormData({
                    title: '',
                    description: "",
                    completion: false
                })
                handleToggle();
                return;
            }
        })
    }

    const handleDeleteErrorMessage = () => {
        setErrorTask({errorStatus: false, errorMessage: ""})
    }

    const handleToggleCompletion = (e) => {
        e.preventDefault();
        const task_id = e.target.id.split('-')[1]
        fetch(`http://localhost:3000/api/tasks/toggle/${task_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            if(data.err){
                setErrorTask({errorStatus: true, errorMessage: data.err})
                return
            }else{
                console.log(tasks)
                setTasks(tasks => tasks.map(task => task.id === Number(data.task.id) ? { ...task, completed : !task.completed} : task))
                return;
            }
        })
    }

    const handleDeleteTask = (e) => {
        e.preventDefault();
        const task_id = e.target.id.split('-')[1]
        fetch(`http://localhost:3000/api/tasks/remove/${task_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            if(data.err){
                setErrorTask({errorStatus: true, errorMessage: data.err})
                return
            }else{
                setTasks(tasks => tasks.filter(task => task.id !== Number(data.task.id)))
                return;
            }
        })
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

            { errorTask.errorStatus && (
                <div className="bg-white p-2 rounded-lg shadow-md m-3 flex justify-center gap-2">
                    <p className="mt-2 text-center text-red-600">{errorTask.errorMessage}</p>
                    <button onClick={handleDeleteErrorMessage} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
            )}

            <div className="grid gap-4">
                { tasks.length > 0 && tasks.map((task) => task && (
                <div 
                className={`bg-white p-4 rounded-lg shadow-md ${task.completed ? 'border-l-4 border-green-500' : ''}`}
                >
                <div className="flex justify-between items-center">
                    <div className="flex-1">
                    <h3
                        className={`text-lg font-semibold text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}
                    >
                        {task.title}
                    </h3>
                    <p
                        className={`text-gray-600 mt-1 ${task.completed ? 'line-through' : ''}`}
                    >
                        {task.description}
                    </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="checkbox" checked={task.completed ? true : false}
                        id={`checkbox_task_completion-${task.id}`}
                        onChange={handleToggleCompletion} className="h-5 w-5 text-blue-600
                        focus:ring-blue-500 border-gray-300 rounded cursor-pointer" /> 
                    <button
                        key={`task-${task.id}`}
                        id={`delete_task_button-${task.id}`}
                        onClick={handleDeleteTask}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                    >
                        Supprimer
                    </button>
                    </div>
                </div>
                </div>
                ))}
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
                                onChange={handleChangeInput}
                                required
                                value={formData.title}
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
                                onChange={handleChangeInput}
                                value={formData.description}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="completion"
                                name="completion"
                                onChange={handleChangeInput}
                                checked={formData.completion}
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