import React from 'react';

import './Task.scss';

const Task = ({ task }) => {
  return (
    <div className='task'>
      <p>{task.text}</p>
    </div>
  );
};

export default Task;
