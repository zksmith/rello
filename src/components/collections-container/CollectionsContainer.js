import React, { useState } from 'react';
import './CollectionsContainer.scss';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Collection from '../collection/Collection';

import {
  addCollection,
  moveTask,
  deleteTask
} from '../../redux/actions/collectionActions';

const CollectionsContainer = ({
  collections,
  addCollection,
  moveTask,
  deleteTask
}) => {
  const [collectionAddInProgress, setCollectionAddInProgress] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  // If there is and input value add new collection
  const handleCollectionAdd = e => {
    e.preventDefault();
    if (newCollectionName) {
      addCollection(newCollectionName);
      setNewCollectionName('');
    }

    setCollectionAddInProgress(false);
  };

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
      deleteTask(source.droppableId, draggableId);
    }

    moveTask(
      destination.droppableId,
      source.droppableId,
      draggableId,
      source.index,
      destination.index
    );

    //TODO
  };

  return (
    <div className='collections-container'>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(collections).map(key => (
          <Collection
            key={collections[key].id}
            collectionName={collections[key].title}
            collectionId={collections[key].id}
            taskIds={collections[key].taskIds}
          />
        ))}
      </DragDropContext>

      {collectionAddInProgress ? (
        <form onSubmit={handleCollectionAdd}>
          <input
            type='text'
            placeholder='Collection Title'
            autoFocus
            onChange={e => setNewCollectionName(e.target.value)}
            onBlur={handleCollectionAdd}
          />
        </form>
      ) : (
        <button onClick={() => setCollectionAddInProgress(true)}>
          + Add Collection
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  collections: state.board.collections
});

const mapDispatchToProps = dispatch => ({
  addCollection: title => dispatch(addCollection(title)),
  moveTask: (...args) => dispatch(moveTask(...args)),
  deleteTask: (collectionId, taskId) =>
    dispatch(deleteTask(collectionId, taskId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsContainer);
