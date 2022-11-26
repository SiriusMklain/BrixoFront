import React, {Component} from "react";

import Item from "./Item";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: ''
        }
    }

    componentDidMount() {
        this.props.funcSections(this.props.sections)
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
                <Button
                                // onClick={this.addApplicability}
                                className="data-block__add-btn btn btn-blue"
                                style={{marginLeft: 850, minWidth: 200, backgroundColor: '#6D71F9'}}
                            >
                                Добавить секцию
                            </Button>
            </>
        );
    }

}


export default Section;
