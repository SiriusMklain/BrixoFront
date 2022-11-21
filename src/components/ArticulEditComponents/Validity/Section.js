import React, {Component} from "react";

import Item from "./Item";
import Table from "react-bootstrap/Table";


class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: ''
        }
    }


    render() {
        return (
            <>
                <table style={{backgroundColor: '#c8e2f8'}}>
                    <thead>
                    <tr>
                        <td style={{width: 200}}>
                    <div className="table__td">
                        <span>Секция {this.props.index + 1}</span>
                    </div>
                </td>
                    </tr>
                    </thead>
                </table>
                <Table>
                    <tbody>
                    {this.props.sections.map((section) =>
                        <Item
                            section={section}
                        />)}
                    </tbody>
                </Table>
            </>
        );
    }

}


export default Section;
