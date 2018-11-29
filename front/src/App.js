import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

const scaleImage = {
    width: '75%',
    flex: 1,
};

class App extends Component {

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getElementAndErase(array) {
    var item = array[0];
    array.splice(0,1);
    return item;
  }

  getRows(randomArray){
    var cols = [];
    var numCols;
    let numRestante = randomArray.length;
    if (numRestante % 3 !== numRestante && numRestante % 2 !== numRestante && numRestante !== 3){
      numCols = parseInt(Math.floor(Math.random()*(3-2+1)+2));
    }else {
      numCols = numRestante;
    }
    
    let ancho = numCols === 2 ? "6" : "4";
    for(var i=0; i<numCols; i++){
      let urlImage = require(`./static/${this.getElementAndErase(randomArray).replace('./', '')}`);
      cols.push(<Col xs={ancho} sm={ancho} key={randomArray.length}>
                  <img src={ urlImage } style={ scaleImage } alt=""/>
                </Col>);
    }
    return cols;    
  }

  getImages() {
    let images = [];
    let req = require.context("./static", false, /.*\.jpg$/);
    let randomArray = this.shuffleArray(req.keys());
    while(randomArray.length > 0){
      images.push(
        <Row key={randomArray.length}>
          {this.getRows(randomArray)}
        </Row>
      )
    }
    return images;
  }

  render() {
    return (
      <div className="App">
        <Container>
          { this.getImages() }
        </Container>
      </div>
    );
  }
}

export default App;
