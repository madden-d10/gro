import React, { useState, useEffect } from 'react';
  
class GardenSpace extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div
          className="space"
          style={{ backgroundColor: this.props.space.color }}
          draggable={this.props.draggable}
          onDragStart={this.props.onDragStart({ id: this.props.space.id })}
          onDragOver={this.props.onDragOver({ id: this.props.space.id })}
          onDrop={this.props.onDrop({ id: this.props.space.id })}
          >
          <div className="content">{this.props.space.name}</div>
        </div>
      );
    }
  }
  
export default GardenSpace;