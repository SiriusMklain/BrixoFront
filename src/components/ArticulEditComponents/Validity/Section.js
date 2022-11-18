import {Component} from "react";

import Accordion from 'react-bootstrap/Accordion';
import Item from "./Item";


class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: ''
        }
    }


    render() {
        return (
            <tr>
                <td>
                    <div className="table__td">
                        <span
                            className="table__num gray-text">{this.props.sections.map((section) =>
                            <Item
                                section={section}
                            />)}
                        </span>
                    </div>
                </td>
            </tr>
        );
    }

}


export default Section;
