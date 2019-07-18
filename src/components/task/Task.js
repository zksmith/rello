import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { removeTaskId } from '../../redux/actions/collectionActions';
import { deleteTask } from '../../redux/actions/boardActions';

import './Task.scss';

const Task = ({ task: { id, subject }, collectionId, index, deleteTask }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className='task'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{subject}</p>
          <span
            className='task-delete'
            onClick={() => deleteTask(collectionId, id)}
          >
            &#9932;
          </span>
        </div>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteTask: (collectionId, id) => {
    dispatch(removeTaskId(collectionId, id));
    dispatch(deleteTask(id));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Task);
