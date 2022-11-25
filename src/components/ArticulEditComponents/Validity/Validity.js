import Select from 'react-select';
import ValidityItem from "./ValidityItem";

import './Validity.scss';
import React, {Component, useRef, useState} from "react";
import ApiService from "../../../util/ApiService";
import Button from "react-bootstrap/Button";

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
        }
        this.searchVehicle = this.searchVehicle.bind(this)
        this.setValueMaker = this.setValueMaker.bind(this)
        this.setValueVehicle = this.setValueVehicle.bind(this)
        this.searchType = this.searchType.bind(this)

        this.changeSortNo = this.changeSortNo.bind(this)
        this.changeTS = this.changeTS.bind(this)
        this.addApplicability = this.addApplicability.bind(this)
    }

    componentDidMount() {
        apiService.getApplicability(this.props.art_no_id).then((result) => {
            this.setState({applicability: result.vehicles})
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({makers: nextProps.makers})
    }

    changeSortNo(e) {
        this.setState({sort_no: e.target.value})
    }

    changeTS(e) {
        this.setState({ts: e.target.value})
    }


    addApplicability() {
        apiService.createApplicability(
            this.state.sort_no, this.state.ts, this.state.maker_value, this.state.vehicle_value, this.state.type_value
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

            this.setState({vehicle_value: e.label}, () =>  this.searchType())
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

    searchType() {

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
                                 item.year})
                });
                self.setState({type: type})
            });
        }
    }


    render() {
        return (
            <>
                <div className="data-block">
                    <div className="data-block__head">
                        <div className="data-block__title">Применимость</div>
                    </div>

                    <div className="data-block__content">
                        <div className="data-block__grid data-block__grid--validity2">

                            <fieldset className="fg data-block__col data-block__col3">
                                <label>SortNo для 404</label>
                                <input type="text"
                                    onChange={this.changeSortNo}
                                />
                            </fieldset>

                            <fieldset className="fg data-block__col data-block__col4">
                                <label>ТС</label>
                                <input type="text"
                                    onChange={this.changeTS}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col6">
                                <label>Производитель </label>
                                <Select
                                    ref={this.makerValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="maker"
                                    options={this.state.makers}
                                    onChange={this.setValueMaker}
                                    onInputChange={this.props.funcSearchMakers}
                                    placeholder={'Поиск'}
                                />
                            </fieldset>
                        </div>
                        <div className="data-block__grid data-block__grid--validity">
                            <fieldset className="fg data-block__col data-block__col4">
                                <label>Модель </label>
                                <Select
                                    ref={this.vehicleValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="vehicle"
                                    options={this.state.vehicles}
                                    onChange={this.setValueVehicle}
                                    onInputChange={''}
                                    placeholder={'Поиск'}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col6">
                                <label>Тип </label>
                                <Select
                                    ref={this.typeValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="type"
                                    options={this.state.type}
                                    onChange={this.searchType}
                                    onInputChange={''}
                                />
                            </fieldset>
                            <Button
                                onClick={this.addApplicability}
                                className="data-block__add-btn btn btn-blue"
                                style={{marginRight: 7, minWidth: 150, backgroundColor: '#6D71F9'}}
                            >
                                Добавить
                            </Button>

                        </div>
                        <div className="table validity-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <div className="table__th">
                                            <span className="table__num">№</span>
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
                                            <span>Номер</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>ТС</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>Производитель</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>Модель</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>Тип</span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                            </table>
                            <table>
                                <tbody>
                                {this.state.applicability.map((validity, index) =>
                                    <ValidityItem
                                        // id={validity.id}
                                        key={index}
                                        num={index + 1}
                                        ts={validity.ts}
                                        type_no={validity.type_no}
                                        brand={validity.brand}
                                        model={validity.model}
                                        type={validity.type.type_engine + ', '
                                            + validity.type.type_ls_ls + ', '
                                            + validity.type.type_name + ', '
                                            + validity.type.type_year}
                                        validity={validity}
                                        // deleteFunc={deleteValidity}
                                    />
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }


}


export default Validity;
