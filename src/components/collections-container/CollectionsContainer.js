import React, { useState } from 'react';
import './CollectionsContainer.scss';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Collection from '../collection/Collection';

import { addCollection } from '../../redux/actions/boardActions';

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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='collections-container'>
        {Object.keys(collections).map((key, index) => (
          <Collection
            key={index}
            collectionName={collections[key].title}
            collectionId={collections[key].id}
            taskIds={collections[key].taskIds}
          />
        ))}

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
    </DragDropContext>
  );
};

const mapStateToProps = state => ({
  collections: state.board.collections
});

const mapDispatchToProps = dispatch => ({
  addCollection: title => dispatch(addCollection(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsContainer);
