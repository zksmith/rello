import React from 'react';
import { connect } from 'react-redux';

import {
  addTaskToCollection,
  createFirstTask
} from '../../redux/board/boardActions';

import Task from '../task/Task';

import './Collection.scss';

const Collection = ({
  collectionName,
  collectionId,
  tasks,
  addTask,
  createFirstTask
}) => {
  const tasksKey = `${collectionId}_tasks`;

  const handleAddTask = (tasksKey, text) => {
    if (tasks[tasksKey]) {
      addTask(tasksKey, text);
    } else {
      createFirstTask(tasksKey, text);
    }
  };

  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collectionName}</strong>
      </p>
      {tasks[tasksKey] &&
        tasks[tasksKey].map((task, index) => <Task key={index} task={task} />)}

      <button
        className='add-button'
        onClick={() => handleAddTask(tasksKey, 'teazd')}
      >
        + Add another card
      </button>
    </section>
  );
};

const mapStateToProps = state => ({
  tasks: state.board.tasks
});

const mapDispatchToProps = dispatch => ({
  addTask: (tasksKey, task) => dispatch(addTaskToCollection(tasksKey, task)),
  createFirstTask: (tasksKey, task) => dispatch(createFirstTask(tasksKey, task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
