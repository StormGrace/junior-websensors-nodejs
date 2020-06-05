import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.scss';

import TitleBar from './components/TitleBar';

import Main from './components/Main';

const app = document.getElementById('app');

class App extends React.Component{
    render(){
        return(
            <>
                <TitleBar title="Sensor 0.0.1"/>
                <Main/>
            </>
        );
    }
}
ReactDOM.render(<App/>, app);