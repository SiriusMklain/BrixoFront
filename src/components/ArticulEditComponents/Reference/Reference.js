import Select from 'react-select';
import ReferenceItem from "./ReferenceItem";
import React, {Component} from "react";

import './Reference.scss';
import ApiService from "../../../util/ApiService";

const apiService = new ApiService();

class Reference extends Component {
    constructor(props) {
        super(props);
        this.referenceValue = React.createRef();
        this.countryValue = React.createRef();
        this.makerValue = React.createRef();
        this.state = {
            reference: [],
            references: [],
            reference_value: '',
            all_countries: [],
            art_no: '',
            makers: [],
            country_value: '',
            maker_value: ''
        }
        this.deleteReference = this.deleteReference.bind(this);
        this.searchMakers = this.searchMakers.bind(this);
        this.searchReferences = this.searchReferences.bind(this);
        this.setValueReferense = this.setValueReferense.bind(this);
        this.setValueCountry = this.setValueCountry.bind(this);
        this.setValueMaker = this.setValueMaker.bind(this);

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({reference: nextProps.reference, art_no: nextProps.art_no})
    }

    deleteReference = (ref_no, index) => {
        let reference = this.state.reference.filter(el => el.ref_no !== ref_no)
        this.setState({reference: reference})
        this.deleteData(index)
    }

    deleteData(index) {
        apiService.deleteReference(this.props.art_no_id, this.state.reference[index])
    }

    setValueReferense(e) {
        try {
            this.setState({reference_value: e.label})
        } catch (e) {
        }
    }

    setValueCountry(e) {
        try {
            this.setState({country_value: e.label})
        } catch (e) {
        }
    }

    setValueMaker(e) {
        try {
            this.setState({maker_value: e.label})
        } catch (e) {
        }
    }

    addNewReference = () => {
        if (this.state.reference_value === "" || this.state.country_value === "" || this.state.maker_value === "") {
            return
        }
        let new_reference = {
            art_no_id: this.props.art_no_id * 1,
            country_code_id: {
                country_code: this.state.country_value,
                country_name: ""
            },
            man_no_id: {
                man_no: Math.floor(100000 + Math.random() * 900000),
                short_name: "",
                term_plain: this.state.maker_value,
            },
            ref_no: this.state.reference_value
        }
        this.setState({reference: [...this.state.reference, new_reference]}
        )
        apiService.saveReferences(this.props.art_no_id, this.state.reference_value, this.state.country_value, this.state.maker_value)

        this.setState({reference_value: '', country_value: '', maker_value: ''})

        this.referenceValue.current.clearValue()
        this.countryValue.current.clearValue()
        this.makerValue.current.clearValue()
    }

    getRefCountry(index) {
        let country_code = "Нет данных"
        try {
            country_code = this.state.reference[index].country_code_id.country_code
        } catch (e) {

        }
        return country_code
    }

    searchMakers(lexem) {
        const self = this;
        if (lexem.length > 2) {
            apiService.searchMakers(lexem).then(function (result) {
                let makers = [];
                result.ref_name.forEach(function (item, index) {
                    makers.push({"value": index + 1, "label": item.short_name})
                });
                self.setState({makers: makers})
            });
        }
    }

    searchReferences(lexem) {
        const self = this;
        if (lexem.length > 2) {
            apiService.searchReferences(lexem).then(function (result) {
                let references = [];
                result.ref_no.forEach(function (item, index) {
                    references.push({"value": index + 1, "label": item.ref_no})
                });
                self.setState({references: references})
            });
        }
    }

