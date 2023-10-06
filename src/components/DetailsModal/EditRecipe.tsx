import React, {useState} from 'react';
import {Button, Form, Input, Skeleton, Tag} from "antd";
import {Recipe} from "../RecipeCard/types";
import {RecipeType} from "../auth/types";
import {CloseCircleOutlined} from "@ant-design/icons";
import {useEditRecipe} from "../../hooks/useRecipes";
import dayjs from "dayjs";
import classes from "./style.module.css"

interface IEditRecipeProps {
    recipe: Recipe
    setIsEdit: (show: boolean) => void
    onClose: () => void;
}

const EditRecipe = ({recipe, setIsEdit, onClose}: IEditRecipeProps) => {
    const [inputValue, setInputValue] = useState("");
    const [tagValue, setTagValue] = useState("");
    const [tags, setTags] = useState(recipe.tags);
    const [instructions, setInstructions] = useState(recipe.instructions);

    const handleOnSuccess = () => {
        setIsEdit(false)
        onClose()
    }

    const {mutate: editRecipe, status} = useEditRecipe(handleOnSuccess)


    const onSubmit = async (values: Recipe) => {
        await editRecipe({
            recipeId: recipe.id,
            recipe: {
                title: values.title,
                dateCreated: dayjs(),
                authorId: recipe.authorId,
                instructions: instructions,
                tags: tags
            }
        })
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const handleAddInstruction = () => {
        if (inputValue === "") return
        setInstructions([...instructions, inputValue]);
        setInputValue("");
    };

    const handleAddTag = () => {
        if (tagValue === "") return
        setTags([...tags, tagValue]);
        setTagValue("");
    };

    const handleRemoveInstruction = (item: string) => {
        const filtered = instructions.filter(i => i !== item)
        setInstructions(filtered)
    }

    const handleRemoveTag = (item: string) => {
        const filtered = tags.filter(i => i !== item)
        setTags(filtered)
    }


    if (status === "loading") return <Skeleton/>

    return (
        <div className={classes.editContainer}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{
                    title: recipe.title,
                    dateCreated: recipe.dateCreated,
                    authorId: recipe.authorId,
                    instructions: recipe.instructions,
                    tags: recipe.tags

                }}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
                autoComplete="off"
            >
                <Form.Item<RecipeType>
                    label="Title"
                    name="title"
                    rules={[
                        {required: true, message: "Please add recipe title"},
                    ]}

                >
                    <Input/>
                </Form.Item>
                <ul className={classes.ulList}>{instructions.map(i =>
                    <div className={classes.rowItem}>
                        <li>{i}</li>
                        <Button onClick={handleRemoveInstruction.bind(this, i)} icon={<CloseCircleOutlined/>}
                                type={"text"}></Button></div>)}</ul>
                <Form.Item<RecipeType>
                    label="Instructions"
                    name="instructions"
                    required
                    rules={[
                        () => ({
                            validator() {
                                if (recipe.instructions.length > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Please add at least one instruction!'));
                            },
                        }),
                    ]}
                >
                    <Input value={inputValue} onChange={(e) => {
                        setInputValue(e.target.value);
                    }}/>
                    <Button style={{marginTop: "10px"}} onClick={handleAddInstruction}>Add</Button>
                </Form.Item>
                <ul className={classes.ulListTags}>{tags.map(i =>
                    <div className={classes.rowItem}>
                        <Tag>#{i}</Tag>
                        <Button onClick={handleRemoveTag.bind(this, i)}
                                icon={<CloseCircleOutlined/>}
                                type={"text"}></Button></div>)}</ul>
                <Form.Item<RecipeType>
                    label="Tags"
                    required
                    name="tags"
                    rules={[
                        () => ({
                            validator() {
                                if (recipe.tags.length > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Please add at least one tag!'));
                            },
                        }),
                    ]}
                >
                    <Input value={tagValue} onChange={(e) => {
                        setTagValue(e.target.value);
                    }}/>
                    <Button style={{marginTop: "10px"}} onClick={handleAddTag}>Add</Button>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditRecipe;
