import Select from 'react-select';
import ReferenceItem from "./ReferenceItem";
import React, { useRef } from "react";

import './Reference.scss';
import {useState} from "react";
import AsyncSelect from "react-select/async";


function Reference() {
    const references = [
        {id: '1', refId: 'MC807966',country: 'GUS',madeBy: 'Honda'},
        {id: '2', refId: 'MC807966',country: 'GUS',madeBy: 'Honda'},
        {id: '3', refId: 'MC807966',country: 'GUS',madeBy: 'Honda'},
        {id: '4', refId: 'MC807966',country: 'GUS',madeBy: 'Honda'},
    ]
    const [referencesArray, setReferencesArray] = useState(references);
    const [referenceNum, setReferenceNum] = useState('');
    const [referenceCountry, setReferenceCountry] = useState({});
    const [referenceMaker, setReferenceMaker] = useState({});
    const countries = [
        { value: '1', label: 'Россия',name: 'RUS' },
        { value: '2', label: 'Грузия',name: 'GUS' },
        { value: '3', label: 'Германия',name: 'GER' },
        { value: '4', label: 'Китай',name: 'CHI' },
        { value: '5', label: 'Япония',name: 'JPN' },
        { value: '6', label: 'Дания',name: 'DEN' },
        { value: '7', label: 'Италия',name: 'ITA' },
    ]

    const makers = [
        { value: '1', label: 'Honda' },
        { value: '2', label: 'Honda2' },
        { value: '3', label: 'Honda3' },
    ]

    const selectCountryRef  = useRef();
    const selectMakerRef  = useRef();

    const deleteReference = (id)=> {
        setReferencesArray(referencesArray.filter(el => el.id != id))
    }

   const addNewReference =()=> {
        if(referenceNum === "" || referenceCountry.name === "" || referenceMaker.label === ""){
            return
        }
        setReferencesArray(
            [...referencesArray,
                {
                    refId: referenceNum,
                    country: referenceCountry.name,
                    madeBy: referenceMaker.label
                }]
        )
       setReferenceNum('')
       setReferenceCountry({})
       setReferenceMaker({})
       selectCountryRef.current.clearValue();
       selectMakerRef.current.clearValue();
    }

    return (
        <>
            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Референсы </div>
                </div>

                <div className="data-block__content">
                    <div className="data-block__grid data-block__grid--reference">
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Референс </label>
                            <input
                                type="text"
                                value={referenceNum}
                                onChange={el =>setReferenceNum(el.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Страна </label>
                            <Select
                                ref={selectCountryRef}
                                classNamePrefix="select"
                                isSearchable={true}
                                name="country"
                                options={countries}
                                placeholder={''}
                                onChange={(el)=> setReferenceCountry(el)  }
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Производитель  </label>
                            <Select
                                ref={selectMakerRef}
                                classNamePrefix="select"
                                isSearchable={true}
                                name="maker"
                                options={makers}
                                placeholder={''}
                                onChange={(el)=> setReferenceMaker(el)  }
                            />
                        </fieldset>
                        <button
                            onClick={addNewReference}
                            className="data-block__add-btn btn btn-blue"
                        >
                            Добавить
                        </button>

                    </div>
                    <div className="table reference-table">
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
                                        <span>Референс</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="table__th">
                                        <span>Страна</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="table__th">
                                        <span>Производитель</span>
                                    </div>
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {referencesArray.map((reference,index) =>
                                <ReferenceItem
                                    id={reference.id}
                                    deleteFunc={deleteReference}
                                    key={index}
                                    num={index+1}
                                    refId={reference.refId}
                                    country={reference.country}
                                    madeBy={reference.madeBy}
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


export default Reference;
