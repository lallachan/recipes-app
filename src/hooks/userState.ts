import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const TOKEN = process.env.REACT_APP_TOKEN ?? ""


const getUser = () => {
    const appUserId = localStorage.getItem("appUserId")
    return axios.get("https://getappuser-zazjbx7nka-uc.a.run.app/", {
        params: {appUserId},
        headers: {
            authId: TOKEN
        }
    })
}

export const useUserData = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
    })
}
