import React from "react";
import {Modal} from "antd";
import CreateRecipeForm from "../forms/CreateRecipeForm/CreateRecipeForm";

interface CreateModalProps {
    open: boolean;
    onClose: () => void;
}


const CreateModal: React.FC<CreateModalProps> = ({open, onClose}) => {


    return (
        <Modal title={"Create new recipe"} open={open} onOk={onClose} onCancel={onClose}>
            <CreateRecipeForm onClose={onClose} />
        </Modal>
    );
};

export default CreateModal;
