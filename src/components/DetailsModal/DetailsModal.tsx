import React, {useState} from "react";
import {Button, Modal, Skeleton, Tag} from "antd";
import {Recipe} from "../RecipeCard/types";
import {useUserData} from "../../hooks/userState";
import {useDeleteRecipe} from "../../hooks/useRecipes";
import EditRecipe from "./EditRecipe";
import {colors} from "../../utils/globalFunctions";


interface DetailsModalProps {
    open: boolean;
    onClose: () => void;
    recipe: Recipe | undefined;
}

const DetailsModal: React.FC<DetailsModalProps> = ({open, onClose, recipe}) => {
    const {data: user} = useUserData();
    const [isEdit, setIsEdit] = useState(false);
    const {mutate: deleteRecipe, status} = useDeleteRecipe(onClose);
    const userId = user?.data?.appUser?.id;


    const handleDeleteRecipe = async () => {
        if (recipe) {
            await deleteRecipe(recipe?.id);
        }
    };


    const footer = () => {
        if (recipe?.authorId === userId && !isEdit) {
            return <div>
                <Button type="primary" onClick={setIsEdit.bind(this, true)}>Edit recipe</Button>
                <Button type="primary" danger onClick={handleDeleteRecipe}>Delete recipe</Button>
            </div>;
        }
        if (isEdit) {
            return <div>
                <Button type="default" onClick={setIsEdit.bind(this, false)}>Abort</Button>
            </div>;
        }
        return <></>;
    };

    if (!recipe) return <></>;

    if (status == "loading") return <Modal title={isEdit ? "Edit recipe" : "Recipe details"} open={open} onOk={onClose}
                                           onCancel={onClose}><Skeleton/></Modal>;


    return (
        <Modal title={isEdit ? "Edit recipe" : "Recipe details"} open={open} onOk={onClose} onCancel={onClose}
               footer={footer}>
            {isEdit ?
                <EditRecipe onClose={onClose} recipe={recipe} setIsEdit={setIsEdit}/>
                :
                <>
                    <h3>{recipe.title}</h3>
                    <ul>
                        {recipe.instructions.map((i: string, index: number) => {
                            return <li style={{textAlign: "left"}} key={index}>{i}</li>;
                        })}
                    </ul>
                    {recipe.tags.map((tag: string, index: number) => {
                        return <Tag color={colors[index]} key={index}>#{tag}</Tag>;
                    })}
                </>
            }
        </Modal>
    );
};

export default DetailsModal;
