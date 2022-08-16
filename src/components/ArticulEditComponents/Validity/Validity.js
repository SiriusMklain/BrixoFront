import Select from 'react-select';
import ValidityItem from "./ValidityItem";

import './Validity.scss';
import React, {useRef, useState} from "react";


function Validity() {
    const [validities, setValidities] = useState([
            {id: '1', tc: 'Легк',maker: 'Honda',model: 'Land Cruiser 200',type: '2008, 1VD-FTV'},
            {id: '2', tc: 'Легк',maker: 'Honda',model: 'Land Cruiser 200',type: '2008, 1VD-FTV'},
            {id: '3', tc: 'Легк',maker: 'Honda',model: 'Land Cruiser 200',type: '2008, 1VD-FTV'},
            {id: '4', tc: 'Легк',maker: 'Honda',model: 'Land Cruiser 200',type: '2008, 1VD-FTV'},
        ]
    );
    const [validityTc, setValidityTc] = useState({});
    const [validityMaker, setValidityMaker] = useState({});
    const [validityModel, setValidityModel] = useState({});
    const [validityType, setValidityType] = useState({});

    const selectValidityTc  = useRef();
    const selectValidityMaker  = useRef();
    const selectValidityModel  = useRef();
    const selectValidityType  = useRef();

    const tc = [
        { value: '1', label: 'TC' },
        { value: '2', label: 'TC2' },
        { value: '3', label: 'TC3' },
    ]

    const makers = [
        { value: '1', label: 'Honda' },
        { value: '2', label: 'Honda2' },
        { value: '3', label: 'Honda3' },
    ]

    const model = [
        { value: '1', label: 'model' },
        { value: '2', label: 'model2' },
        { value: '3', label: 'model3' },
    ]

    const type = [
        { value: '1', label: 'type' },
        { value: '2', label: 'type2' },
        { value: '3', label: 'type3' },
    ]

    const deleteValidity = (id)=> {
        setValidities(validities.filter(el => el.id !== id))
    }

    const addNewValidity = ()=> {
        if(
            validityTc.label === "" ||
            validityMaker.label === "" ||
            validityModel.label === "" ||
            validityType.label === ""
        ){
            return
        }
        setValidities(
            [...validities,
                {
                    id: Math.floor(100000+Math.random() * 900000),
                    tc: validityTc.label,
                    maker: validityMaker.label,
                    model: validityModel.label,
                    type: validityType.label
                }]
        )
        setValidityTc({})
        setValidityMaker({})
        setValidityModel({})
        setValidityType({})
        selectValidityTc.current.clearValue();
        selectValidityModel.current.clearValue();
        selectValidityMaker.current.clearValue();
        selectValidityType.current.clearValue();
    }

    return (
        <>
            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Применимость</div>
                </div>

                <div className="data-block__content">
                    <div className="data-block__grid data-block__grid--validity">
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>TC </label>
                            <Select
                                ref={selectValidityTc}
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                name="country"
                                options={tc}
                                placeholder={'Не выбрано'}
                                onChange={(el)=> setValidityTc(el)  }
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Производитель  </label>
                            <Select
                                ref={selectValidityMaker}
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                name="country"
                                options={makers}
                                defaultValue={makers[0]}
                                placeholder={'Не выбрано'}
                                onChange={(el)=> setValidityMaker(el)  }
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Модель </label>
                            <Select
                                ref={selectValidityModel}
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                name="maker"
                                options={model}
                                placeholder={'Не выбрано'}
                                onChange={(el)=> setValidityModel(el)  }
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Тип </label>
                            <Select
                                ref={selectValidityType}
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                name="country"
                                options={type}
                                placeholder={'Не выбрано'}
                                onChange={(el)=> setValidityType(el)  }
                            />
                        </fieldset>
                        <button
                            onClick={addNewValidity}
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
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4 0L0 2.91517L1.13934 4.54264L3.01991 3.17209V10H4.98009V3.17209L6.86066 4.54264L8 2.91517L4 0Z" fill="#CA003D"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 16L16 13.0848L14.8607 11.4574L12.9801 12.8279L12.9801 5.99998L11.0199 5.99998L11.0199 12.8279L9.13934 11.4574L8 13.0848L12 16Z" fill="#BBBCD1"/>
                                            </svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="table__th">
                                        <div className="table__check check">
                                            <input type="checkbox"/>
                                            <label></label>
                                        </div>
                                        <span>TC</span>
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
                            {validities.map((validity,index) =>
                                <ValidityItem
                                    id={validity.id}
                                    key={index}
                                    num={index+1}
                                    tc={validity.tc}
                                    maker={validity.maker}
                                    model={validity.model}
                                    type={validity.type}
                                    deleteFunc={deleteValidity}
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


export default Validity;
