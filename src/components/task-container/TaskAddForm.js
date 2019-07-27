import React, { useState } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';

import { addTask } from '../../redux/actions/boardActions';
import './TaskAddForm.scss';

const TaskAddButton = ({ addTask, setTaskAddInProgress }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = e => {
    e.preventDefault();
    if (newTaskText) addTask({ subject: newTaskText, content: '' });

    setTaskAddInProgress(false);
    setNewTaskText('');
  };
  return (
    <form onSubmit={handleAddTask} className='task-add-form'>
      <input
        value={newTaskText}
        onChange={e => setNewTaskText(e.target.value)}
        placeholder='Task Subject'
        autoFocus
      />
      <button className='add-button' type='submit'>
        Add
      </button>
      <span
        className='close-button'
        onClick={() => setTaskAddInProgress(false)}
      >
        &#9932;
      </span>
    </form>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTask: task => {
    const taskId = uuidv4();
    dispatch(addTask(ownProps.collectionId, taskId, task));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(TaskAddButton);
