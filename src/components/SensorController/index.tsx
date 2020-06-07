import React, {Component, Ref} from 'react';
const {Temperature, Humidity} = require('react-environment-chart');

import Dropdown from '../Dropdown';

import './style.scss'

const {ipcRenderer} = window.require('electron');

type rateTypes = {
    [key: string]: number
}

interface Props { sensorId: number, sensorName: string }

class SensorController extends Component<Props>{
    state = {temperature: 0, humidity: 0};

    defaultRefreshRateIndex: number = 1;

    refreshRates: rateTypes = {["Refresh Every Second"]: 1000, ["Refresh Every 5 Seconds"]: 5000, ["Refresh Every 10 Seconds"]: 10000};

    refreshRate: number;

    refreshInterval: any;

    constructor(props:any){
        super(props);
        this.refreshRate = this.refreshRates["Refresh Every 5 Seconds"];
        this.refreshInterval = this.sensorInterval(this.refreshRate);
        this.onDropdownItemClick = this.onDropdownItemClick.bind(this);
    }

    componentWillUnmount(){
        clearInterval(this.refreshInterval);
    }

    sensorInterval(refreshRate: number){
        return setInterval(() => {
            this.setHumidity(parseFloat(this.generateValue(0, 80).toFixed(2)));
            this.setTemperature(parseFloat(this.generateValue(-20, 40).toFixed(2))); 

            let now = new Date();

            ipcRenderer.send("command:sensor-reading", {
                             sensorId: this.props.sensorId,
                             sensorTemp: this.getTemperature(), 
                             sensorHumi: this.getHumidity(),
                             readingTime: now.getUTCDate().toString()
                            });
        }, refreshRate); 
    }
    
    setSensorRate(rate:number){
        this.refreshRate = rate;
        clearInterval(this.refreshInterval);
        this.refreshInterval = this.sensorInterval(rate);
    }

    setHumidity(value: number){
        this.setState({humidity: value});
    }

    setTemperature(value: number){
        this.setState({temperature: value});
    }

    getSensorRate(){
        return this.refreshRate;
    }

    getHumidity(){
        return this.state.humidity;
    }

    getTemperature(){
        return this.state.temperature;
    }

    generateValue(min:number, max:number){
        return (Math.random() * (max - min) + min);
    }

    onDropdownItemClick(value: string)
    {
        const refreshRate = this.refreshRates[value];
        this.setSensorRate(refreshRate);
    }

    render(){
        const currentHumidity    = this.state.humidity;
        const currentTemperature = this.state.temperature;

        return(
            <div className="sensor-controller">
                <div className="sensor-container">
                    <Humidity    height={120} value={currentHumidity}    className="sensor-humi sensor"/>
                    <Temperature height={200} value={currentTemperature} className="sensor-temp sensor"/>
                </div>
                <div className="sensor-rate">
                    <Dropdown values={Object.keys(this.refreshRates)} defaultValue={Object.keys(this.refreshRates)[this.defaultRefreshRateIndex]} callback={this.onDropdownItemClick}/>
                </div>
            </div>
        );
    }
}export default SensorController;