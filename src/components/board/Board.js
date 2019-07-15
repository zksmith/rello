import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Collection from '../collection/Collection';

import { addCollection } from '../../redux/board/boardActions';

import './Board.scss';

const Board = ({ collections, boardName, addCollection }) => {
  const [collectionAddInProgress, setCollectionAddInProgress] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleInputChange = e => {
    setNewCollectionName(e.target.value);
  };

  // If there is and input value add new collection
  const handleCollectionAdd = e => {
    e.preventDefault();
    if (newCollectionName) {
      addCollection(newCollectionName);
      setNewCollectionName('');
    }

    setCollectionAddInProgress(false);
  };

  const onDragEnd = result => {
    //TODO
  };

  return (
    <main className='board'>
      <section className='board-header'>
        <strong className='board-name'>{boardName}</strong>
      </section>
      <div className='collections-container'>
        <DragDropContext onDragEnd={onDragEnd}>
          {collections.map((collection, index) => (
            <Collection
              key={index}
              collectionName={collection.title}
              collectionId={collection.id}
            />
          ))}
        </DragDropContext>

        {collectionAddInProgress ? (
          <form onSubmit={handleCollectionAdd}>
            <input
              type='text'
              autoFocus
              onChange={handleInputChange}
              onBlur={handleCollectionAdd}
            />
          </form>
        ) : (
          <button onClick={() => setCollectionAddInProgress(true)}>
            + Add Collection
          </button>
        )}
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
