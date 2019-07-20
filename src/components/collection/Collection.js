import React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { deleteCollection } from '../../redux/actions/collectionActions';

import './Collection.scss';
import TaskContainer from '../task-container/TaskContainer';

const Collection = ({
  collectionData,
  collectionId,
  deleteCollection,
  index
}) => {
  return (
    <Draggable draggableId={collectionId} index={index}>
      {provided => (
        <article
          className='collection'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p className='collection-title' {...provided.dragHandleProps}>
            <strong>{collectionData.title}</strong>
            <span
              className='collection-delete'
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you wish to delete ${collectionData.title}?`
                  )
                )
                  deleteCollection();
              }}
            >
              &#9932;
            </span>
          </p>

          <TaskContainer collectionId={collectionId} />
        </article>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collectionData: state.collectionState.collections[ownProps.collectionId]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteCollection: () => dispatch(deleteCollection(ownProps.collectionId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
