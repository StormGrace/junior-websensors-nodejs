import React, {Component} from 'react';
import "./style.scss"
import SensorStatus from './SensorStatus';

const {ipcRenderer} = window.require('electron');

interface Props { title: string, status: boolean }

class TitleBar extends Component<Props>{
    handleClose(){
        ipcRenderer.send("command:close");
    }   

    render(){
        const {title, status} = this.props;

        return(
            <div className="titlebar">
               <SensorStatus status={status}/>
               <div className="titlebar-title">{title}</div>
               <button className="titlebar-btn titlebar-btn-exit" onClick={this.handleClose}></button>
            </div>
        );
    }
}
export default TitleBar;