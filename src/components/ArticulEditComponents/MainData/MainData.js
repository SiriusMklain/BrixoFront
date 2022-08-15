import './MainData.scss';
import Select from "react-select";
function MainData() {
    const brands = [
        { value: '1', label: 'Js' },
        { value: '2', label: 'Js2' },
        { value: '3', label: 'Js3' }
    ]

    const countries = [
        { value: '1', label: 'Россия' },
        { value: '2', label: 'Грузия' },
        { value: '3', label: 'Германия' },
        { value: '4', label: 'Китай' },
        { value: '5', label: 'Япония' },
        { value: '6', label: 'Дания' },
        { value: '7', label: 'Италия' },
    ]

    const GenArtNo = [
        { value: '1', label: 'Колодки (454212)' },
        { value: '2', label: 'Колодки (454212) 2' },
        { value: '3', label: 'Колодки (454212) 3' }
    ]

    const SupersNo = [
        { value: '1', label: 'BL1059W' },
        { value: '2', label: 'BL1059W2' },
        { value: '3', label: 'BL1059W3' },
        { value: '4', label: 'BL1059W4' },
    ]

    const TradeNo = [
        { value: '1', label: 'BL1059W' },
        { value: '2', label: 'BL1059W2' },
        { value: '3', label: 'BL1059W3' },
        { value: '4', label: 'BL1059W4' },
    ]

    return (
        <div className="data-block">
            <div className="data-block__head">
                <div className="data-block__title">Основные данные</div>
            </div>
            <div className="data-block__content">
                <div className="data-block__grid">
                    <fieldset className="fg data-block__col data-block__col2">
                        <label>Артикул </label>
                        <input type="text"/>
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col2">
                        <label>Бренд</label>
                        <Select
                            classNamePrefix="select"
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={false}
                            name="numsOfRows"
                            options={brands}
                            defaultValue={brands[0]}
                            placeholder={''}
                        />
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col2">
                        <label>QuantUnit </label>
                        <input type="text"/>
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col2">
                        <label>QuantPerUnit  </label>
                        <input type="text"/>
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col2">
                        <label>Статус</label>
                        <input type="text"/>
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col2">
                        <label>Дата</label>
                        <input type="date"/>
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col6">
                        <label>Страны</label>
                        <Select
                            classNamePrefix="select"
                            classPrefix="multi-select"
                            isMulti
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={false}
                            name="numsOfRows"
                            options={countries}
                            placeholder={''}
                        />
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col3">
                        <label>GTIN  </label>
                        <input type="text"/>
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col3">
                        <label>GenArtNo</label>
                        <Select
                            classNamePrefix="select"
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={false}
                            name="numsOfRows"
                            options={GenArtNo}
                            placeholder={''}
                            placeholder={''}
                        />
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col6">
                        <label>Замены (SupersNo)</label>
                        <Select
                            classNamePrefix="select"
                            classPrefix="multi-select"
                            isMulti
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={false}
                            name="numsOfRows"
                            options={SupersNo}
                            placeholder={''}
                        />
                    </fieldset>
                    <fieldset className="fg data-block__col data-block__col6">
                        <label>Торговые номера (TradeNo) </label>
                        <Select
                            classNamePrefix="select"
                            classPrefix="multi-select"
                            isMulti
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={false}
                            name="numsOfRows"
                            options={TradeNo}
                            placeholder={''}
                        />
                    </fieldset>
                </div>
            </div>
        </div>

    );
}


export default MainData;
