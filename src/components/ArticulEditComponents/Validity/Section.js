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
            sections: [],
            ts: '',
            type_no: '',
        }
        this.modalOpen = this.modalOpen.bind(this)
    }

    componentDidMount() {
        this.props.funcSections(this.props.sections)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.sections.length === 0) {
            this.setState({sections: nextProps.new_section.length !== 0 ? [...nextProps.sections, nextProps.new_section] : nextProps.sections})
        } else {
            this.setState({sections: nextProps.new_section.length !== 0 ? [...this.state.sections, nextProps.new_section] : this.state.sections})
        }
    }

    modalOpen() {
        this.setState({
            modal_open: true, ts: this.props.ts, type_no: this.props.type_no
        }, () => this.props.funcCritNo(this.props.sections.length))
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
                    {this.state.sections.map((section) =>
                        <Item
                            section={section}
                            art_no_id={this.props.art_no_id}
                        />)}
                    </tbody>
                </Table>
                <Button
                    onClick={this.modalOpen}
                    className="data-block__add-btn btn btn-blue"
                    style={{marginLeft: 1035, marginBottom: 20, minWidth: 200, backgroundColor: '#6D71F9'}}

                >
                    Добавить критерий
                </Button>
                <ModalAddCriteria
                    ts={this.props.ts}
                    type_no={this.props.type_no}
                    modal_open={this.state.modal_open}
                    modal_close={() => this.setState({modal_open: false})}
                    funcAddSection={this.props.funcAddSection}
                    validity={this.props.index + 1}
                />
            </>
        );
    }
}


export default Section;
