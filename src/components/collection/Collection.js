import React, { useState } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

import {
  addTaskToCollection,
  createFirstTask
} from '../../redux/board/boardActions';

import './Collection.scss';
import TaskList from './TaskList';

const Collection = ({
  collectionName,
  collectionId,
  tasks,
  addTask,
  createFirstTask
}) => {
  const [taskAddInProgress, setTaskAddInProgress] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = e => {
    if (tasks[collectionId]) {
      addTask(collectionId, newTaskText);
    } else {
      createFirstTask(collectionId, newTaskText);
    }
    setTaskAddInProgress(false);
    setNewTaskText('');
  };

  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collectionName}</strong>
      </p>

      <TaskList collectionId={collectionId} tasks={tasks[collectionId]} />

      {taskAddInProgress ? (
        <Textarea
          style={{ width: '100%' }}
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          onBlur={handleAddTask}
        />
      ) : (
        <button
          className='add-button'
          onClick={() => setTaskAddInProgress(true)}
        >
          + Add another card
        </button>
      )}
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
