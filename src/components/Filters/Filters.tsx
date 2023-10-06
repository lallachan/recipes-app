import React from "react";
import {Button, Input, Select} from "antd";
import classes from "./style.module.css"

interface IFilterProps {
    handleToggle: () => void
    toggleShowRecipes: boolean
    tags: string[]
    setOpenCreateModal: () => void;
    setTagsToFilter: (tag: string[]) => void;
    setSearchName: (name: string) => void
}

const Filters = ({
                     handleToggle,
                     toggleShowRecipes,
                     tags,
                     setOpenCreateModal,
                     setTagsToFilter,
                     setSearchName
                 }: IFilterProps) => {

    const options = tags.map(tag => {
        return {label: tag, value: tag}
    })

    const handleChange = (value: string[]) => {
        setTagsToFilter([...value])
    }

    const handleSearch = (e: any) => {
        setSearchName(e.target.value)
    }

    return (
        <div className={classes.filterContainer}>
            <Button onClick={handleToggle}>{toggleShowRecipes ? "Show all recipes" : "Show only my recipes"}</Button>
            <Select
                mode="multiple"
                allowClear
                className={classes.input}
                placeholder="Filter by tags"
                onChange={handleChange}
                options={options}
            />
            <Input className={classes.input} placeholder={"Search by name"} onChange={handleSearch}/>
            <Button onClick={setOpenCreateModal.bind(this, true)}
                    className={classes.createButton} type="primary">Add new recipe</Button>
        </div>
    );
};

export default Filters;
