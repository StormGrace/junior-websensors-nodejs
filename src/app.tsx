import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.scss';

import TitleBar from './components/TitleBar';

import SensorController from './components/SensorController';

const {ipcRenderer} = window.require('electron');

const RandEXP = require('randexp')

class App extends React.Component{
    state = {
        sensorStatus: true
    }
    
    sensorName : string;
    sensorId: number;

    constructor(props:any){
        super(props);
        this.sensorName = new RandEXP(/\w{2}\d{2}/).gen();
        this.sensorId = this.generateIdHash(this.sensorName);
     }

    componentDidMount(){
        ipcRenderer.send("command:sensor-attach", {sensorName: this.sensorName, sensorId: this.sensorId, sensorStatus: this.getSensorStatus()});
    }

    componentWillUnmount(){
       ipcRenderer.send("command:sensor-dettach", this.sensorId);
    }   

    setSensorStatus(status: boolean){
         this.setState({sensorStatus: status})
    }

    getSensorStatus(){
        return this.state.sensorStatus;
    }

    generateIdHash(string:any) {
        let hash = 0;

        if (string.length == 0)return hash;

        for (let i = 0; i < string.length; i++) {
            let charCode = string.charCodeAt(i);
            hash = ((hash << 7) - hash) + charCode;
            hash = hash & hash;
        }

        return hash;
    }

    render(){
        const title = "Sensor: '" + this.sensorName + "' [ID: " + this.sensorId + "]";

        return(
            <>
                <TitleBar title={title} status={this.getSensorStatus()}/>
                <SensorController sensorId={this.sensorId} sensorName ={this.sensorName}/>
            </>
        );
    }
} ReactDOM.render(<App/>, document.getElementById('root'));