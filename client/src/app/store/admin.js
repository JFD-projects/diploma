import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import adminService from "../services/admin.service";
import { generateAuthError } from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken() && localStorageService.getAdmin()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { adminId: localStorageService.getUserId() },
          isLoggedIn: true,
        //   dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
        //   dataLoaded: false
      };

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        adminRequested: (state) => {
            state.isLoading = true;
        },
        adminReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        adminRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
            state.error = null;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        adminLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        // adminUpdateSuccessed: (state, action) => {
        //     state.entities[
        //         state.entities.findIndex((u) => u._id === action.payload._id)
        //     ] = action.payload;
        // }
    }
});

const { reducer: adminReducer, actions } = adminSlice;
const {
    adminRequested,
    adminReceived,
    adminRequestFailed,
    authRequestFailed,
    authRequestSuccess,
    adminLoggedOut,
    // adminUpdateSuccessed,
} = actions;

const authRequested = createAction("admin/authRequested");
// const adminUpdateFailed = createAction("admin/adminUpdateFailed");
// const adminUpdateRequested = createAction("admin/adminUpdateRequested");

export const currentAdminData = () => async dispatch => {
    dispatch(adminRequested())
    try{
        const data = await adminService.getCurrentAdmin();
        dispatch(adminReceived(data))
    } catch (error){
        dispatch(adminRequestFailed(error.message))
    }
}

export const signIn =
    (payload, redirect) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await adminService.login({ email, password });
            localStorageService.setTokens({...data, userId: data.adminId});
            dispatch(currentAdminData())
            dispatch(authRequestSuccess({ adminId: data.adminId }));            
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

// export const signUp = (payload, redirect) =>
//     async (dispatch) => {
//         dispatch(authRequested());
//         try {
//             const data = await adminService.register(payload);
//             localStorageService.setTokens(data);
//             dispatch(authRequestSuccess({ adminId: data.adminId }));
           
//             // dispatch(currentAdminData())
//             history.push(redirect);
//         } catch (error) {
//             dispatch(authRequestFailed(error.message));
//         }
//     };

export const logOutAdmin = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(adminLoggedOut());
    history.push("/");
};

// export const updateadmin = (payload) => async (dispatch) => {
//     dispatch(adminUpdateRequested());
//     try {
//         const { content } = await adminService.update(payload);
//         dispatch(adminUpdateSuccessed(content));
//         history.push(`/admins/${content._id}`);
//     } catch (error) {
//         dispatch(adminUpdateFailed(error.message));
//     }
// };


export const getCurrentAdminData = () => (state) => state.admin.entities;

export const getIsAdminLoggedIn = () => (state) => state.admin.isLoggedIn;
// export const getDataStatus = () => (state) => state.admins.dataLoaded;
export const getAdminLoadingStatus = () => (state) => state.admin.isLoading;
// export const getCurrentAdminId = () => (state) => state.admin.auth?.adminId;
export const getAdminAuthErrors = () => (state) => state.admin.error;

export default adminReducer;