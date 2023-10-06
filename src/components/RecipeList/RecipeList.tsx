import React from 'react';
import {Recipe} from "../RecipeCard/types";
import RecipeCard from "../RecipeCard/RecipeCard";
import {Result, Skeleton} from "antd";
import classes from "./style.module.css"

interface IRecipeListProps {
    isLoading: boolean;
    isFetching: boolean;
    paginatedItems: Recipe[]
    handleSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<IRecipeListProps> = (props) => {
    const {isFetching, isLoading, paginatedItems, handleSelectRecipe} = props


    if (isLoading || isFetching) {
        return <Skeleton className={classes.spin}/>;
    }

    if (paginatedItems.length === 0) {
        return <Result
            style={{margin: "0 auto"}}
            status="warning"
            title="No Recipes Found"
            subTitle="Sorry, there are no recipes available at the moment."
        />

    }

    return (
        <>
            {paginatedItems.map((recipe: Recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    handleSelectRecipe={handleSelectRecipe.bind(this, recipe)}
                />
            ))}
        </>
    );
};

export default RecipeList;
