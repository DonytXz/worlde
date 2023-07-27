import React from 'react'
import Letter from './Letter';

const Board = () => {

const rows = [];
for (let i = 0; i < 25; i++) {
    rows.push(<Letter key={i}/>);
}

  return (
    <>
        <div className='grid grid-cols-5 grid-rows-5'>
            {rows}
        </div>
    </>
  )
}

export default Board