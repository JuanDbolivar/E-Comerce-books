import "./RegisterLogin.css";
import "bulma/css/bulma.css";
import axios from "axios";
import { url } from "../../values/values";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setIdBooks,
  unSetUser,
} from "../../redux/reducers/Users/UserSlice";
import { auth, provider } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";

function RegisterLogin() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);

  const [emailRegistrer, setEmailRegistrer] = useState("");
  const [passwordRegistrer, setPasswordRegistrer] = useState("");
  const [nameRegistrer, setNameRegistrer] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [ingresar, setIngresar] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const active = isModal ? "is-active" : "";

  const registerHandler = async () => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        emailRegistrer,
        passwordRegistrer
      );
      if (credentials) {
        await updateProfile(auth.currentUser, {
          displayName: nameRegistrer,
        });
        const id = credentials.user.uid;
        const name = credentials.user.displayName;
        const email = credentials.user.email;
        try {
          const { data } = await axios.post(`${url}user/`, {
            id,
            name,
            email,
          });
          if (data) {
            const banned = data.banned;
            const purchased_books = data.purchased_books;
            dispatch(setUser({ id, name, email, banned }));
            if (purchased_books) {
              dispatch(setIdBooks({ purchased_books }));
            }
          }
        } catch (error) {
          console.log("errorAxiosPost", error.message);
        }
        if (name) {
          setEmailRegistrer("");
          setPasswordRegistrer("");
          setNameRegistrer("");
        }
      }
    } catch (error) {
      console.log("errorMessageRegister", error.message);
    }
  };

  const loginHandler = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailLogin,
        passwordLogin
      );
      if (user) {
        const id = user.user.uid;
        const name = user.user.displayName;
        const email = user.user.email;
        if (id) {
          try {
            const { data } = await axios(
              `${url}user/?search=${id}`
            );
            if (data) {
              const banned = data.banned;
              const purchased_books = data.purchased_books;
              dispatch(setUser({ id, name, email, banned }));
              if (purchased_books) {
                dispatch(setIdBooks({ purchased_books }));
              }
            }
          } catch (error) {
            console.log("errorAxiosGet", error.message);
          }
        }
        if (name) {
          setEmailLogin("");
          setPasswordLogin("");
        }
      }
    } catch (error) {
      console.log("errorMessageSignIn", error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      if (user) {
        const id = user.user.uid;
        const name = user.user.displayName;
        const email = user.user.email;
        if (id) {
          try {
            const { data } = await axios(
              `${url}user/?search=${id}`
            );
            if (data.length !== 0) {
              console.log("data", data);
              const banned = data.banned;
              const purchased_books = data.purchased_books;
              dispatch(setUser({ id, name, email, banned }));
              if (purchased_books) {
                dispatch(setIdBooks({ purchased_books }));
              }
            } else {
              try {
                const { data } = await axios.post(
                  `${url}user/`,
                  {
                    id,
                    name,
                    email,
                  }
                );
                if (data) {
                  console.log("data2", data);
                  try {
                    const { data } = await axios(
                      `${url}user/?search=${id}`
                    );
                    if (data) {
                      console.log("data3", data);
                      const banned = data.banned;
                      const purchased_books = data.purchased_books;
                      dispatch(setUser({ id, name, email, banned }));
                      if (purchased_books) {
                        dispatch(setIdBooks({ purchased_books }));
                      }
                    }
                  } catch (error) {
                    console.log("errorAxiosLastRequest", error.message);
                  }
                }
              } catch (error) {
                console.log("errorAxiosPostGoogle", error.message);
              }
            }
          } catch (error) {
            console.log("errorAxiosGetGoogle ", error.message);
          }
        }
      }
    } catch (error) {
      console.log("errorMessageGoogle", error.message);
    }
  };

  const logoutHandler = async () => {
    await signOut(auth);
    dispatch(unSetUser());
  };

  return (
    <>
      {name ? (
        <>
          <h3 className="bienvenido">Bienvenido, {name} </h3>
          <button className="buttonLogout" onClick={logoutHandler}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
           className='button is-light'
            onClick={() => {
              setIsModal(!isModal);
            }}
          >
            Ingresar
          </button>
          <div className={`modal ${active}`}>
            <div className="modal-background" />
            <div className="modal-card">
              <button
                onClick={() => {
                  setIsModal(!isModal);
                  setIngresar(false);
                }}
                className="delete is-medium"
                aria-label="close"
              />
              {!ingresar ? (
                <>
                  <hr />
                  <h1>REGISTRARSE</h1>
                  <br />
                  <label htmlFor="emailRegis">Correo: </label>
                  <input
                    id="emailRegis"
                    type="text"
                    name="email"
                    onChange={(event) => {
                      setEmailRegistrer(event.target.value);
                    }}
                  />
                  <label htmlFor="passwordRegis">Contraseña: </label>
                  <input
                    id="passwordRegis"
                    type="password"
                    name="password"
                    onChange={(event) => {
                      setPasswordRegistrer(event.target.value);
                    }}
                  />
                  <label htmlFor="nombreRegis">Nombre: </label>
                  <input
                    id="nombreRegis"
                    type="nombre "
                    name="nombre "
                    onChange={(event) => {
                      setNameRegistrer(event.target.value);
                    }}
                  />
                  <br />
                  <button className="buttonLogin" onClick={registerHandler}>
                    Registrarse
                  </button>
                  <br />
                  <button className="buttonLogin" onClick={loginWithGoogle}>
                    Ingresar con Google
                  </button>
                  <h4 className="O">O</h4>
                </>
              ) : (
                <>
                  <hr />
                  <h1>INGRESAR</h1>
                  <br />
                  <label htmlFor="emailLog">Correo: </label>
                  <input
                    id="emailLog"
                    type="text"
                    name="email"
                    onChange={(event) => {
                      setEmailLogin(event.target.value);
                    }}
                  />
                  <label htmlFor="passwordLog">Contraseña: </label>
                  <input
                    id="passwordLog"
                    type="password"
                    name="password"
                    onChange={(event) => {
                      setPasswordLogin(event.target.value);
                    }}
                  />
                  <br />
                  <button className="buttonLogin" onClick={loginHandler}>
                    Ingresar
                  </button>
                  <br />
                </>
              )}
              <button
                className="buttonLogin"
                onClick={() => {
                  setIngresar(!ingresar);
                }}
              >
                {ingresar ? "Volver" : "Ingresar con correo"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RegisterLogin;
