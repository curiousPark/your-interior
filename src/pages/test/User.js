import React, { useReducer } from 'react'

const initialUserState = {
  isAdmin: false,
  nickname: '',
  email: ''
}

const userReducer = (state, action) => {
    console.log(state);
  const user = state;
  switch (action.type) {
    case 'reset': {
      return initialUserState
    }
    case 'toggleToBeAdmin': {
      return { ...user, isAdmin: !state.isAdmin }
    }
    case 'updateNickname': {
      return { ...user, nickname: action.nickname }
    }
    case 'updateEmail': {
      return { ...user, email: action.email }
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`)
    }
  }
}

const User = () => {
  const [user, dispatchUser] = useReducer(userReducer, initialUserState)

  let label = 'user mode'
  if (user.isAdmin) {
    label = 'admin mode'
  }

  const reset = () => dispatchUser({ type: 'reset' })
  const toggleToBeAdmin = () => dispatchUser({ type: 'toggleToBeAdmin' })
  const updateNickname = event => dispatchUser({ type: 'updateNickname', nickname: event.target.value })
  const updateEmail = event => dispatchUser({ type: 'updateEmail', email: event.target.value })

  return (
    <div>
      <label>{label}</label>
      <h1>{user.nickname}</h1>
      <h3>{user.email}</h3>
      <button onClick={reset}>RESET</button>
      <button onClick={toggleToBeAdmin}>toggle {label}</button>
      <input type='text' onChange={updateNickname} />
      <input type='text' onChange={updateEmail} />
    </div>
  )
}

export default User;