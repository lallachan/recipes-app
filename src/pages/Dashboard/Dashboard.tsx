import React, {useState} from "react";
import {Alert, Pagination} from "antd";
import classes from "./style.module.css";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import CreateModal from "../../components/CreateModal/CreateModal";
import {useUserData} from "../../hooks/userState";
import Header from "../../components/Header/Header";
import {Recipe} from "../../components/RecipeCard/types";
import Filters from "../../components/Filters/Filters";
import {useAllRecipes} from "../../hooks/useRecipes";
import RecipeList from "../../components/RecipeList/RecipeList";
import {useFilters} from "../../hooks/useFilters";
import {usePagination} from "../../hooks/usePagination";


const Dashboard = () => {
    const [openDetails, setOpenDetails] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [toggleShowMyRecipes, setToggleShowMyRecipes] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();

    const [tagsToFilter, setTagsToFilter] = useState<string[]>([]);
    const [searchName, setSearchName] = useState("");

    const {data: user} = useUserData();
    const userId = user?.data?.appUser?.id;


    const {data, isError, error, isLoading, isFetching} = useAllRecipes();
    const {recipes} = useFilters(data?.data?.recipes, toggleShowMyRecipes, tagsToFilter, userId, searchName);
    const {paginatedItems, currentPage, totalItems, itemsPerPage, setCurrentPage} = usePagination(recipes)

    const allTags: string[] = Array.from(new Set(recipes.map((recipe: Recipe) => recipe.tags).flat()));


    const handleSelectRecipe = async (recipe: Recipe) => {
        setOpenDetails(true);
        setSelectedRecipe(recipe);
    };


    if(isError) { // @ts-ignore
        return <Alert message={error.message}/>
    }

    return (
        <>
            <div className={classes.parentWrapper}>
                <Header />
                <Filters setSearchName={setSearchName} setTagsToFilter={setTagsToFilter}
                         setOpenCreateModal={setOpenCreateModal.bind(this, true)}
                         tags={allTags}
                         toggleShowRecipes={toggleShowMyRecipes}
                         handleToggle={setToggleShowMyRecipes.bind(this, prevState => !prevState)}/>
                <div className={classes.parent}>
                    <RecipeList isLoading={isLoading} isFetching={isFetching}
                                paginatedItems={paginatedItems}
                                handleSelectRecipe={handleSelectRecipe}/>
                </div>

                <Pagination
                    className={classes.pagination}
                    current={currentPage}
                    total={totalItems}
                    pageSize={itemsPerPage}
                    onChange={setCurrentPage}
                />
                <DetailsModal recipe={selectedRecipe} open={openDetails}
                              onClose={setOpenDetails.bind(this, false)}/>
                <CreateModal open={openCreateModal} onClose={setOpenCreateModal.bind(this, false)}/>
            </div>
        </>
    );
};

export default Dashboard;
