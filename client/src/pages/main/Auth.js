import React, { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from './../../hooks/message.hook';
import './auth.css'

const serverUrl = 'http://localhost:8080'

export const AuthCard = () => {
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '', password: '', name: ''
  })

  useEffect(() => {
    message(error)
    clearError();
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request(`${serverUrl}/api/auth/register`, 'POST', { ...form })
      message(data.message);
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request(`${serverUrl}/api/auth/login`, 'POST', { ...form })
      message(data.message);
    } catch (e) { }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Registration</span>
          </div>
          <div>
            <div className="input-field">
              <input
                placeholder=" Enter email"
                id="email"
                type="text"
                name="email"
                className="card-input"
                onChange={changeHandler}
              />

              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input placeholder="Enter password"
                id="password"
                type="password"
                name="password"
                className="card-input"
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field">
              <input placeholder="Enter name or nickname"
                id="nickname"
                type="text"
                name="name"
                className="card-input"
                onChange={changeHandler}
              />
              <label htmlFor="password">Name or Nikname</label>
            </div>
          </div>
          <div className="card-action">
            <button
              className='btn yellow darken-4 signIn-btn'
              onClick={loginHandler}
              disabled={loading}
            >
              Sing In
            </button>
            <button
              className='btn grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}
            >Registration
             </button>

          </div>
        </div>
      </div>
    </div>
  )
}