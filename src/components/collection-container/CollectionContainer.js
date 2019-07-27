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
          {/* TODO: move collection add form to seperate component */}
          <div className='collection-add'>
            {collectionAddInProgress ? (
              <form onSubmit={handleCollectionAdd}>
                <input
                  type='text'
                  placeholder='Collection Title'
                  autoFocus
                  onChange={e => setNewCollectionTitle(e.target.value)}
                  onBlur={handleCollectionAdd}
                  maxLength='25'
                />
              </form>
            ) : (
              <button onClick={() => setCollectionAddInProgress(true)}>
                + Add Collection
              </button>
            )}
          </div>
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
