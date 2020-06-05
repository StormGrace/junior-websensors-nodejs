import React, {Component} from 'react';

import './style.scss';

interface Props {values: string[]}

class Dropdown extends Component<Props>{
    state = {
        selectedIndex: 0,
        selectedItem: ""
    }

    componentDidMount(){
        this.selectItem(0);
    }

    handleClick(itemIndex: number){
        this.selectItem(itemIndex);
    }

    selectItem(itemIndex: number){
        this.setState(
            {
                selectedIndex: itemIndex,
                selectedItem: this.props.values[itemIndex]
            }
        );
    }

    getSelectedItem(){
        return this.state.selectedItem;
    }

    generateDropdownValues(values: string[]){
        const dropdownValues: string[] = [...values];

        const dropdownElements = dropdownValues.map((value:string, index: number) => (
            <option key={index} className="dropdown-list-item" onClick={() => this.handleClick(index)}>{value}</option>
        ));

        return dropdownElements;
    }

    render(){
        const {values} = this.props;

        return(
            <span className="dropdown">
                <select className="dropdown-list">       
                    {this.generateDropdownValues(values)}
                </select>
            </span>
        );
    }
}export default Dropdown;