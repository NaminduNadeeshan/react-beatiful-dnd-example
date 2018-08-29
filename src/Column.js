import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './task';


const Container = styled.div`
    marging: 8px;
    border: 1px solid lightgrey;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding 8px;
    background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'}
`;

export default class Column extends React.Component{

    render() {
        return(
        <Draggable draggableId={this.props.column.id} index = {this.props.index}>
            {
                provided => (
        <Container { ...provided.draggableProps } 
                    innerRef={provided.innerRef}

        >
            <Title { ...provided.dragHandleProps }>{this.props.column.title}</Title>
            <Droppable droppableId={this.props.column.id} type="task">
            { (provided, snapshot)=> (
                <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
            <TaskList  isDraggingOver={snapshot.isDraggingOver}>
            {this.props.items.map((task, index) => <Task taskId={task.Id} task={task} index={index} />)}
            { provided.placeholder }
            </TaskList>
                </div>
            )}
            </Droppable>
        </Container>
                )}
        </Draggable>
    );
    }
}