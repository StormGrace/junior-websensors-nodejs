import React, {Component} from 'react';
import './style.scss';

interface Props { status: boolean }

class SensorStatus extends Component<Props>{
    render(){
        let isActive: string = String(this.props.status);
        
        //@ts-ignore
        return <span className="sensor-status-wrapper" active={isActive}/>
    };
}
export default SensorStatus;