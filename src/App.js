import React from 'react';

import './App.css';

import Header from './components/header/Header';
import Board from './components/board/Board';

function App() {
  const DEMO_DATA = {
    kanban_board: {
      title: 'Kanban Board',
      collections: [
        {
          name: 'Sample Collection',
          tasks: [{ text: 'Sample Task' }]
        },
        {
          name: 'Sample Collection 2',
          tasks: [{ text: 'Sample Task' }, { text: 'Sample Task' }]
        },
        {
          name: 'Sample Collection 3',
          tasks: [{ text: 'Sample Task' }]
        }
      ]
    }
  };

  return (
    <>
      <Header />
      <Board boardData={DEMO_DATA['kanban_board']} />
    </>
  );
}

export default App;
