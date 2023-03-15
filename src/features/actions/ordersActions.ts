import toastAlert from 'helpers/toastAlert';
import formatError from 'helpers/formatError';
import { IAction } from 'interfaces/actions';
import { ICreateOrder } from './../../interfaces/order.d';
import { AppDispatch } from 'features/store';
import * as ordersApi from "apis/orders/ordersApi"
import { ordersActions } from "features/slices/ordersSlice"

export const getOrdersAction = () => async (dispatch: AppDispatch) => {
    // dispatch(ordersActions.getOrders([]));
    
}

export const getUserOrdersAction = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await ordersApi.getOrdersApi()
        dispatch(ordersActions.getOrders(data.data));
    } catch (error) {

    } finally {
        
    }
}

export const addNewOrderAction = (actions: IAction, requestBody: ICreateOrder) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await ordersApi.createOrderApi(requestBody);
        dispatch(ordersActions.addNewOrder(data.data));
        actions.onSuccess(data.data);
        toastAlert('Ordered Successfully');
    } catch (error) {
        actions.onError('Something went wrong');
        toastAlert('Something Went Wrong', 'error', {
            autoClose: false
        });
    } finally {
        actions.onFinally();
    }
}