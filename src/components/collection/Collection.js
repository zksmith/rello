import React, { useState } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

import { addTask } from '../../redux/board/boardActions';

import './Collection.scss';
import TaskList from './TaskList';

const Collection = ({ collectionName, collectionId, tasks, addTask }) => {
  const tasksForThisCollection = tasks[collectionId];

  const [taskAddInProgress, setTaskAddInProgress] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    //If there are no tasks for given collectionId then isEmptyCollection = true
    if (newTaskText)
      addTask(!tasksForThisCollection, collectionId, newTaskText);

    setTaskAddInProgress(false);
    setNewTaskText('');
  };

  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collectionName}</strong>
      </p>

      <TaskList collectionId={collectionId} tasks={tasksForThisCollection} />

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
  addTask: (isEmptyCollection, collectionId, task) =>
    dispatch(addTask(isEmptyCollection, collectionId, task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
