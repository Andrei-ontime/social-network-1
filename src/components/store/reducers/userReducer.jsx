const defaultState = {
    users: []
}

const SET_ERROR = 'SET_ERROR';
const GET_USERS = 'GET_USERS';

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return { ...state, unuqieId: action.unuqieId, users: [...state.users, ...action.payload] }

        default:
            return state;
    }


}

export const getUsersAction = (payload) => ({ type: GET_USERS, payload })
export const setLoadingError = (error) => ({ type: SET_ERROR, payload: error.message })