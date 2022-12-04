import React, {Component} from "react";
import Accordion from 'react-bootstrap/Accordion';
import Table from "react-bootstrap/Table";
import Section from "./Section";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import Button from "react-bootstrap/Button";
import ModalAddCriteria from "../../Modal/ModalAddCriteria";
import ApiService from "../../../util/ApiService";
import Modal from "react-bootstrap/Modal";

const apiService = new ApiService();

class ValidityItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validity: [],
            check_section: '',
            modal_open: false,
            showModal: false,
            ts: '',
            type_no: '',
            count_criteria: 0,

        }
        this.checkSections = this.checkSections.bind(this)
        this.modalOpen = this.modalOpen.bind(this)

        this.critNo = this.critNo.bind(this)
        this.deleteApplicability = this.deleteApplicability.bind(this)

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }

    componentDidMount() {
        this.setState({validity: this.props.validity ? Object.values(this.props.validity) : ''})
    }

    checkSections(section) {
        if (section) {
            this.setState({check_section: "#ccd7f7"})

        } else {
            this.setState({check_section: "#000"})
        }
    }

    modalOpen() {
        this.setState({
            modal_open: true, ts: this.props.ts, type_no: this.props.type_no
        }, () => this.props.funcCountSeqSort(this.state.validity.length, this.state.count_criteria))
    }

    critNo(count_criteria) {
        this.setState({count_criteria: count_criteria}, () => this.props.funcCountSeqSort(this.state.validity.length - 1, this.state.count_criteria))
    }

    deleteApplicability() {
        apiService.deleteApplicability(this.props.art_no_id, this.props.type_no).then(() => {
            this.close()
            window.location.reload();
        })

    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    render() {

        return (
            <>
                <Accordion defaultActiveKey="0" style={{backgroundColor: this.state.check_section}}>
                    <AccordionItem>
                        <AccordionHeader>
                            <tr>
                                <td style={{borderTop: 0}}>
                                    <div>
                                        <span className="table__num gray-text">{this.props.num}</span>
                                    </div>
                                </td>
                                <td style={{borderTop: 0}}>
                                    <div>
                                        <span>{this.props.type_no}</span>
                                    </div>
                                </td>
                                <td style={{borderTop: 0}}>
                                    <div>
                                        <span>{this.props.ts}</span>
                                    </div>
                                </td>
                                <td style={{borderTop: 0}}>
                                    <div>
                                        <span>{this.props.brand}</span>
                                    </div>
                                </td>
                                <td style={{borderTop: 0}}>
                                    <div>
                                        <span>{this.props.model}</span>
                                    </div>
                                </td>
                                <td style={{borderTop: 0}}>
                                    <div className="table__td">
                                        <span>{this.props.type}</span>

                                    </div>
                                </td>
                                <td style={{borderTop: 0}}>
                                    <div className="table__nav" style={{right: -100}}>
                                        <button
                                            onClick={this.open}
                                            className="table__delete delete-param-btn"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.125 7.62068L14.875 15.1876C14.8537 15.8356 14.5807 16.4499 14.114 16.8999C13.6472 17.35 13.0234 17.6005 12.375 17.5982H7.62502C6.97703 17.6005 6.35361 17.3504 5.88692 16.9008C5.42023 16.4513 5.14695 15.8377 5.12502 15.1901L4.87502 7.62068C4.86955 7.45491 4.93015 7.29377 5.04349 7.17269C5.15683 7.05161 5.31363 6.98052 5.47939 6.97505C5.64515 6.96958 5.8063 7.03018 5.92737 7.14352C6.04845 7.25687 6.11955 7.41366 6.12502 7.57942L6.37502 15.1482C6.38747 15.4713 6.52464 15.777 6.75772 16.0011C6.99081 16.2252 7.30167 16.3503 7.62502 16.3501H12.375C12.6988 16.3503 13.01 16.2249 13.2432 16.0002C13.4763 15.7756 13.6132 15.4692 13.625 15.1457L13.875 7.57942C13.8805 7.41366 13.9516 7.25687 14.0727 7.14352C14.1937 7.03018 14.3549 6.96958 14.5206 6.97505C14.6864 6.98052 14.8432 7.05161 14.9565 7.17269C15.0699 7.29377 15.1305 7.45491 15.125 7.62068ZM15.9519 5.10255C15.9519 5.26831 15.886 5.42728 15.7688 5.54449C15.6516 5.6617 15.4927 5.72755 15.3269 5.72755H4.67377C4.50801 5.72755 4.34904 5.6617 4.23183 5.54449C4.11461 5.42728 4.04877 5.26831 4.04877 5.10255C4.04877 4.93679 4.11461 4.77782 4.23183 4.66061C4.34904 4.5434 4.50801 4.47755 4.67377 4.47755H6.61127C6.8093 4.47808 7.00044 4.40492 7.1475 4.2723C7.29457 4.13968 7.38703 3.95708 7.40689 3.76005C7.45301 3.29785 7.66956 2.86938 8.01433 2.55812C8.3591 2.24685 8.8074 2.07509 9.27189 2.0763H10.7281C11.1926 2.07509 11.6409 2.24685 11.9857 2.55812C12.3305 2.86938 12.547 3.29785 12.5931 3.76005C12.613 3.95708 12.7055 4.13968 12.8525 4.2723C12.9996 4.40492 13.1907 4.47808 13.3888 4.47755H15.3263C15.492 4.47755 15.651 4.5434 15.7682 4.66061C15.8854 4.77782 15.9513 4.93679 15.9513 5.10255H15.9519ZM8.49189 4.47755H11.5094C11.4273 4.28989 11.3735 4.09104 11.35 3.88755C11.3345 3.73349 11.2624 3.59067 11.1476 3.48674C11.0329 3.38282 10.8836 3.3252 10.7288 3.32505H9.27252C9.11768 3.3252 8.96842 3.38282 8.85364 3.48674C8.73887 3.59067 8.66675 3.73349 8.65127 3.88755C8.62754 4.09107 8.57361 4.28992 8.49127 4.47755H8.49189ZM9.12127 13.9469V8.62505C9.12127 8.45929 9.05542 8.30032 8.93821 8.18311C8.821 8.0659 8.66203 8.00005 8.49627 8.00005C8.33051 8.00005 8.17154 8.0659 8.05433 8.18311C7.93712 8.30032 7.87127 8.45929 7.87127 8.62505V13.9494C7.87127 14.1152 7.93712 14.2742 8.05433 14.3914C8.17154 14.5086 8.33051 14.5744 8.49627 14.5744C8.66203 14.5744 8.821 14.5086 8.93821 14.3914C9.05542 14.2742 9.12127 14.1152 9.12127 13.9494V13.9469ZM12.13 13.9469V8.62505C12.13 8.45929 12.0642 8.30032 11.947 8.18311C11.8297 8.0659 11.6708 8.00005 11.505 8.00005C11.3393 8.00005 11.1803 8.0659 11.0631 8.18311C10.9459 8.30032 10.88 8.45929 10.88 8.62505V13.9494C10.88 14.1152 10.9459 14.2742 11.0631 14.3914C11.1803 14.5086 11.3393 14.5744 11.505 14.5744C11.6708 14.5744 11.8297 14.5086 11.947 14.3914C12.0642 14.2742 12.13 14.1152 12.13 13.9494V13.9469Z"
                                                    fill="white"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </AccordionHeader>
                        <AccordionBody>

                            {this.state.validity.length !== 0 ?
                                <>
                                    <Button
                                        onClick={this.modalOpen}
                                        className="data-block__add-btn btn btn-blue"
                                        style={{marginLeft: 1035, minWidth: 200, backgroundColor: '#6D71F9'}}
                                    >
                                        Добавить секцию
                                    </Button>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>
                                                <div className="table__th">
                                                    <span>Номер критерия</span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="table__th">
                                                    <span>Критерий</span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="table__th">
                                                    <span>Значение критерия</span>
                                                </div>
                                            </th>

                                        </tr>
                                        </thead>
                                    </Table>
                                </>
                                :

                                <Button
                                    onClick={this.modalOpen}
                                    className="data-block__add-btn btn btn-blue"
                                    style={{marginLeft: 1035, minWidth: 200, backgroundColor: '#6D71F9'}}
                                >
                                    Добавить секцию
                                </Button>
                            }
                            {this.state.validity.length !== 0 ? this.state.validity.map((sections, index) =>
                                <Section
                                    ts={this.props.ts}
                                    type_no={this.props.type_no}
                                    index={index}
                                    sections={sections}
                                    funcSections={this.checkSections}
                                    funcAddSection={this.props.funcAddSection}
                                    new_section={this.props.new_section}
                                    funcCritNo={this.critNo}
                                />
                            ) : ''}

                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
                <ModalAddCriteria
                    ts={this.props.ts}
                    type_no={this.props.type_no}
                    modal_open={this.state.modal_open}
                    modal_close={() => this.setState({modal_open: false})}
                    funcAddSection={this.props.funcAddSection}
                />

                <>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Удаление</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы уверены, что хотите удалить
                            применимость <b>{this.props.type_no}</b> ?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.close}>
                                Закрыть
                            </Button>
                            <Button variant="danger" onClick={this.deleteApplicability}>
                                Удалить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>

            </>
        );
    }
}


export default ValidityItem;
