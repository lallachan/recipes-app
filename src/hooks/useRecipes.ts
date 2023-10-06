import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {token} from "../utils/globalFunctions";

const TOKEN = process.env.REACT_APP_TOKEN ?? ""
const REACT_APP_GET_ALL_RECIPES = process.env.REACT_APP_GET_ALL_RECIPES ?? ""
const REACT_APP_ADD_RECIPE = process.env.REACT_APP_ADD_RECIPE ?? ""
const REACT_APP_EDIT_RECIPE = process.env.REACT_APP_EDIT_RECIPE ?? ""
const REACT_APP_DELETE_RECIPE = process.env.REACT_APP_DELETE_RECIPE ?? ""

const getAllRecipes = () => {
    return axios.get(REACT_APP_GET_ALL_RECIPES , {
        headers: {
            "authid": token
        }
    });
};

export const useAllRecipes = () => {

    return useQuery({
        queryKey: ['allRecipes'],
        queryFn: getAllRecipes,
    });
};


const addRecipe = (data: any) => {
    return axios.post(REACT_APP_ADD_RECIPE, data, {
        headers: {
            authId: TOKEN
        }
    })
}

const editRecipe = (data: any) => {
    return axios.patch(REACT_APP_EDIT_RECIPE, data, {
        headers: {
            authId: TOKEN
        }
    })
}

const deleteRecipe = (recipeId: string) => {
    return axios.delete(REACT_APP_DELETE_RECIPE, {
        params: {recipeId: recipeId},
        headers: {
            authId: TOKEN
        }
    })
}

export const useAddRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation(addRecipe, {
        onSuccess: (async () => {
            await queryClient.invalidateQueries(['allRecipes']);
        })
    })
}

export const useDeleteRecipe = (onClose: () => void) => {
    const queryClient = useQueryClient();
    return useMutation(deleteRecipe, {
        onSuccess: (async () => {
            await queryClient.invalidateQueries(['allRecipes']);
            onClose()
        })
    })
}

export const useEditRecipe = (handleOnSuccess: () => void) => {
    const queryClient = useQueryClient();
    return useMutation(editRecipe, {
        onSuccess: (async () => {
            await queryClient.invalidateQueries(['allRecipes']);
            handleOnSuccess()
        })
    })
}

