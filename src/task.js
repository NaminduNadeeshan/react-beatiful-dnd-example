import React from 'react';
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgray;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' :  'white')};
`;

export default class Task extends React.Component{

    render(){
        return (
        <Draggable draggableId={this.props.task.id} index={this.props.index} >
        {
            (provided, snapshots)=> (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    
                >
                    <Container isDragging={snapshots.isDragging} >{this.props.task.content}</Container>
                </div>
            )
        }
         
        </Draggable>
        
    );
    }
}