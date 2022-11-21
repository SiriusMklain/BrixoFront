import {Component} from "react";

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
                <label style={{marginBottom: 15, marginLeft: 30}}>Секция {this.props.index + 1}</label>
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
