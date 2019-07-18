import React from 'react';
import { connect } from 'react-redux';
import { deleteCollection } from '../../redux/actions/collectionActions';

import './Collection.scss';
import TaskContainer from '../task-container/TaskContainer';

const Collection = ({ collectionName, collectionId, deleteCollection }) => {
  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collectionName}</strong>
        <span
          className='collection-delete'
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you wish to delete ${collectionName}?`
              )
            )
              deleteCollection();
          }}
        >
          &#9932;
        </span>
      </p>

      <TaskContainer collectionId={collectionId} />
    </section>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteCollection: () => dispatch(deleteCollection(ownProps.collectionId))
});

export default connect(
  null,
  mapDispatchToProps
)(Collection);
