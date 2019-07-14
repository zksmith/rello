import React from 'react';

import Collection from '../collection/Collection';

import './Board.scss';

const Board = ({ boardData: { collections, title } }) => {
  return (
    <main className='board'>
      <section className='board-header'>
        <strong className='board-name'>{title}</strong>
      </section>
      <div className='collections-container'>
        {collections.map((collection, index) => (
          <Collection key={index} collection={collection} />
        ))}
        <button>+ Add Collection</button>
      </div>
    </main>
  );
};

export default Board;
