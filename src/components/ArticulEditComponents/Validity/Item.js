import React, {Component} from "react";

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
            <tr>
                <td style={{width: 200}}>
                    <div className="table__td">
                        <span>{this.props.item !== '' ? this.props.section.sort_no : ""}</span>
                    </div>
                </td>
                <td style={{width: 200}}>
                    <div className="table__td">
                        <span>{this.props.item !== '' ? this.props.section.crit_no : ""}</span>
                    </div>
                </td>
                <td style={{width: 200}}>
                    <div className="table__td">
                        <span>{this.props.item !== '' ? this.props.section.crit_val : ""}</span>
                    </div>
                </td>

            </tr>


        );
    }


}


export default Item;
