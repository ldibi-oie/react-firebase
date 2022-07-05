import React from 'react'

export default function User() {
    const name = () => {
        var p = localStorage.getItem('user')

    };
  return (
    <div>Welcome {{ name }} </div>
  )
}
