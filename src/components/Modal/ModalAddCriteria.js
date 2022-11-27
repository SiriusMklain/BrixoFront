import React, {Component} from "react";
import {Form, Modal} from 'react-bootstrap';
import Button from "react-bootstrap/Button";


class ModalAddCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_open: false,
            crit_no: '',
            crit_val: '',
            ts: '',
            type_no: ''
        }

        this.modalClose = this.modalClose.bind(this)
        this.addData = this.addData.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ts: nextProps.ts, type_no: nextProps.type_no, modal_open: nextProps.modal_open})

    }


    modalClose() {
        this.setState({
            modal_open: false,
        })
    }

    addData(e) {

        this.setState({
            crit_no: e.target.offsetParent.children[1].children[0][1].value,
            crit_val: e.target.offsetParent.children[1].children[0][3].value
        }, () => this.props.funcAddSection(this.state.crit_no, this.state.crit_val, this.props.ts, this.props.type_no))
        this.modalClose()
    }

    render() {
        return (
            <Modal show={this.state.modal_open} onHide={this.props.modal_close}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый критерий</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="data-block__grid data-block__grid--validity2">
                            <fieldset className="fg data-block__col data-block__col6" style={{marginBottom: 40}}>
                                <label>Crit_no</label>
                                <input type="text"
                                       onChange={this.changeSortNo}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col6" style={{marginBottom: 40}}>
                                <label>Crit_val</label>
                                <input type="text"
                                       onChange={this.changeSortNo}
                                />
                            </fieldset>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button variant="danger" onClick={this.props.modal_close}>
                            Отмена
                        </Button>
                    </div>
                    <div style={{paddingRight: 40}}>
                        <Button variant="primary"
                                onClick={this.addData}
                        >
                            Добавить
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default ModalAddCriteria;
