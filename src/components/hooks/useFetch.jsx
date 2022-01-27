// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (fetchUrl) => {
//     const [users, setUsers] = useState(null);
//     const [loading, setLoading] = useState(null);
//     const [fetchError, setFetchError] = useState(null);

//     const fetchUsers = () => {
//         axios
//             .get(fetchUrl)
//             .then(function (response) {
//                 setUsers(response.data.results);
//             })
//             .catch(function (error) {
//                 setFetchError(error.message);
//             })
//             .finally(function () {
//                 setLoading(false);
//             });
//     }

//     const toggleReload = () => {
//         setLoading(true);
//         setFetchError(null)
//         setTimeout(() => {
//             fetchUsers();
//         }, 2000);
//     };

//     useEffect(() => {
//         setLoading(true);
//         fetchUsers()
//     }, [fetchUrl]);


//     return {
//         users,
//         setUsers,
//         loading,
//         fetchError,
//         toggleReload
//     }
// }

// export { useFetch }