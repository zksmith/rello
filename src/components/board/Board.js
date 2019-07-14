import React from 'react';

import Collection from '../collection/Collection';

import './Board.scss';

const Board = ({ boardData: { boardName, collections } }) => {
  return (
    <main className='board'>
      <section className='board-header'>
        <strong className='board-name'>{boardName}</strong>
      </section>
      <div className='collections-container'>
        {collections.map((collection, index) => (
          <Collection key={index} collection={collection} />
        ))}
      </div>
    </main>
  );
};

export default Board;
