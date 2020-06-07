import React, {Component} from 'react';

import './style.scss';

interface Props {values: string[], defaultValue: string, callback: Function}

class Dropdown extends Component<Props>{
    state = {
        defaultValue: ""
    }

    dropDownElement: React.RefObject<HTMLSelectElement>;

    constructor(props:any){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.dropDownElement = React.createRef<HTMLSelectElement>();
    }

    componentDidMount(){
        this.selectValue(this.props.defaultValue);
    }

    getSelectedValue(){
        if(this.dropDownElement && this.dropDownElement.current){
            return this.dropDownElement.current.value;
        }
        return null;
    }

    selectValue(value: string){
        if(this.dropDownElement && this.dropDownElement.current){
            this.dropDownElement.current.value = value;
        }
    }

    handleChange(event: any){
        const selectedValue: string = event.target.value;
        this.selectValue(selectedValue);
        this.props.callback(selectedValue);
    }

    generateDropdownValues(values: string[]){
        const dropdownValues: string[] = [...values];

        const dropdownElements = dropdownValues.map((value:string, index: number) => (
            <option key={index} className="dropdown-list-item">{value}</option>
        ));

        return dropdownElements;
    }

    render(){
        const {values} = this.props;

        return(
            <span className="dropdown">
                <select className="dropdown-list" onChange={(e) => {this.handleChange(e)}} ref={this.dropDownElement}>       
                    {this.generateDropdownValues(values)}
                </select>
            </span>
        );
    }
}

export default Dropdown;