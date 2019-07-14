import React from 'react';

import './App.css';

import Header from './components/header/Header';
import Board from './components/board/Board';

function App() {
  const DEMO_DATA = [
    {
      board_name: 'Kanban Board',
      collections: [
        {
          name: 'Sample Collection',
          items: [{ text: 'Sample Task' }]
        },
        {
          name: 'Sample Collection 2',
          items: [{ text: 'Sample Task' }, { text: 'Sample Task' }]
        },
        {
          name: 'Sample Collection 3',
          items: [{ text: 'Sample Task' }]
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <Board boardData={DEMO_DATA[0]} />
    </>
  );
}

export default App;
