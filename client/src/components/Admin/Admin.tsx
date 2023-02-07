import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { LOGOUT } from '../../common/redux/actions/actionTypes';
import { signInAdmin } from '../../common/redux/actions/auth';
import AdminTools from '../AdminTools/AdminTools';
import decode from "jwt-decode";
const Admin = () => {
    const [{userName, password}, setUserInput] = useState<{userName: string, password:string}>({userName:'', password:''});

    const dispatch = useDispatch<any>();

    const handleTextInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserInput({
            userName,
            password,
            [e.target.name]: e.target.value,
        });
      };

      const handleFormSubmit: React.MouseEventHandler<HTMLDivElement> = () => {
        dispatch(
            signInAdmin(
              {
                password,
                userName,
              }
            )
          );
          setTimeout(() => {
            setUser(JSON.parse(localStorage.getItem("profile") as string))
          }, 1000);
        }

    const [user, setUser] = useState<any>(
        JSON.parse(localStorage.getItem("profile") as string)
    );

    useEffect(() => {
        const token = user?.token;
        if (token) {
          const decodedToken: object | any = decode(token);
          if (decodedToken.exp * 1000 + 800100400 < new Date().getTime())
            dispatch({ type: LOGOUT });
        }
        if (!token) {
            dispatch({ type: LOGOUT });
        }
      }, []);
      
    return(
    <>
    {!user ?  
    <div className="admin">
            <div className="admin__wrapper">
                <div className="admin__wrapper__headline">
                    <h1>Zarządzanie sklepem</h1>
                    <h2>Zaloguj się,</h2>
                    <h2>Dodawaj, edytuj i usuwaj przedmioty w swoim sklepie</h2>
                    <div className="borders">
                        <div className="border"></div>
                    </div>
                </div>
                <div className="admin__wrapper__content">
                    <div className="admin__wrapper__content__login">
                        <div className='admin__wrapper__content__login__input'>
                            <label htmlFor="userName">Login</label>
                            <input onChange={(e) => handleTextInput(e)} type="text" name='userName' value={userName}/>
                        </div>
                        <div className='admin__wrapper__content__login__input'>
                            <label htmlFor="password">Hasło</label>
                            <input onChange={(e) => handleTextInput(e)} type="password" name='password' value={password}/>
                        </div>
                        <div onClick={handleFormSubmit} className='btn'>
                            <button>ZALOGUJ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : 
        <AdminTools />
        }
    </>
    )
}

export default Admin