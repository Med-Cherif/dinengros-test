import { getAllCategories } from "apis/categories/categoriesApi";
import { categoryActions } from "features/slices/categoriesSlice";
import { AppDispatch } from "features/store";

export const getCategoriesAction = () => async (dispatch: AppDispatch) => {
    try {
        const { data: { data: categories }} = await getAllCategories();
        dispatch(categoryActions.setCategories(categories));
    } catch (error) {
        console.log(error);
    }
}
