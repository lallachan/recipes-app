import React from 'react';
import {Card, Tag} from "antd";
import classes from "./style.module.css"
import {colors} from "../../utils/globalFunctions";


interface IRecipeCardProps {
    recipe: any
    handleSelectRecipe: (recipe: any) => void
}

const RecipeCard = ({recipe, handleSelectRecipe}: IRecipeCardProps) => {
    return (
        <Card onClick={handleSelectRecipe.bind(this, recipe.id)} className={classes.child} key={recipe.id}
              title={recipe.title} bordered={false} style={{width: 300}}>
            <span>Instrutions:</span>
            <ul style={{padding: "0", marginLeft: "15px"}}>
                {recipe.instructions?.map((i: string, index: string) => {
                    return <li style={{textAlign: "left"}} key={index}>{i}</li>;
                })}
            </ul>
            {recipe.tags?.map((tag: string, index: number) => {
                return <Tag color={colors[index]} key={index}>#{tag}</Tag>;
            })}
            <p className={classes.cardFooter}>Author: {recipe.authorId}</p>
        </Card>
    );
};

export default RecipeCard;
