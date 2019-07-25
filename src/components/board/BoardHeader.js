import React from 'react';
import { connect } from 'react-redux';

import { filterTasks } from '../../redux/actions/collectionActions';

import './BoardHeader.scss';

const BoardHeader = ({ boardName, totalTasks, filterTasks }) => {
  return (
    <section className='board-header'>
      <strong className='board-name'>{boardName}</strong>
      <span className='board-name'>Total Tasks: {totalTasks}</span>
      <input
        type='text'
        placeholder='Search Tasks'
        onChange={e => filterTasks(e.target.value)}
      />
    </section>
  );
};

const mapStateToProps = state => ({
  boardName: state.board.boardName,
  totalTasks: Object.keys(state.collectionState.tasks).length
});

const mapDispatchToProps = dispatch => ({
  filterTasks: text => dispatch(filterTasks(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardHeader);
