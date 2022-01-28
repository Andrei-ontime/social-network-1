import { useState, useEffect } from 'react';
import './App.css';
import ModalEdit from './components/ModalEdit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, editUser } from './components/store/slices/fetchUsersAction';
import UserList from './components/UserList';
import User from './components/User';


export default function App() {
  const dispatch = useDispatch();
  const fetchedUsers = useSelector(state => state.users.users)
  const fetchError = useSelector(state => state.users.error)
  const fetchLoading = useSelector(state => state.users.loading)


  const [userEdit, setUserEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggleReload = () => {
    dispatch(fetchUsers())
    // setFilteredUserValue('')
  }

  // const toggleDeleteUser = (id) => {
  //   dispatch(deleteUser(id))

  // };

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  if (fetchError) {
    return (
      <div>
        <p>{fetchError}</p>
        <button className='ReloadBtn' onClick={toggleReload}>
          Reload
        </button>
      </div>
    );
  }


  if (fetchLoading === true) {
    return (
      <div className='lds-hourglass'>
        <div></div>
      </div>
    );
  }

  return (
    <>
      <ModalEdit openModal={openModal} onClose={() => setUserEdit(null)} user={userEdit} setOpenModal={setOpenModal}>
      </ModalEdit>

      <div className='App'>
        <div>


          <UserList ></UserList>
          <button className='ReloadBtn' onClick={toggleReload}>
            Reload
          </button>
        </div>
      </div>
    </>
  );
}