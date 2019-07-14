import React from 'react';

import './Task.scss';

const Task = ({ item }) => {
  return (
    <div className='task'>
      <p>{item.text}</p>
    </div>
  );
};

export default Task;
