import toastAlert from "helpers/toastAlert";
import { AppDispatch } from "features/store";
import {
  logout,
  registerApi,
  updateUserAddressApi,
  updateUserPasswordApi,
  updateUserProfileApi,
} from "./../../apis/users/authApi";
import { RootState } from "features/store";
import { IUserLogin, IUserRegister } from "./../../interfaces/user.d";
import { userActions } from "features/slices/userSlice";
import { IAction } from "interfaces/actions";
import { login } from "apis/users/authApi";
import formatError from "helpers/formatError";
import { setCookie, deleteCookie } from "cookies-next";
import formatUserData from "helpers/formatUserData";

export const loginAction =
  (actions: IAction, loginData: IUserLogin) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      actions?.onLoading();
      const { data } = await login(loginData);
      const { token, user } = data.data;
      const userData = formatUserData(user);
      dispatch(userActions.authSuccess({ token: token, userData }));
      setCookie("front_token", data.data.token);
      actions?.onSuccess();
    } catch (error) {
      actions?.onError(error);
    } finally {
      actions?.onFinally();
    }
  };

export const registerAction =
  (actions: IAction, registerData: IUserRegister) =>
  async (dispatch: AppDispatch) => {
    actions.onLoading();
    try {
      await registerApi(registerData);
      actions.onSuccess();
    } catch (error) {
      actions.onError(formatError(error));
    } finally {
      actions.onFinally();
    }
  };

export const logoutAction =
  (actions: IAction) => async (dispatch: AppDispatch) => {
    try {
      await logout();
    } finally {
      actions.onSuccess();
      deleteCookie("front_token");
      dispatch(userActions.logout());
    }
  };

export const updateUserProfileAction =
  (actions: IAction, profileData: any) => async (dispatch: AppDispatch) => {
    try {
      await updateUserProfileApi(profileData);
      dispatch(userActions.updateUserProfile(formatUserData(profileData)));
      actions.onSuccess();
    } catch (error) {
      actions.onError(formatError(error));
    } finally {
      actions.onFinally();
    }
  };

export const updateUserAddressAction =
  (actions: IAction, addressData: any) => async (dispatch: AppDispatch) => {
    try {
      await updateUserAddressApi(addressData);
      dispatch(userActions.updateUserAddress(addressData));
      toastAlert("Delivery Address Updated Successfully");
    } catch (error) {
      actions.onError(formatError(error));
    } finally {
      actions.onFinally();
    }
  };

export const updateUserPasswordAction =
  (actions: IAction, data: any) => async (dispatch: AppDispatch) => {
    try {
      await updateUserPasswordApi(data);
      toastAlert("Password Updated Successfully");
    } catch (error) {
      actions.onError(formatError(error));
    } finally {
      actions.onFinally();
    }
  };
