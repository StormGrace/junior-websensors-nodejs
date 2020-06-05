import React, {Component} from 'react';

import SensorController from './SensorController';

import './style.scss';

class Main extends Component{
    constructor(props: any){
        super(props);
    }

    render(){
        return(
            <div className="main">
                <SensorController/>
            </div>
        );
    }
} export default Main;