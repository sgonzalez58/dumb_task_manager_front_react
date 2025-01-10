import { create } from "zustand";
import userTypes from "../constants/userTypes";

const loginWithCredentials = async (username, password, set) => {
    fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password}),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then(((data) => {
            if(data.err){
                return JSON.stringify({err : data.err})
            }
            set(() => ({
                loggedIn: true, userType: data.isAdmin ? userTypes.superAdmin : userTypes.user, username: data.username
            }))
            return JSON.stringify({message : "Success"});
        }))

}

const useUserStore = create((set) => ({
    username: 'nobody',
    userType: userTypes.guest,
    loggedIn: false,
    login: async (username, password) => loginWithCredentials(username, password, set),
    logout: () => {set(() => ({ username: nobody, userType: userTypes.guest, loggedIn: false}))}
}))

export default useUserStore