import { useEffect, useState } from "react";

export const usePagination = ({size = 10}: {size?: number}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(size)

    const navigateToPage = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        setPageSize(size)
    }, [size])

    return {
        pageSize,
        currentPage,
        navigateToPage
    }
}