import React from 'react'
import Digit from './Digit';

const rows:any = [];
for (let i = 0; i < 30; i++) {
    rows.push(<Digit key={i}/>);
}

const Keyboard = () => {
  return (
    <>
      <div className='grid grid-cols-10 grid-rows-3'>
        {rows}  
      </div>
    </>
  )
}

export default Keyboard