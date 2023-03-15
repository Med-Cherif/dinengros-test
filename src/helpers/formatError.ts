import { IObject } from "interfaces/object"

export default function formatError(err?: any) {
    if (typeof err?.response?.data?.error === "string" && typeof err?.response?.data?.message === "string") {
        return {
            [err?.response?.data?.error]: [err?.response?.data?.message]
        }
    }
    return err?.response?.data?.errors || err?.response?.data?.error || err?.response?.data?.message || err?.message || 'Something went wrong'
    // if (!err) return 'Something went wrong'
    // if (!Array.isArray(err?.response?.data?.errors)&& typeof err?.response?.data?.errors === 'object') {
    //     let obj: IObject = {}
    //     Object.entries(err?.response?.data?.errors).forEach(([key, value]) => {
    //         obj[key] = (value as string[]).join(', ')
    //     })
    // }    
}