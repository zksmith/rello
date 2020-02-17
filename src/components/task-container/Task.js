import React, { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { deleteTask, updateTask } from '../../redux/actions/collectionActions';

import './Task.scss';

Modal.setAppElement('#root');

const Task = ({
  task: { id, subject, description },
  collectionId,
  index,
  deleteTask,
  updateTask
}) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [subjectCopy, setSubjectCopy] = useState(subject);
  const [descriptionCopy, setDescriptionCopy] = useState(
    description ? description : ''
  );

  const handleTaskUpdate = e => {
    e.preventDefault();
    if (window.confirm(`Are you sure you wish to update "${subject}" task?`))
      updateTask(id, subjectCopy, descriptionCopy);
    setModalOpen(false);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {provided => (
          <div
            className='task'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p style={{ width: '90%' }}>{subject}</p>
            <button
              className='task-edit'
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                fill='#17394d'
                viewBox='0 0 24 24'
              >
                <path d='M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z' />
              </svg>
            </button>
          </div>
        )}
      </Draggable>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)'
          },
          content: {
            backgroundColor: '#282828',
            border: 'none',
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
      >
        <form action='#' className='modal-form'>
          <input
            type='text'
            placeholder='Task Subject'
            value={subjectCopy}
            onChange={e => {
              setSubjectCopy(e.target.value);
            }}
          />
          <textarea
            type='text'
            placeholder='Task Description'
            value={descriptionCopy}
            onChange={e => {
              setDescriptionCopy(e.target.value);
            }}
          />
          <div className='modal-buttons'>
            <button
              className='update'
              onClick={e => {
                handleTaskUpdate(e);
              }}
            >
              Update
            </button>
            <button
              className='delete'
              onClick={e => {
                e.preventDefault();
                if (
                  window.confirm(
                    `Are you sure you wish to delete "${subject}" task?`
                  )
                )
                  deleteTask(collectionId, id);
              }}
            >
              Delete
            </button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteTask: (collectionId, id) => {
    dispatch(deleteTask(collectionId, id));
  },
  updateTask: (id, subject, description) => {
    console.log(id, subject, description);
    dispatch(updateTask(id, subject, description));
  }
});

export default connect(null, mapDispatchToProps)(Task);
