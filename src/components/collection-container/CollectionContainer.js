import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import Collection from './Collection';
import CollectionAddForm from './CollectionAddForm';
import './CollectionContainer.scss';

const CollectionsContainer = ({ collectionOrder }) => {
  const [collectionAddInProgress, setCollectionAddInProgress] = useState(false);

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
          {/* TODO: move collection add form to seperate component */}
          {collectionAddInProgress ? (
            <CollectionAddForm
              setCollectionAddInProgress={setCollectionAddInProgress}
            />
          ) : (
            <button
              className='collection-add-button'
              onClick={() => setCollectionAddInProgress(true)}
            >
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

export default connect(mapStateToProps)(CollectionsContainer);
