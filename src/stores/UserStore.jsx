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
                loggedIn: true, userType: data.user.isAdmin ? userTypes.superAdmin : userTypes.user, username: data.user.username, errorMessage: null
            }))
        }
    })

}

const registerUser = (username, email, password, confirmPassword, grpd, set) => {
    fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, confirmPassword, grpd}),
        headers: {
            "Content-type": "application/json"
        }
    })
    .the,((res) =>{
        return res.json()
    })
    .then((data) => {
        if(data.err){
            return set(() => ({errorMessage: data.err}))
        }else{
            set(() => ({
                loggedIn: true, userType: data.user.isAdmin ? userTypes.superAdmin : userTypes.user, username: data.user.username, errorMessage: null
            }))
        }
    })
    
}

const useUserStore = create((set) => ({
    username: 'nobody',
    userType: userTypes.guest,
    loggedIn: false,
    errorMessage: null,
    register: (username, email, password, confirmPassword, grpd) => registerUser(username, email, password, confirmPassword, grpd, set),
    login: (username, password) => loginWithCredentials(username, password, set),
    logout: () => {set(() => ({ username: "nobody", userType: userTypes.guest, loggedIn: false}))}
}))

export default useUserStore