import React from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import Task from '../task/Task';
import TaskAddButton from '../task-add-button/TaskAddButton';

const TaskContainer = ({ tasks, collectionId }) => {
  return (
    <>
      <Droppable droppableId={collectionId}>
        {provided => (
          <div
            style={{ margin: '5px 0' }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks &&
              tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  collectionId={collectionId}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <TaskAddButton collectionId={collectionId} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state.collections);

  if (state.collections)
    return {
      tasks: state.collections[ownProps.collectionId].taskIds.map(
        id => state.board.tasks[id]
      )
    };
};

export default connect(mapStateToProps)(TaskContainer);
