import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';
import { sendTranslation } from '../../../assets/constants/static.translations';
import './auth.css'

const serverUrl = 'http://localhost:8080'

export const AuthCard = ({ active, setAcive }) => {
  const auth = useContext(AuthContext)
  const language = useSelector((store) => store.language)
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '', password: '', name: '', avatar: null
  })

  useEffect(() => {
    message(error)
    clearError();
  }, [error, message, clearError])

  const avatarHandler = (event) => {
    const file = event.target.files[0];
    setForm({ ...form, avatar: file })
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    console.log('trying to register')

    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('name', form.name);
      if (form.avatar) {
        formData.append('avatar', form.avatar, form.avatar.name)
      } else {
        formData.append('avatar', "")
      }
      const data = await request(`${serverUrl}/api/auth/register`, 'POST', formData, {}, false)
      message(data.message);
    } catch (e) {
      console.log(e);
    }
  }

  const loginHandler = async () => {

    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('password', form.password);
      const data = await request(`${serverUrl}/api/auth/login`, 'POST', formData, {}, false)
      auth.login(data.token, data.userId, data.avatar)
      setAcive(!active)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="shadow" onClick={() => setAcive(!active)} style={active ? { display: 'block' } : { display: 'none' }} />
      <div className="auth-card-block" style={active ? { left: '-0' } : { left: '-8000px' }}>
        <div className="row">
          <div className="col offset-3">
            <div className="card blue darken-1 auth-card">
              <div className="card-content white-text">
                <span className="card-title">{sendTranslation('regis')[language]}</span>
              </div>
              <div>
                <div className="input-field">
                  <input
                    placeholder={sendTranslation('emailEnt')[language]}
                    id="email"
                    type="text"
                    name="email"
                    className="card-input"
                    onChange={changeHandler}
                  />

                  <label htmlFor="email">{sendTranslation('email')[language]}</label>
                </div>
                <div className="input-field">
                  <input placeholder={sendTranslation('passEnt')[language]}
                    id="password"
                    type="password"
                    name="password"
                    className="card-input"
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">{sendTranslation('pass')[language]}</label>
                </div>
                <div className="input-field">
                  <input placeholder={sendTranslation('nickNameEnt')[language]}
                    id="nickname"
                    type="text"
                    name="name"
                    className="card-input"
                    onChange={changeHandler}
                  />
                  <label htmlFor="login">{sendTranslation('nickName')[language]}</label>
                </div>
                <div className="input-field">
                  <input placeholder="Set your photo "
                    accept="image/jpeg"
                    id="Photo"
                    type="file"
                    name="avatar"
                    className="card-input"
                    onChange={avatarHandler}
                  />
                </div>
              </div>
              <div className="card-action">
                <button
                  className='btn yellow darken-4 signIn-btn'
                  onClick={loginHandler}
                  disabled={loading}
                >
                  {sendTranslation('signInBtn')[language]}
                </button>
                <button
                  className='btn grey lighten-1 black-text'
                  onClick={registerHandler}
                  disabled={loading}
                >{sendTranslation('regBtn')[language]}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}