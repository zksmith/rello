import React, { useState } from 'react';
import './CollectionsContainer.scss';
import { connect } from 'react-redux';

import Collection from '../collection/Collection';

import { addCollection } from '../../redux/actions/collectionActions';

const CollectionsContainer = ({ collections, addCollection }) => {
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
    <section className='collections-container'>
      {Object.keys(collections).map(key => (
        <Collection
          key={collections[key].id}
          collectionName={collections[key].title}
          collectionId={collections[key].id}
          taskIds={collections[key].taskIds}
        />
      ))}

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
  );
};

const mapStateToProps = state => ({
  collections: state.collectionState.collections
});

const mapDispatchToProps = dispatch => ({
  addCollection: title => dispatch(addCollection(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsContainer);
