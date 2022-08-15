import Select from 'react-select';
import ReferenceItem from "./ReferenceItem";

import './Reference.scss';


function Reference() {
    const countries = [
        { value: '1', label: 'Россия' },
        { value: '2', label: 'Грузия' },
        { value: '3', label: 'Германия' },
        { value: '4', label: 'Китай' },
        { value: '5', label: 'Япония' },
        { value: '6', label: 'Дания' },
        { value: '7', label: 'Италия' },
    ]

    const makers = [
        { value: '1', label: 'Honda' },
        { value: '2', label: 'Honda2' },
        { value: '3', label: 'Honda3' },
    ]

    const references = [
        {id: 'MC807966',country: 'GUS',madeBy: 'Honda'},
        {id: 'MC807966',country: 'GUS',madeBy: 'Honda'},
        {id: 'MC807966',country: 'GUS',madeBy: 'Honda'},
        {id: 'MC807966',country: 'GUS',madeBy: 'Honda'},
    ]

    return (
        <>
            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Референсы </div>
                </div>

                <div className="data-block__content">
                    <div className="data-block__grid">
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Референс </label>
                            <input type="text"/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Страна </label>
                            <Select
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                name="country"
                                options={countries}
                                placeholder={''}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>Производитель  </label>
                            <Select
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                name="maker"
                                options={makers}
                                placeholder={''}
                            />
                        </fieldset>
                        <button className="data-block__add-btn btn btn-blue">Добавить</button>

                    </div>
                    <div className="table">
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
                            {references.map((reference,index) =>
                                <ReferenceItem
                                    key={index}
                                    num={index+1}
                                    id={reference.id}
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
