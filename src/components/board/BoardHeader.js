import React, { useState } from 'react';
import { connect } from 'react-redux';

import { filterTasks } from '../../redux/actions/collectionActions';
import { setBoardName } from '../../redux/actions/boardActions';

import './BoardHeader.scss';

const BoardHeader = ({ boardName, totalTasks, filterTasks, setBoardName }) => {
  const [nameChange, setNameChange] = useState(false);
  const [boardNameInput, setBoardNameInput] = useState(boardName);

  return (
    <section className='board-header'>
      {nameChange ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            setBoardName(boardNameInput);
            setNameChange(false);
          }}
        >
          <input
            type='text'
            style={{ marginRight: '5px' }}
            value={boardNameInput}
            autoFocus
            onChange={e => setBoardNameInput(e.target.value)}
            onBlur={() => {
              setNameChange(false);
              setBoardNameInput(boardName);
            }}
          />
        </form>
      ) : (
        <strong
          className='board-header-block'
          onClick={() => setNameChange(true)}
        >
          {boardName} {''}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15'
            height='15'
            fill='#17394d'
            viewBox='0 0 24 24'
          >
            <path d='M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z' />
          </svg>
        </strong>
      )}
      <span className='board-header-block'>Total Tasks: {totalTasks}</span>
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
  setBoardName: text => dispatch(setBoardName(text)),
  filterTasks: text => dispatch(filterTasks(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);
