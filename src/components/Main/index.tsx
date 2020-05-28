import React, {Component} from 'react';

import './style.scss';

import OMeter from './OMeter';

class Main extends Component{
    render(){
        return(
            <div className="main">
                <OMeter segments={72} radius={100} value={24.22} measure='&#8451;'/>
            </div>
        );
    }
} export default Main;