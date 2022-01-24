import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import ModalEdit from './components/ModalEdit';

export default function App() {
  const [users, setUsers] = useState();
  const [filteredUserValue, setFilteredUserValue] = useState('');
  const [userEdit, setUserEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [openModal, setOpenModal] = useState(false);




  const fetchUsers = () => {
    setLoading(true);
    axios
      .get('https://randomuser.me/api/?results=10')
      .then(function (response) {
        setUsers(response.data.results);
      })
      .catch(function (error) {
        setFetchError(true);
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };




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

  const toggleReload = () => {
    setLoading(true);
    setTimeout(() => {
      fetchUsers();
    }, 3000);
  };

  useEffect(() => {

  }, [filteredUserValue])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading === true) {
    return (
      <div className='lds-hourglass'>
        <div></div>
      </div>
    );
  }
  if (fetchError === true) {
    return (
      <div>
        <p>ошибка сервера</p>
        <button className='ReloadBtn' onClick={toggleReload}>
          Reload
        </button>
      </div>
    );
  }

  return (
    <>
      <ModalEdit openModal={openModal} onSave={EditUserName} onClose={() => setUserEdit(null)} user={userEdit} setOpenModal={setOpenModal}>
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
          {users.length && users.filter((user) => {
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