import React, {Component} from 'react';

import CSS from 'csstype';

import './style.scss'

interface Props {segments: number, radius: number, value: number, valuestep:number, measure: string};

class OMeter extends Component<Props>{

    state = {
        ometerValue: 0,
        ometerMeasure: ""
    }

    container: React.RefObject<HTMLDivElement>;
    outerRing: React.RefObject<HTMLDivElement>;
    innerRing: React.RefObject<HTMLDivElement>;

    tickStyle: CSS.Properties = {
        width: `${12}px`,
        borderTop: `${1}px solid gray`
    }

    tickStyleBold: CSS.Properties = {
        width: `${24}px`,
        borderTop: `${2}px solid gray`
    }

    digitStyle: CSS.Properties = { color: 'white', fontSize: `${8}pt`,}

    constructor(props:any){
        super(props);
        this.container = React.createRef<HTMLDivElement>();
        this.outerRing = React.createRef<HTMLDivElement>();
        this.innerRing = React.createRef<HTMLDivElement>();
    }

    degToRad(degs:number){
        return degs * Math.PI / 180;
    }

    createDigitRing(segmentCount:number, radius:number, valueStep:number){
        let digits = [];

        let startAngle = 180;

        let segmentsToRender = 24;

        let angleSnap =  360 / segmentsToRender;

        let currentAngle = startAngle;

        let currentValueStep = 0;

        for(let i = 0; i < 13; i++){        
            const radians: number = this.degToRad(currentAngle);          
            const deltaX = radius * Math.cos(radians);
            const deltaY = radius * Math.sin(radians);

            let digitStyle : CSS.Properties = { position: 'absolute', transform: `translate(${deltaX}px, ${deltaY}px)`};

            digitStyle = {...digitStyle, ...this.digitStyle};

            digits.push(<span key={i} className='ometer-digit' style={digitStyle}>{currentValueStep}</span>)

            currentAngle += angleSnap;
            currentValueStep += valueStep;
        }

        return digits;
    }

    createOuterRing(segmentCount: number, radius: number, half: boolean)  {
        let ticks = [];

        let startAngle = 180;

        let segmentsToRender = segmentCount;

        let angleSnap =  360 / segmentCount;

        let currentAngle = startAngle;

        if(half == true){
            segmentsToRender = (segmentCount / 2) + 1;
        }

        for(let i = 0; i < segmentsToRender; i++){          
            const radians: number = this.degToRad(currentAngle);  

            const deltaX = radius * Math.cos(radians);
            const deltaY = radius * Math.sin(radians);

            let tickStyle : CSS.Properties = { position: 'absolute', transform: `translate(${deltaX}px, ${deltaY}px) rotate(${currentAngle}deg)`};

            if(i % 3 == 0){
                tickStyle = {...tickStyle, ...this.tickStyleBold};
            }else{
                tickStyle = {...tickStyle, ...this.tickStyle};
            }
    
            ticks.push(<span key={i} className='ometer-tick' style={tickStyle}></span>)

            currentAngle += angleSnap;
        }

        return ticks;
    }

    setValue(value: number){
        this.setState(
            {
                ometerValue: value
            }
        )
    }

    setMeasure(measure: string){
        this.setState(
            {
                ometerMeasure: measure
            }
        )
    }

    render(){
        const {segments, radius, value, valuestep, measure} = this.props

        const pointerStyle : CSS.Properties = {transform: `rotate(${value * 1.5}deg)`}

        return(
            <div className="ometer" ref={this.container}>
                <div className="ometer-outer-ring" ref={this.outerRing}>
                    {this.createOuterRing(segments, radius, true)}
                </div>
                <div className="ometer-digit-ring">
                    {this.createDigitRing(segments, radius - 24, valuestep)}
                </div>
                <div className="ometer-inner" ref={this.innerRing}>
                    <div className="ometer-inner-details">
                        <span className="ometer-inner-details-value">{value.toFixed(2)}</span>
                        <span className="ometer-inner-details-measure">{measure}</span>
                    </div>
                    <span className="ometer-inner-pointer" style={pointerStyle}></span>
                </div>
            </div>
        );
    }
} export default OMeter;