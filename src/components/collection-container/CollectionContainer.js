import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import Collection from './Collection';
import './CollectionContainer.scss';

import { addCollection } from '../../redux/actions/collectionActions';

const CollectionsContainer = ({ addCollection, collectionOrder }) => {
  const [collectionAddInProgress, setCollectionAddInProgress] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState('');

  // If there is and input value add new collection
  const handleCollectionAdd = e => {
    e.preventDefault();
    if (newCollectionTitle) {
      addCollection(newCollectionTitle);
      setNewCollectionTitle('');
    }

    setCollectionAddInProgress(false);
  };

  return (
    <Droppable
      droppableId='all-collections'
      direction='horizontal'
      type='collection'
    >
      {provided => (
        <section
          className='collections-container'
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {collectionOrder.map((collectionId, index) => (
            <Collection
              key={collectionId}
              index={index}
              collectionId={collectionId}
            />
          ))}
          {provided.placeholder}

          {/* TODO: Move this to sepertate  component and place in board.js */}
          {collectionAddInProgress ? (
            <form onSubmit={handleCollectionAdd}>
              <input
                type='text'
                placeholder='Collection Title'
                autoFocus
                onChange={e => setNewCollectionTitle(e.target.value)}
                onBlur={handleCollectionAdd}
              />
            </form>
          ) : (
            <button onClick={() => setCollectionAddInProgress(true)}>
              + Add Collection
            </button>
          )}
        </section>
      )}
    </Droppable>
  );
};

const mapStateToProps = state => ({
  collectionOrder: state.collectionState.collectionOrder
});

const mapDispatchToProps = dispatch => ({
  addCollection: title => dispatch(addCollection(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsContainer);