    render() {

        return (
            <>
                <div className="data-block">
                    <div className="data-block__head">
                        <div className="data-block__title">Референсы</div>
                    </div>
                    <div className="data-block__content">
                        <div className="data-block__grid data-block__grid--reference">
                            <fieldset className="fg data-block__col data-block__col3">
                                <label>Референс </label>
                                <Select
                                    ref={this.referenceValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="reference"
                                    options={this.state.references}
                                    onChange={this.setValueReferense}
                                    onInputChange={this.searchReferences}
                                    placeholder={'Поиск'}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col3">
                                <label>Страна </label>
                                <Select
                                    ref={this.countryValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="country"
                                    options={this.props.all_countries}
                                    onChange={this.setValueCountry}
                                    placeholder={'Поиск'}
                                />
                            </fieldset>
                            <fieldset className="fg data-block__col data-block__col3">
                                <label>Производитель </label>
                                <Select
                                    ref={this.makerValue}
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    name="maker"
                                    options={this.state.makers}
                                    onChange={this.setValueMaker}
                                    onInputChange={this.searchMakers}
                                    placeholder={'Поиск'}
                                />
                            </fieldset>
                            <button
                                onClick={this.addNewReference}
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
                                {this.state.reference.map((reference, index) =>
                                    <ReferenceItem
                                        index={index}
                                        id={reference.art_no_id}
                                        deleteFunc={this.deleteReference}
                                        key={index}
                                        num={index + 1}
                                        ref_no={reference.ref_no}
                                        man={reference.man_no_id}
                                        country={this.getRefCountry(index)}
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

// function Reference() {
//     const references = [
//         {id: '1', refId: 'MC807966', country: 'GUS', madeBy: 'Honda'},
//         {id: '2', refId: 'MC807966', country: 'GUS', madeBy: 'Honda'},
//         {id: '3', refId: 'MC807966', country: 'GUS', madeBy: 'Honda'},
//         {id: '4', refId: 'MC807966', country: 'GUS', madeBy: 'Honda'},
//     ]
//     const [referencesArray, setNewReference] = useState(references);
//     const [referenceNum, setReferenceNum] = useState('');
//     const [referenceCountry, setReferenceCountry] = useState({});
//     const [referenceMaker, setReferenceMaker] = useState({});
//     const countries = [
//         {value: '1', label: 'Россия', name: 'RUS'},
//         {value: '2', label: 'Грузия', name: 'GUS'},
//         {value: '3', label: 'Германия', name: 'GER'},
//         {value: '4', label: 'Китай', name: 'CHI'},
//         {value: '5', label: 'Япония', name: 'JPN'},
//         {value: '6', label: 'Дания', name: 'DEN'},
//         {value: '7', label: 'Италия', name: 'ITA'},
//     ]
//
//     const makers = [
//         {value: '1', label: 'Honda'},
//         {value: '2', label: 'Honda2'},
//         {value: '3', label: 'Honda3'},
//     ]
//
//     const selectCountryRef = useRef();
//     const selectMakerRef = useRef();
//
//     const deleteReference = (id) => {
//         setNewReference(referencesArray.filter(el => el.id !== id))
//     }
//
//     const addNewReference = () => {
//         if (referenceNum === "" || referenceCountry.name === "" || referenceMaker.label === "") {
//             return
//         }
//         setNewReference(
//             [...referencesArray,
//                 {
//                     id: Math.floor(100000 + Math.random() * 900000),
//                     refId: referenceNum,
//                     country: referenceCountry.name,
//                     madeBy: referenceMaker.label
//                 }]
//         )
//         setReferenceNum('')
//         setReferenceCountry({})
//         setReferenceMaker({})
//         selectCountryRef.current.clearValue();
//         selectMakerRef.current.clearValue();
//     }
//
//     return (
//         <>
//             <div className="data-block">
//                 <div className="data-block__head">
//                     <div className="data-block__title">Референсы</div>
//                 </div>
//
//                 <div className="data-block__content">
//                     <div className="data-block__grid data-block__grid--reference">
//                         <fieldset className="fg data-block__col data-block__col3">
//                             <label>Референс </label>
//                             <input
//                                 type="text"
//                                 value={referenceNum}
//                                 onChange={el => setReferenceNum(el.target.value)}
//                             />
//                         </fieldset>
//                         <fieldset className="fg data-block__col data-block__col3">
//                             <label>Страна </label>
//                             <Select
//                                 ref={selectCountryRef}
//                                 classNamePrefix="select"
//                                 isSearchable={true}
//                                 name="country"
//                                 options={countries}
//                                 placeholder={''}
//                                 onChange={(el) => setReferenceCountry(el)}
//                             />
//                         </fieldset>
//                         <fieldset className="fg data-block__col data-block__col3">
//                             <label>Производитель </label>
//                             <Select
//                                 ref={selectMakerRef}
//                                 classNamePrefix="select"
//                                 isSearchable={true}
//                                 name="maker"
//                                 options={makers}
//                                 placeholder={''}
//                                 onChange={(el) => setReferenceMaker(el)}
//                             />
//                         </fieldset>
//                         <button
//                             onClick={addNewReference}
//                             className="data-block__add-btn btn btn-blue"
//                         >
//                             Добавить
//                         </button>
//
//                     </div>
//                     <div className="table reference-table">
//                         <table>
//                             <thead>
//                             <tr>
//                                 <th>
//                                     <div className="table__th">
//                                         <span className="table__num">№</span>
//                                         <button className="table__sort">
//                                             <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//                                                  xmlns="http://www.w3.org/2000/svg">
//                                                 <path fillRule="evenodd" clipRule="evenodd"
//                                                       d="M4 0L0 2.91517L1.13934 4.54264L3.01991 3.17209V10H4.98009V3.17209L6.86066 4.54264L8 2.91517L4 0Z"
//                                                       fill="#CA003D"/>
//                                                 <path fillRule="evenodd" clipRule="evenodd"
//                                                       d="M12 16L16 13.0848L14.8607 11.4574L12.9801 12.8279L12.9801 5.99998L11.0199 5.99998L11.0199 12.8279L9.13934 11.4574L8 13.0848L12 16Z"
//                                                       fill="#BBBCD1"/>
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </th>
//                                 <th>
//                                     <div className="table__th">
//                                         <div className="table__check check">
//                                             <input type="checkbox"/>
//                                             <label></label>
//                                         </div>
//                                         <span>Референс</span>
//                                     </div>
//                                 </th>
//                                 <th>
//                                     <div className="table__th">
//                                         <span>Страна</span>
//                                     </div>
//                                 </th>
//                                 <th>
//                                     <div className="table__th">
//                                         <span>Производитель</span>
//                                     </div>
//                                 </th>
//                             </tr>
//                             </thead>
//
//                             <tbody>
//                             {referencesArray.map((reference, index) =>
//                                 <ReferenceItem
//                                     id={reference.id}
//                                     deleteFunc={deleteReference}
//                                     key={index}
//                                     num={index + 1}
//                                     refId={reference.refId}
//                                     country={reference.country}
//                                     madeBy={reference.madeBy}
//                                 />
//                             )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


export default Reference;
