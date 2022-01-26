import { getUsersAction, setLoadingError } from "../reducers/userReducer"

export const fetchUsers = (dispatch) => {

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => dispatch(getUsersAction(json)))
        .catch(er => {
            dispatch(setLoadingError(er))
        })

}

