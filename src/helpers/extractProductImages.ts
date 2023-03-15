import { IProduct } from "interfaces/product";
import { imgFileExtensions } from "@utils/imgFileExtensions";

export const extractProductImages = (product: IProduct) => {
    if (!product) return []
    return product.files?.filter(file => imgFileExtensions.includes(file.file_info.ext))?.map((file) => `${file.file_info.uri}/${file.file_info.name}`)
}