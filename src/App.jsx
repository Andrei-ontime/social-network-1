import { useState } from 'react';
import './App.css';
import ModalEdit from './components/ModalEdit';
import { useFetch } from './components/hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './components/store/asyncActions/fetchUsersAction';


export default function App() {
  const [filteredUserValue, setFilteredUserValue] = useState('');
  const [userEdit, setUserEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const fetchedUsers = useSelector(state => state.users)


  const { users, setUsers, loading, fetchError, toggleReload } = useFetch('https://randomuser.me/api/?results=20')



  const toggleDeleteUser = (id) => {
    setUsers([...users].filter((user) => user.login.uuid !== id));
  };

  const EditUserName = (changedUser) => {
    setUsers(users.map((user) => {
      if (user.login.uuid === changedUser.login.uuid) {
        return changedUser
      }
      return user
    }))
  }


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


  if (loading === true) {
    return (
      <div className='lds-hourglass'>
        <div></div>
      </div>
    );
  }

  return (
    <>
      <ModalEdit openModal={openModal} onSave={EditUserName} onClose={() => setUserEdit(null)} user={userEdit} setOpenModal={setOpenModal}>
      </ModalEdit>

      <div className='App'>
        <div><button onClick={() => { dispatch(fetchUsers) }} >FETCH USERS</button>
          <button onClick={() => { console.log(fetchedUsers) }}>SHOW  USERS</button>
        </div>
        <div>
          <input
            placeholder='Filter users'
            className='FilterUsers'
            onChange={(event) => {
              setFilteredUserValue(event.target.value);
            }}
          />
          {(users != null) && users.filter((user) => {
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