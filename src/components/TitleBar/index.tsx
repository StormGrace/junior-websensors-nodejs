import React, {Component} from 'react';
import "./style.scss"
import SensorStatus from './SensorStatus';

const {ipcRenderer} = window.require('electron');

interface Props { title: string }

class TitleBar extends Component<Props>{
    constructor(props:any){
        super(props);
        //this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        ipcRenderer.send("command:close");
    }   

    render(){
        return(
            <div className="titlebar">
               <SensorStatus status={true}/>
               <div className="titlebar-title">{this.props.title}</div>
               <button className="titlebar-btn titlebar-btn-exit" onClick={this.handleClose}></button>
            </div>
        );
    }
}
export default TitleBar;