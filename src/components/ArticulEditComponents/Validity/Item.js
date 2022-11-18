import {Component} from "react";

import Accordion from 'react-bootstrap/Accordion';


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: ''
        }
    }


    render() {
        return (
            <span className="table__num gray-text">{this.props.item !== '' ? this.props.section.crit_no : ""}</span>
        );
    }


}


export default Item;
