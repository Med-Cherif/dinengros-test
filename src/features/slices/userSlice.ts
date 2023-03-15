import { HYDRATE } from 'next-redux-wrapper';
import { NextResponse } from 'next/server';
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from 'cookies-next'
import { IUser } from 'interfaces/user';

const initialState: {
    userData: IUser,
    accessToken: string | null
} = {
    userData: {
        id: null,
        last_name: '',
        is_company: false,
        phone: '',
        email: '',
        first_name: '',
        profile: {
            company: '',
            company_number: '',
            matricule: '',
            phone: '',
            region: {
                delivery_days: [],
                description: '',
                id: 0,
                name: ''
            },
            user_group: {
                code: '',
                description: '',
                id: 0,
                name: ''
            }
        },
        address: {
            city: '',
            street_name: '',
            zip_code: ''
        },
        address_facturation: {
            city: '',
            name: '',
            phone: '',
            street_name: '',
            zip_code: ''
        }
    },
    accessToken: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {
        authSuccess: (state, action) => {
            state.accessToken = action.payload.token
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.accessToken = null
            state.userData = {
                ...initialState.userData
            }
        },
        updateUserProfile: (state, { payload }) => {
            state.userData = {
                ...state.userData,
                first_name: payload.first_name,
                last_name: payload.first_name,
                phone: payload.phone,
                email: payload.email,
                address: {
                    city: payload.city,
                    street_name: payload.street_name,
                    zip_code: payload.zip_code,
                }
            }
        },
        updateUserAddress: (state, {payload}) => {
            state.userData = {
                ...state.userData,
                address_facturation: {
                    name: payload?.name || '',
                    phone: payload?.phone || '',
                    street_name: payload?.street_name || '',
                    city: payload?.city || '',
                    zip_code: payload?.zip_code || ''
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(HYDRATE, (state, action: any) => {
            return {
                ...state,
                ...action.payload.users,
              };
        })
    },
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    
    //     }
    // }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;
