import React, { useState } from 'react';
import { connect } from 'react-redux';

import './CollectionAddForm.scss';
import { addCollection } from '../../redux/actions/collectionActions';

const CollectionAddForm = ({ setCollectionAddInProgress, addCollection }) => {
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
    <form onSubmit={handleCollectionAdd} className='collection-add-form'>
      <input
        type='text'
        placeholder='Collection Title'
        autoFocus
        onChange={e => setNewCollectionTitle(e.target.value)}
        maxLength='25'
      />
      <button className='collection-submit-button' type='submit'>
        Add
      </button>
      <span
        className='close-button'
        onClick={() => setCollectionAddInProgress(false)}
      >
        &#9932;
      </span>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  addCollection: title => dispatch(addCollection(title))
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionAddForm);
