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
                set(() => ({errorMessage: "Erreur dans le nom d'utilisateur ou le mot de passe."}))
                return
            }
            set(() => ({
                loggedIn: true, userType: data.user.isAdmin ? userTypes.superAdmin : userTypes.user, username: data.user.username, errorMessage: null
            }))

        }))

}

const useUserStore = create((set) => ({
    username: 'nobody',
    userType: userTypes.guest,
    loggedIn: false,
    errorMessage: null,
    login: async (username, password) => loginWithCredentials(username, password, set),
    logout: () => {set(() => ({ username: "nobody", userType: userTypes.guest, loggedIn: false}))}
}))

export default useUserStore