import { useState, useEffect } from 'react';
import './App.css';
import ModalEdit from './components/ModalEdit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, editUser } from './components/store/slices/fetchUsersAction';


export default function App() {
  const dispatch = useDispatch();
  const fetchedUsers = useSelector(state => state.users.users)
  const fetchError = useSelector(state => state.users.error)
  const fetchLoading = useSelector(state => state.users.loading)

  const [filteredUserValue, setFilteredUserValue] = useState('');
  const [userEdit, setUserEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggleReload = () => {
    dispatch(fetchUsers())
    setFilteredUserValue('')
  }

  const toggleDeleteUser = (id) => {
    dispatch(deleteUser(id))

  };

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

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
          <input
            placeholder='Filter users'
            className='FilterUsers'
            onChange={(event) => {
              setFilteredUserValue(event.target.value);
            }}
          />
          {(fetchedUsers.length !== 0) && fetchedUsers.filter((user) => {
            if (!filteredUserValue) {
              return true
            }
            return user.name.first.toLowerCase().includes(filteredUserValue)
          }).map((user) => {
            return (
              <ul key={user.login.uuid}>
                <li className='ListItem'>
                  <img
                    src={user.picture.large}
                    alt={user.picture.large}
                    className='Img'
                  />
                  <div className='Info'>
                    <p>Name: {user.name.first}</p>
                    <p>Email: {user.email}</p>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setUserEdit(user);
                      }}
                      className='ChangeInfoBtn'
                    >
                      change info
                    </button>
                    <button
                      onClick={() => toggleDeleteUser(user.login.uuid)}
                      className='DeleteBtn'
                    >
                      delete
                    </button>
                  </div>
                </li>
              </ul>
            );
          })}
          <button className='ReloadBtn' onClick={toggleReload}>
            Reload
          </button>
        </div>
      </div>
    </>
  );
}