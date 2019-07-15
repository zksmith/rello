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
  const handleAddTask = text => {
    if (tasks[collectionId]) {
      addTask(collectionId, text);
    } else {
      createFirstTask(collectionId, text);
    }
  };

  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collectionName}</strong>
      </p>
      {tasks[collectionId] &&
        tasks[collectionId].map((task, index) => (
          <Task key={index} task={task} />
        ))}

      <button className='add-button' onClick={() => handleAddTask('teazd')}>
        + Add another card
      </button>
    </section>
  );
};

const mapStateToProps = state => ({
  tasks: state.board.tasks
});

const mapDispatchToProps = dispatch => ({
  addTask: (collectionId, task) =>
    dispatch(addTaskToCollection(collectionId, task)),
  createFirstTask: (collectionId, task) =>
    dispatch(createFirstTask(collectionId, task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
