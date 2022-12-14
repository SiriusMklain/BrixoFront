import Select from 'react-select';
import ValidityItem from "./ValidityItem";

import './Validity.scss';
import React, {Component} from "react";
import ApiService from "../../../util/ApiService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ValiditySearch from "./ValiditySearch";

const apiService = new ApiService();

class Validity extends Component {
    constructor(props) {
        super(props);
        this.makerValue = React.createRef();
        this.vehicleValue = React.createRef();
        this.typeValue = React.createRef();
        this.state = {
            applicability: [],
            makers: [],
            maker_value: '',
            vehicles: [],
            vehicle_value: '',
            type: [],
            type_value: '',
            sort_no: '',
            ts: '',
            type_no: '',
            sections: [],
            count_section: 0,
            count_criteria: 0,
            modal_open: false,
        }
        this.searchVehicle = this.searchVehicle.bind(this)
        this.setValueMaker = this.setValueMaker.bind(this)
        this.setValueVehicle = this.setValueVehicle.bind(this)
        this.searchType = this.searchType.bind(this)

        this.changeSortNo = this.changeSortNo.bind(this)
        this.changeTS = this.changeTS.bind(this)
        this.addApplicability = this.addApplicability.bind(this)
        this.addSection = this.addSection.bind(this)

        this.countSeqSort = this.countSeqSort.bind(this)

        this.modalOpen = this.modalOpen.bind(this)
        this.modalClose = this.modalClose.bind(this);

    }

    componentDidMount() {
        this.getApplicability()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({makers: nextProps.makers}, () => this.getApplicability())
    }

    modalOpen() {
        this.setState({modal_open: true})
    }

    modalClose() {
        this.setState({modal_open: false})
    }

    changeSortNo(e) {
        this.setState({sort_no: e.target.value})
    }

    changeTS(e) {
        this.setState({ts: e.target.value})
    }

    getApplicability() {
        apiService.getApplicability(this.props.art_no_id).then((result) => {
            this.setState({applicability: result.vehicles})
        })
    }

    addApplicability() {
        apiService.createApplicability(
            this.props.art_no_id, this.props.gen_art_no, this.state.ts, this.state.type_no, this.state.sort_no
        ).then(() => {
                window.location.reload();
                // this.getApplicability()
            }
        )
    }

    addSection(crit_no, crit_val, ts, type_no, validity = 0) {
        apiService.createSection(
            this.props.art_no_id, crit_no, crit_val, this.props.gen_art_no, ts, type_no, validity === 0 ?
                this.state.count_section + 1 : validity, this.state.count_criteria + 1
        ).then((result) => {
                window.location.reload();
                // this.setState({sections: {"sort_no": result.sort_no, "crit_no": result.crit_no, "crit_val": result.crit_val}})
            }
        )
    }

    setValueMaker(e) {
        try {
            this.setState({maker_value: e.label}, () => this.searchVehicle())
        } catch (e) {
        }
    }

    setValueVehicle(e) {
        try {

            this.setState({vehicle_value: e.label}, () => this.searchType())
        } catch (e) {
            console.log("error", e.label)

        }
    }

    searchVehicle() {
        const self = this;
        if (this.state.maker_value !== '') {
            apiService.searchVehicles(this.state.maker_value).then(function (result) {

                let vehicles = [];
                result.list_model.forEach(function (item, index) {
                    vehicles.push({"value": index + 1, "label": item.name_model})
                });
                self.setState({vehicles: vehicles})
            });
        }
    }

    searchType(type_no) {
            this.setState({type_no: type_no}, ()=>{
                 this.modalClose()
            })



        const self = this;
        if (this.state.vehicle_value !== '') {
            apiService.searchType(this.state.maker_value, this.state.vehicle_value).then(function (result) {
                let type = [];
                result.list_type.forEach(function (item, index) {
                    type.push({
                        "value": index + 1,
                        "label": item.engine + ", " +
                            item.ls_ls + ", " +
                            item.model_id + ", " +
                            item.name_type + ", " +
                            item.type_no + ", " +
                            item.year,
                        "type_no": item.type_no,
                        "type_engine": item.engine,
                        "type_ls_ls": item.ls_ls,
                        "type_name": item.type_no,
                        "type_year": item.year,

                    })

                });
                self.setState({type: type})
            });
        }
    }

    countSeqSort(count_section = 0, count_criteria = 0) {
        this.setState({
            count_section: count_section,
            count_criteria: count_criteria
        })
    }


