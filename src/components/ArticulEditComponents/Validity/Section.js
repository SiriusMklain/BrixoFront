import React, {Component} from "react";

import Item from "./Item";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalAddCriteria from "../../Modal/ModalAddCriteria";


class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: '',
            modal_open: false,
        }
        this.modalOpen = this.modalOpen.bind(this)
    }

    componentDidMount() {
        this.props.funcSections(this.props.sections)
    }

    modalOpen() {
        this.setState({
            modal_open: true,
        })
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
                    onClick={this.modalOpen}
                    className="data-block__add-btn btn btn-blue"
                    style={{marginLeft: 1035, minWidth: 200, backgroundColor: '#6D71F9'}}
                >
                    Добавить критерий
                </Button>
                <ModalAddCriteria
                    funcModalOpen={this.state.modal_open}
                    modal_close={() => this.setState({modal_open: false})}
                />

            </>
        );
    }

}


export default Section;
