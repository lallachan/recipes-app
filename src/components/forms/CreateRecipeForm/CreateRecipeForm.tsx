import React, {useState} from "react";
import {Button, Form, Input, Skeleton, Tag} from "antd";
import classes from "./style.module.css";
import dayjs from "dayjs";
import {useAddRecipe} from "../../../hooks/useRecipes";
import {RecipeType} from "../../auth/types";
import {CloseCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";


interface ICreateRecipeFormProps {
    onClose: () => void;
}

const CreateRecipeForm = ({onClose}: ICreateRecipeFormProps) => {

    const [tags, setTags] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [tagValue, setTagValue] = useState("");

    const {mutate: addRecipe, status} = useAddRecipe();
    const [form] = useForm();
    const onSubmit = async (values: any) => {
        await addRecipe({
            recipe: {
                title: values.title,
                dateCreated: dayjs(),
                authorId: localStorage.getItem("appUserId"),
                instructions: instructions,
                tags: tags
            }
        });
        form.resetFields();
        setInstructions([])
        setTags([])
        onClose();
    };


    const onSubmitFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const handleAddInstruction = () => {
        if (inputValue === "") return;
        setInstructions((prev) => [...prev, inputValue]);
        setInputValue("");
    };

    const handleAddTag = () => {
        if (tagValue === "") return;
        setTags((prev) => [...prev, tagValue]);
        setTagValue("");
    };


    const handleRemoveInstruction = (item: string) => {
        const filtered = instructions.filter(i => i !== item);
        setInstructions(filtered);
    };

    const handleRemoveTag = (item: string) => {
        const filtered = tags.filter(i => i !== item);
        setTags(filtered);
    };

    if (status === "loading") {
        return <Skeleton/>;
    }

    const initialValues = {
        title: "",
        dateCreated: "",
        authorId: "",
        instructions: "",
        tags: ""

    };


    return (
        <div className={classes.formContainer}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={initialValues}
                onFinish={onSubmit}
                form={form}
                onFinishFailed={onSubmitFailed}
                autoComplete="off"
            >
                <Form.Item<RecipeType>
                    label="Title"
                    name="title"
                    rules={[{required: true, message: "Please add recipe title"}]}
                >
                    <Input/>
                </Form.Item>
                <ul className={classes.ulListInstructions}>{instructions.map((i, index) =>
                    <div className={classes.listRow}>
                        <li key={index}>{i}</li>
                        <Button onClick={handleRemoveInstruction.bind(this, i)} icon={<CloseCircleOutlined/>}
                                type={"text"}></Button></div>)}</ul>
                <Form.Item<RecipeType>
                    label="Instructions"
                    name="instructions"
                    required
                    rules={[
                        () => ({
                            validator() {
                                if (instructions.length > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Please add at least one instruction!"));
                            },
                        }),
                    ]}
                >
                    <Input value={inputValue} onChange={(e) => {
                        setInputValue(e.target.value);
                    }}/>
                    <br/>
                    <Button icon={<PlusOutlined/>} style={{marginTop: "10px"}}
                            onClick={handleAddInstruction}>Add</Button>
                </Form.Item>
                <ul className={classes.ulList}>{tags.map((i,index) =>
                    <div className={classes.listRow}>
                        <Tag key={index} className={classes.tag}>#{i}</Tag>
                        <Button onClick={handleRemoveTag.bind(this, i)} icon={<CloseCircleOutlined/>} type={"text"}/>
                    </div>)}
                </ul>
                <Form.Item<RecipeType>
                    label="Tags"
                    required
                    name="tags"
                    rules={[
                        () => ({
                            validator() {
                                if (tags.length > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Please add at least one tag!"));
                            },
                        }),
                    ]}
                >
                    <Input value={tagValue} onChange={(e) => {
                        setTagValue(e.target.value);
                    }}/>
                    <br/>
                    <Button icon={<PlusOutlined/>} style={{marginTop: "10px"}} onClick={handleAddTag}>Add</Button>
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

export default CreateRecipeForm;
