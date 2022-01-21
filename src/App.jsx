import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";

export default function App() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://randomuser.me/api/?results=10")
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

  const toggleReload = () => {
    setLoading(true);
    setTimeout(() => {
      fetchUsers();
    }, 3000);
  };

  if (loading === true) {
    return (
      <div className="lds-hourglass">
        <div></div>
      </div>
    );
  }
  if (fetchError === true) {
    return (
      <div>
        <p>ошибка сервера</p>
        <button className="reloadBtn" onClick={toggleReload}>
          Reload
        </button>
      </div>
    );
  }
  return (
    <>
      {openModal ? ReactDOM.createPortal(<div>1</div>, document.body) : null}

      <div className="App">
        <div>
          {users.map((user) => {
            return (
              <ul key={user.login.uuid}>
                <li className="listItem">
                  <img
                    src={user.picture.large}
                    alt={user.picture.large}
                    className="img"
                  />
                  <div className="info">
                    <p>Name: {user.name.first}</p>
                    <p>Email: {user.email}</p>
                    <button
                      onClick={() => toggleDeleteUser(user.login.uuid)}
                      className="deleteBtn">
                      delete
                    </button>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
        <button className="reloadBtn" onClick={toggleReload}>
          Reload
        </button>
      </div>
    </>
  );
}
