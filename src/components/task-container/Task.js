import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

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
          <p style={{ width: '94%' }}>{subject}</p>
          <span
            className='task-delete'
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you wish to delete "${subject}?" task`
                )
              )
                deleteTask(collectionId, id);
            }}
          >
            X
          </span>
        </div>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteTask: (collectionId, id) => {
    dispatch(deleteTask(collectionId, id));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Task);
