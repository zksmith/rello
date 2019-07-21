import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import {
  moveTask,
  removeTaskId,
  moveCollection
} from '../../redux/actions/collectionActions';

import CollectionsContainer from '../collection-container/CollectionContainer';

import BoardHeader from './BoardHeader';
import './Board.scss';

const Board = ({ totalTasks, moveTask, moveCollection, removeTaskId }) => {
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'task') {
      if (destination.droppableId !== source.droppableId) {
        removeTaskId({ collectionId: source.droppableId, taskId: draggableId });
      }

      moveTask({
        collectionId: destination.droppableId,
        prevCollectionId: source.droppableId,
        taskId: draggableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      });
    } else {
      moveCollection(source.index, destination.index, draggableId);
    }
  };

  return (
    <main className='board'>
      <BoardHeader />
      <DragDropContext onDragEnd={onDragEnd}>
        <CollectionsContainer />
      </DragDropContext>
    </main>
  );
};

const mapDispatchToProps = dispatch => ({
  moveTask: args => dispatch(moveTask(args)),
  moveCollection: (sourceIndex, destinationIndex, collectionId) =>
    dispatch(moveCollection(sourceIndex, destinationIndex, collectionId)),
  removeTaskId: args => dispatch(removeTaskId(args))
});

export default connect(
  null,
  mapDispatchToProps
)(Board);
