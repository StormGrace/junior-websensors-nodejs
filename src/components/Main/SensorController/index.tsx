import React, {Component} from 'react';

import OMeter from './OMeter';
import Dropdown from '../../Dropdown';

import './style.scss'

const {ipcRenderer} = window.require('electron');

class SensorController extends Component{
    state = {sensorValue: 0};

    refreshRate: number;
    interval: any;

    constructor(props:any){
        super(props);    
        
        this.refreshRate = 2000;

        this.interval = setInterval(() => {
            this.setSensorValue(this.generateSensorValue(0, 120))

            ipcRenderer.send("command:send");

        }, this.refreshRate);      
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
        
    setSensorRate(rate:number){
        this.refreshRate = rate;
    }
    
    getSensorValue(){
        return this.state.sensorValue;
    }

    getSensorRate(){
        return this.refreshRate;
    }

    setSensorValue(value: number){
        this.setState({sensorValue: value});
    }

    generateSensorValue(min:number, max:number){
        return (Math.random() * (max - min) + min);
    }

    render(){
        const sensorValue = this.state.sensorValue;

        return(
            <div className="sensor">
                <OMeter segments={72} radius={100} value={sensorValue} valuestep={10} measure='&#8451;'/>
                <div className="sensor-options">
                    <Dropdown values={["Temperature", "Humidity"]}/>
                    <Dropdown values={["Every second", "Every 5 seconds", "Every 10 seconds"]}/>
                </div>
            </div>
        );
    }
}export default SensorController;