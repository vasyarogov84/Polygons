import React, { Component } from 'react';
import { render } from 'react-dom';
//import './style.css';
import MapWithADrawingManager from './components/MyMapComponent';

class App extends Component {
    render() {
        
        return (
            <MapWithADrawingManager />
        );
    }
}


render(<App />, document.getElementById('root'));
