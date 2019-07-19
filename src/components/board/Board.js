import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { moveTask, removeTaskId } from '../../redux/actions/collectionActions';

import CollectionsContainer from '../collections-container/CollectionsContainer';

import './Board.scss';

const Board = ({ boardName, moveTask, removeTaskId }) => {
  //Handles all Drag and Drop functionality TODO: clean names
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
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
  };

  return (
    <main className='board'>
      <section className='board-header'>
        <strong className='board-name'>{boardName}</strong>
      </section>
      <DragDropContext onDragEnd={onDragEnd}>
        <CollectionsContainer />
      </DragDropContext>
    </main>
  );
};

const mapStateToProps = state => ({
  boardName: state.board.boardName
});

const mapDispatchToProps = dispatch => ({
  moveTask: args => dispatch(moveTask(args)),
  removeTaskId: args => dispatch(removeTaskId(args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
