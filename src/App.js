import React from 'react';

import './App.css';

import Header from './components/header/Header';
import Board from './components/board/Board';

function App() {
  const DEMO_DATA = [
    {
      boardName: 'Kanban Board',
      collections: [
        {
          name: 'Sample Collection',
          items: [{ text: 'Sample Text' }]
        },
        {
          name: 'Sample Collection 2',
          items: [{ text: 'Sample Text' }]
        },
        {
          name: 'Sample Collection 3',
          items: [{ text: 'Sample Text' }]
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
