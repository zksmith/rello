import React from 'react';
import { connect } from 'react-redux';

import Collection from '../collection/Collection';

import { addCollection } from '../../redux/board/boardActions';

import './Board.scss';

const Board = ({ collections, boardName, addCollection }) => {
  return (
    <main className='board'>
      <section className='board-header'>
        <strong className='board-name'>{boardName}</strong>
      </section>
      <div className='collections-container'>
        {collections.map((collection, index) => (
          <Collection
            key={index}
            collectionName={collection.title}
            collectionId={collection.id}
          />
        ))}
        <button onClick={() => addCollection('sample_2', 'Sample 2')}>
          + Add Collection
        </button>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  collections: state.board.collections,
  boardName: state.board.boardName,
  tasks: state.board.tasks
});

const mapDispatchToProps = dispatch => ({
  addCollection: (id, title) => dispatch(addCollection(id, title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
