
interface IArguments {
    data?: any[],
    perPage?: number,
    page?: number,
}

export default function usePaginationData({
    data = [],
    perPage = 5,
    page = 1,
}: IArguments) {
    const from = (page - 1) * perPage
    const to = page * perPage
    // console.log({from, to})
    return {
        list: data.slice(from, to),
        totalPages: Math.ceil(data.length / perPage)
    }
}