import React from 'react'

const Link = ({to, children}) => {
    const handleNavigation = (e)=>{
        e.preventDefault();
        window.history.pushState({}, "" , to);
    }   
  return (
    <a href={to} onClick={handleNavigation}>{children}</a>

  )
}

export default Link;