import React from 'react';

import './App.css';

import Header from './components/header/Header';
import Board from './components/board/Board';

function App() {
  // const DEMO_DATA = [
  //   {
  //     board_name: 'Kanban Board',
  //     collections: [
  //       {
  //         id: 'sample_collection',
  //         title: 'Sample Collection'
  //       }
  //     ],
  //     tasks: { sample_collection_tasks: [{ text: 'Sample Task' }] }
  //   }
  // ];

  return (
    <>
      <Header />
      <Board />
    </>
  );
}

export default App;
