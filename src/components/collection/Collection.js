import React from 'react';

import Task from '../task/Task';

import './Collection.scss';

const Collection = ({ collection }) => {
  return (
    <section className='collection'>
      <p className='collection-title'>
        <strong>{collection.name}</strong>
      </p>
      {collection.items.map(item => (
        <Task item={item} />
      ))}

      <button className='add-button'>+ Add another card</button>
    </section>
  );
};

export default Collection;
