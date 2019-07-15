import React from 'react';

import './Collection.scss';
import TaskContainer from '../task-container/TaskContainer';

const Collection = ({ collectionName, collectionId }) => {
  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collectionName}</strong>
      </p>

      <TaskContainer collectionId={collectionId} />
    </section>
  );
};

export default Collection;
