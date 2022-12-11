import React, {Component} from "react";
import {Form, Modal} from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Select from "react-select";
import ApiService from "../../util/ApiService";

const apiService = new ApiService();


class ModalAddCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_open: false,
            crit_no: '',
            crit_val: '',
            ts: '',
            type_no: '',
            list_crit_no: [],
            list_crit_val: [],
        }

        this.modalClose = this.modalClose.bind(this)
        this.addData = this.addData.bind(this)
        this.searchCritNo = this.searchCritNo.bind(this)
        this.searchCritVal = this.searchCritVal.bind(this)
        this.changeCritNo = this.changeCritNo.bind(this)
        this.changeCritVal = this.changeCritVal.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ts: nextProps.ts, type_no: nextProps.type_no, modal_open: nextProps.modal_open})

    }


    modalClose() {
        this.setState({
            modal_open: false,
        })
    }

    addData() {
       this.props.funcAddSection(this.state.crit_no.label, this.state.crit_val.label, this.props.ts, this.props.type_no, this.props.validity)
        this.modalClose()
    }

    searchCritNo(e) {
        apiService.searchCritNo(e).then((result) => {
            let value_of = []
            result.value_of.forEach(function (item, index) {
                value_of.push({"value": index + 1, "label": item.value_of_num + " / " + item.value_of_name})
            })

            this.setState({list_crit_no: value_of})
        })
    }

    searchCritVal(e) {
        apiService.searchCritVal(e).then((result) => {
            let value = []
            result.value.forEach(function (item, index) {
                value.push({"value": index + 1, "label": item.value_num + " / " + item.value_name})
            })

            this.setState({list_crit_val: value}, ()=>console.log(value))
        })
    }

    changeCritNo(e) {
        this.setState({crit_no: e})
    }

    changeCritVal(e) {
        this.setState({crit_val: e})
    }

    render() {
        return (
            <Modal size={"xl"} show={this.state.modal_open} onHide={this.props.modal_close}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый критерий</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <div className="data-block__grid data-block__grid--validity2">
                        <fieldset className="fg data-block__col data-block__col6" style={{marginBottom: 40}}>
                            <label>Crit_no</label>
                            <Select
                                classNamePrefix="select"
                                isSearchable={true}
                                name="Crit_no"
                                value={this.state.crit_no}
                                options={this.state.list_crit_no}
                                onChange={this.changeCritNo}
                                onInputChange={this.searchCritNo}
                                placeholder={"Поиск"}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6" style={{marginBottom: 40}}>
                            <label>Crit_val</label>
                            <Select
                                classNamePrefix="select"
                                isSearchable={true}
                                name="Crit_val"
                                value={this.state.crit_val}
                                options={this.state.list_crit_val}
                                onChange={this.changeCritVal}
                                onInputChange={this.searchCritVal}
                                placeholder={"Поиск"}
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
