import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Collection from '../collection/Collection';

import { addCollection } from '../../redux/board/boardActions';

const CollectionsContainer = ({ collections, addCollection }) => {
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
    //TODO
  };

  return (
    <div className='collections-container'>
      <DragDropContext onDragEnd={onDragEnd}>
        {collections.map((collection, index) => (
          <Collection
            key={index}
            collectionName={collection.title}
            collectionId={collection.id}
          />
        ))}
      </DragDropContext>

      {collectionAddInProgress ? (
        <form onSubmit={handleCollectionAdd}>
          <input
            type='text'
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
  addCollection: (id, title) => dispatch(addCollection(id, title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsContainer);
