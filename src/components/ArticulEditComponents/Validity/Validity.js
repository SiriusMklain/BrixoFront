import Select from 'react-select';
import ValidityItem from "./ValidityItem";

import './Validity.scss';
import React, {Component, useRef, useState} from "react";
import ApiService from "../../../util/ApiService";
import {store} from "../../../redux/store";

const apiService = new ApiService();

class Validity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicability: []
        }
    }

    componentDidMount() {
        apiService.getApplicability(this.props.art_no_id).then((result) => {
            this.setState({applicability: result.vehicles})
        })

    }

    // deleteValidity = (id) => {
    //     setValidities(validities.filter(el => el.id !== id))
    // }

    // addNewValidity = () => {
    //     if (
    //         validityts.label === "" ||
    //         validitybrand.label === "" ||
    //         validityModel.label === "" ||
    //         validityType.label === ""
    //     ) {
    //         return
    //     }
    //     setValidities(
    //         [...validities,
    //             {
    //                 id: Math.floor(100000 + Math.random() * 900000),
    //                 ts: validityts.label,
    //                 brand: validitybrand.label,
    //                 model: validityModel.label,
    //                 type: validityType.label
    //             }]
    //     )
    //     setValidityts({})
    //     setValiditybrand({})
    //     setValidityModel({})
    //     setValidityType({})
    //     selectValidityts.current.clearValue();
    //     selectValidityModel.current.clearValue();
    //     selectValiditybrand.current.clearValue();
    //     selectValidityType.current.clearValue();
    // }

    render() {
        return (
            <>
                <div className="data-block">
                    <div className="data-block__head">
                        <div className="data-block__title">Применимость</div>
                    </div>

                    <div className="data-block__content">
                        <div className="data-block__grid data-block__grid--validity">
                            <fieldset className="fg data-block__col data-block__col2">
                                <label>ТС</label>
                                <Select
                                    // ref={selectValidityts}
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={false}
                                    name="country"
                                    // options={ts}
                                    placeholder={'Не выбрано'}
                                    // onChange={(el) => setValidityts(el)}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col3">
                                <label>Производитель </label>
                                <Select
                                    // ref={selectValiditybrand}
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={false}
                                    name="country"
                                    // options={brands}
                                    placeholder={'Не выбрано'}
                                    // onChange={(el) => setValiditybrand(el)}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col3">
                                <label>Модель </label>
                                <Select
                                    // ref={selectValidityModel}
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={false}
                                    name="brand"
                                    // options={model}
                                    placeholder={'Не выбрано'}
                                    // onChange={(el) => setValidityModel(el)}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col2">
                                <label>Тип </label>
                                <Select
                                    // ref={selectValidityType}
                                    classNamePrefix="select"
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={false}
                                    name="country"
                                    // options={type}
                                    placeholder={'Не выбрано'}
                                    // onChange={(el) => setValidityType(el)}
                                />
                            </fieldset>
                            <button
                                // onClick={addNewValidity}
                                className="data-block__add-btn btn btn-blue"
                            >
                                Добавить
                            </button>

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
                                            {/*<div className="table__check check">*/}
                                            {/*    <input type="checkbox"/>*/}
                                            {/*    <label></label>*/}
                                            {/*</div>*/}
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
