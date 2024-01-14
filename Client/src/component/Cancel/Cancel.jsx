import React from 'react'
import { Link } from 'react-router-dom'

function Cancel() {
  return (
      <div><h1>Su pago ha sido Cancelado </h1>
          <Link to={"/carrito"}
          >
          
         <button>Volver al Carrito</button>
          </Link>
      
      
      
      
      </div>
      
  )
}

export default Cancel