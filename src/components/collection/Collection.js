import React from 'react';

import './Collection.scss';
import TaskContainer from '../task-container/TaskContainer';

const Collection = ({ collectionName, collectionId }) => {
  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collectionName}</strong>
        <span
          className='collection-delete'
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this item?'))
              window.alert('TODO: handle Collection delete');
          }}
        >
          &#9932;
        </span>
      </p>

      <TaskContainer collectionId={collectionId} />
    </section>
  );
};

export default Collection;
