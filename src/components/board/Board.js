import React from 'react';
import { connect } from 'react-redux';

import CollectionsContainer from '../collections-container/CollectionsContainer';

import './Board.scss';

const Board = ({ boardName }) => {
  return (
    <main className='board'>
      <section className='board-header'>
        <strong className='board-name'>{boardName}</strong>
      </section>

      <CollectionsContainer />
    </main>
  );
};

const mapStateToProps = state => ({
  boardName: state.board.boardName
});

export default connect(mapStateToProps)(Board);
