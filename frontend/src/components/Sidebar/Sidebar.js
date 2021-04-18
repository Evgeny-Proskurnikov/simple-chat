import React from 'react';

function Sidebar({ currentRoom }) {
  return (
    <div className='sidebar'>
      <p className='sidebar__text'>Users in room:</p>
      {currentRoom.users && 
        currentRoom.users.map((el) => <p className='sidebar__text' key={el.id}>{el.name}</p>)
      }
    </div>
  );
}

export default Sidebar;
