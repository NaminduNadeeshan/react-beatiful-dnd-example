import React, { Component } from 'react';
import './App.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import data from './data';
import Column from './Column';

const Container = styled.div`
    display: flex;
`;

class App extends Component {

  state = data;
   constructor(props){
     super(props);
}

  onDragEnd = result => {

    const { destination, source, draggableId, type} = result;

    if (!destination) {
      return;
    }

    if (destination.draggableId === source.draggableId &&
        destination.index === source.index
    ){
      return;
    }

    if(type === "columns"){
      
      const reOrderColumn = Array.from(this.state.columnOrder);
      reOrderColumn.splice(source.index, 1);
      reOrderColumn.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: reOrderColumn,
      }

    // to get prevState every time for the rollback.
    const prevState = this.state;

      this.setState(newState);
      return;

    }

    const toReOrderingCol = this.state.columns[source.droppableId];
    const toReOrderingColEnd = this.state.columns[destination.droppableId];
    const newTaskId = Array.from(toReOrderingCol.taskId);

    // in side the same columns 
    if (toReOrderingCol === toReOrderingColEnd) {

   


      newTaskId.splice(source.index, 1);
      newTaskId.splice(destination.index, 0, draggableId);
  
  
  
  
      const newColumn = {
        ...toReOrderingCol,
        taskId: newTaskId
      }
  
      const newData = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
  
        },
  
      }
      // to get prevState every time for the rollback.
      const prevState = this.state;

      this.setState(newData);
      return;
    } 

      // moving the items between the columns
    const startTaskIds = Array.from(toReOrderingCol.taskId);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...toReOrderingCol,
      taskId : startTaskIds,
    };

    const finishTaskArray = Array.from(toReOrderingColEnd.taskId);
    finishTaskArray.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...toReOrderingColEnd,
      taskId: finishTaskArray,
    };


    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
        }
    }

    // to get prevState every time for the rollback.
    const prevState = this.state;

    this.setState(newState);

   setTimeout(function() {this.setState(prevState)}.bind(this), 3000);
    return;
  };

  timer(prevState){
    console.log("im here");
    this.setState(prevState);
  }


  render() {
    return (
      <DragDropContext onDragEnd = {this.onDragEnd}  >
      <Droppable droppableId="all-columns" direction="horizontal" type="columns">
      {
        provided => (
      <Container className="col-md-4 col-sm-4"
          {...provided.droppableProps}
          innerRef = {provided.innerRef}
      >
        {this.state.columnOrder.map( (columnId, index) => {
        const column = this.state.columns[columnId];
        const items = column.taskId.map(itemId => this.state.task[itemId]);

        return <Column column={column} items={items} index={index}></Column>
    })}

    { provided.placeholder }
    </Container>

        )
      }
      
  </Droppable>
    </DragDropContext>
  );
  }
}

export default App;
