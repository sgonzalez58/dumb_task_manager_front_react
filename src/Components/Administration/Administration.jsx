import { Link } from "react-router"
import useUserStore from "../../stores/UserStore"
import { useEffect, useState } from "react"

const Administration = () =>{

    const userType = useUserStore((state) => state.userType)
    const myUsername = useUserStore((state) => state.username)
    const token = useUserStore((state) => state.token)

    const [errorAdmin, setErrorAdmin] = useState({errorStatus: false, errorMessage: ""})

    const [users, setUsers] = useState([])

    useEffect(()=>{
        if(!userType == 'admin' || !userType == 'superAdmin'){
            navigate('/login')
            return
        }
        fetch("http://localhost:3000/api/admin", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUsers(data.users)
            })
            .catch((error) => console.error(error.message))
    }, [])

    const handleDeleteErrorMessage = () => {
        setErrorAdmin({errorStatus: false, errorMessage: ""})
    }

    const handleChangeRole = (e) =>{
        e.preventDefault();
        const user_id = e.target.id.split('-')[1];
        const role_user = e.target.value;
        fetch(`http://localhost:3000/api/admin/toggle-admin/${user_id}`, {
            method: "POST",
            body: JSON.stringify({
                role_user: role_user
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
                setErrorAdmin({errorStatus: true, errorMessage: data.err})
                return
            }else{
                setUsers(users => users.map(user => user.id === Number(data.user.id) ? { ...user, role : data.user.role} : user))
                return;
            }
        })
    }

    const handleDeleteUser = (e) =>{
        e.preventDefault();
        const user_id = e.target.id.split('-')[1]
        const user_username = e.target.parentElement.previousElementSibling.innerText;
        if(!confirm(`Voulez-vous vraiment supprimer le compte de ${user_username}`)) return;
        fetch(`http://localhost:3000/api/admin/delete-user`, {
            method: "POST",
            body: JSON.stringify({
                idToDelete: user_id
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
                setErrorAdmin({errorStatus: true, errorMessage: data.err})
                return
            }else{
                setUsers(users => users.filter(user => user.id !== Number(data.user.id)))
                return;
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto mt-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            </div>

            { errorAdmin.errorStatus && (
                <div className="bg-white p-2 rounded-lg shadow-md m-3 flex justify-center gap-2">
                    <p className="mt-2 text-center text-red-600">{errorAdmin.errorMessage}</p>
                    <button onClick={handleDeleteErrorMessage} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Liste des utilisateurs
                </h2>
                <div className="divide-y divide-gray-200">
                { users.length > 0 && users.map((user) => user && (
                    <div key={`user-${user.id}`} className="py-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                {user.username}
                            </h3>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                            <div
                                className="flex items-center"
                            >
                                
                                <label className="text-sm text-gray-700 me-1">Role:</label>
                                <select id={`change_role_user-${user.id}`} name="role_user" disabled={ user.username === myUsername || userType == 'admin' ? 'disabled' : ''}
                                onChange={handleChangeRole} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected={ user.role == 'user' ? true : false}>user</option>
                                    <option selected={ user.role == 'admin' ? true : false}>admin</option>
                                    <option selected={ user.role == 'superAdmin' ? true : false}>superAdmin</option>
                                </select>
                            </div>
                            <button
                                onClick={handleDeleteUser}
                                id={`delete_user-${user.id}`}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                Supprimer
                                </button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Administration