    render() {
        return (
            <>
                <div className="data-block">
                    <div className="data-block__head">
                        <div className="data-block__title">????????????????????????</div>
                    </div>

                    <div className="data-block__content">
                        <div className="data-block__grid data-block__grid--validity2">

                            <fieldset className="fg data-block__col data-block__col3">
                                <label>SortNo ?????? 404</label>
                                <input type="text"
                                       onChange={this.changeSortNo}
                                />
                            </fieldset>

                            <fieldset className="fg data-block__col data-block__col4">
                                <label>????</label>
                                <input type="text"
                                       onChange={this.changeTS}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col6">
                                <label>?????????????????????????? </label>
                                <Select
                                    ref={this.makerValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="maker"
                                    options={this.state.makers}
                                    onChange={this.setValueMaker}
                                    onInputChange={this.props.funcSearchMakers}
                                    placeholder={'??????????'}
                                />
                            </fieldset>
                        </div>
                        <div className="data-block__grid data-block__grid--validity">
                            <fieldset className="fg data-block__col data-block__col7">
                                <label>???????????? </label>
                                <Select
                                    ref={this.vehicleValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="vehicle"
                                    options={this.state.vehicles}
                                    onChange={this.setValueVehicle}
                                    onInputChange={''}
                                    placeholder={'??????????'}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col6">
                                <label>?????? </label>
                                <input type="text"
                                       value={this.state.type_no}
                                       onClick={this.modalOpen}
                                       onKeyDown={this.enterUpdate}
                                       placeholder={"??????????"}
                                />
                            </fieldset>
                            <Button
                                onClick={this.addApplicability}
                                className="data-block__add-btn btn btn-blue"
                                style={{marginRight: 7, minWidth: 150, backgroundColor: '#6D71F9'}}
                            >
                                ????????????????
                            </Button>

                        </div>
                        <div className="table validity-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <div className="table__th">
                                            <span className="table__num">???</span>
                                            <button className="table__sort">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M4 0L0 2.91517L1.13934 4.54264L3.01991 3.17209V10H4.98009V3.17209L6.86066 4.54264L8 2.91517L4 0Z"
                                                          fill="#CA003D"/>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M12 16L16 13.0848L14.8607 11.4574L12.9801 12.8279L12.9801 5.99998L11.0199 5.99998L11.0199 12.8279L9.13934 11.4574L8 13.0848L12 16Z"
                                                          fill="#BBBCD1"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>??????????</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>????</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>??????????????????????????</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>????????????</span>
                                        </div>
                                    </th>
                                    <th style={{width: 160}}>
                                        <div className="table__th">
                                            <span>??????</span>
                                        </div>
                                    </th>
                                    <th style={{width: 190}}>
                                        <div className="table__th">
                                            <span>??????????????????</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>??.??.</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>?????? ??????????????</span>
                                        </div>
                                    </th>

                                </tr>
                                </thead>
                            </table>
                            <table>
                                <tbody>
                                {this.state.applicability.map((validity, index) =>
                                    <ValidityItem
                                        index={index}
                                        ts={validity.ts}
                                        type_no={validity.type_no}
                                        brand={validity.brand}
                                        model={validity.model}
                                        type={validity.type}
                                        validity={validity.sections}
                                        funcAddSection={this.addSection}
                                        funcCountSeqSort={this.countSeqSort}
                                        new_section={this.state.sections}
                                        art_no_id={this.props.art_no_id}
                                    />
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Modal size="lg" centered show={this.state.modal_open} onHide={this.modalClose}>

                    <Modal.Body>
                        <div className="table validity-table">
                            <table>
                                <thead>
                                <tr>
                                    <th style={{width: 160}}>
                                        <div className="table__th">
                                            <span>??????</span>
                                        </div>
                                    </th>
                                    <th style={{width: 190}}>
                                        <div className="table__th">
                                            <span>??????????????????</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>??.??.</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>?????? ??????????????</span>
                                        </div>
                                    </th>

                                </tr>
                                </thead>
                            </table>
                            <table>
                                <tbody>
                                {this.state.type.map((type, index) =>
                                    <ValiditySearch
                                        index={index}
                                        type={type}
                                        funcSearchType={this.searchType}
                                    />
                                )}
                                {/*<Select*/}
                                {/*    ref={this.typeValue}*/}
                                {/*    classNamePrefix="select"*/}
                                {/*    isSearchable={true}*/}
                                {/*    name="type"*/}
                                {/*    options={this.state.type}*/}
                                {/*    onChange={this.searchType}*/}
                                {/*    onInputChange={''}*/}
                                {/*/>*/}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}


export default Validity;
