import React from 'react'

export default React.createContext({
  isAuthenticated: localStorage.getItem('token') != null ? true : false
})
