import {useEffect, useState} from "react";

export const usePagination = (items: any[], itemsPerPage: number = 15) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1)
    }, [items]);

    const totalItems = items.length || 0;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedItems = items.slice(startIndex, endIndex) || [];

    return {
        paginatedItems,
        currentPage,
        totalItems,
        itemsPerPage,
        setCurrentPage
    };

};
