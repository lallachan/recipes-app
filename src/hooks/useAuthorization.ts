import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL ?? ""
const REGISTER_URL = process.env.REACT_APP_REGISTER_URL ?? ""
const DELETE_ACCOUNT_URL = process.env.REACT_APP_DELETE_ACCOUNT ?? ""
const TOKEN = process.env.REACT_APP_TOKEN ?? ""


const loginUser = (data: any) => {
    return axios.post(LOGIN_URL, data, {
        headers: {
            authId: TOKEN
        }
    })
}

const registerUser = (data: any) => {
    return axios.post(REGISTER_URL, data, {
        headers: {
            authId: TOKEN
        }
    })
}

const deleteUser = () => {
    return axios.get(DELETE_ACCOUNT_URL, {
        params: {appUserId: localStorage.getItem("appUserId")},
        headers: {
            authId: TOKEN
        }
    })
}


export const useLoginUser = () => {
    const navigate = useNavigate()
    return useMutation(loginUser, {
        onSuccess: (data) => {
            localStorage.setItem("appUserId", data.data.appUser.id)
            navigate("/dashboard")
        }
    })
}


export const useRegisterUser = () => {
    return useMutation(registerUser, {
        onSuccess: () => {
            console.log("Successfully registered!")
        }
    })
}

export const useDeleteUser = () => {
    const navigate = useNavigate()
    return useMutation(deleteUser, {
        onSuccess: () => {
            localStorage.removeItem("appUserId")
            navigate("/login")
        }
    })
}

