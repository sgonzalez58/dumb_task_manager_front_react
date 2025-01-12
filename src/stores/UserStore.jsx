import { create } from "zustand";
import userTypes from "../constants/userTypes";

const loginWithCredentials = (username, password, set) => {
    fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        if(data.err){
            set(() => ({errorMessage: "Erreur dans le nom d'utilisateur ou le mot de passe."}))
            return
        }else{
            set(() => ({
                loggedIn: true, userType: data.user.isAdmin ? userTypes.superAdmin : userTypes.user, username: data.user.username, errorMessage: null, token: data.token
            }))
        }
    })

}

const registerUser = (username, email, password, confirmPassword, gdpr, set) => {
    fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, confirmPassword, gdpr}),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((res) =>{
        return res.json()
    })
    .then((data) => {
        if(data.err){
            return set(() => ({errorMessage: data.err}))
        }else{
            set(() => ({
                loggedIn: true, userType: data.user.isAdmin ? userTypes.superAdmin : userTypes.user, username: data.user.username, errorMessage: null, token: data.token
            }))
        }
    })
    
}

const useUserStore = create((set) => ({
    username: 'nobody',
    userType: userTypes.guest,
    loggedIn: false,
    errorMessage: null,
    token: '',
    register: (username, email, password, confirmPassword, gdpr) => registerUser(username, email, password, confirmPassword, gdpr, set),
    login: (username, password) => loginWithCredentials(username, password, set),
    logout: () => {set(() => ({ username: "nobody", userType: userTypes.guest, loggedIn: false, token: ''})); }
}))

export default useUserStore