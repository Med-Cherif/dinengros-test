export interface IAction {
    onLoading?: () => void
    onSuccess?: (data?: any) => void
    onError?: (error: any) => void
    onFinally?: () => void
}