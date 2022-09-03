import {Component} from "react";
import './MainData.scss';
import Select from "react-select";

class MainData extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    render() {

        return (

            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Основные данные</div>
                </div>
                <div className="data-block__content">
                    <div className="data-block__grid data-block__grid--maindata">
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Артикул </label>
                            <input type="text" value={this.props.article.art_no}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Бренд</label>
                            <Select
                                classNamePrefix="select"
                                isSearchable={true}
                                name="numsOfRows"
                                options={this.props.brands}
                                value={this.props.brand}
                                placeholder={""}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>QuantUnit </label>
                            <input type="text" value={this.props.article.quant_unit}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>QuantPerUnit </label>
                            <input type="text" value={this.props.article.quant_per_unit}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Статус</label>
                            <input type="text" value={this.props.article.art_stat}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Дата</label>
                            <input type="text" value={this.props.article.status_dat}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6">
                            <label>Страны</label>
                            <Select
                                classNamePrefix="select"
                                classPrefix="multi-select"
                                isMulti
                                isSearchable={true}
                                name="countries"
                                options={this.props.all_countries}
                                value={this.props.countries}
                                placeholder={''}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GTIN </label>
                            <input type="text" value={this.props.article.gtin}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GenArtNo</label>
                            <input type="text" value={this.props.article.gen_art_no}/>

                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6">
                            <label>Замены (SupersNo)</label>
                            <Select
                                classNamePrefix="select"
                                classPrefix="multi-select"
                                isMulti
                                isSearchable={true}
                                name="SupersNo"
                                options={this.props.SupersNo}
                                placeholder={''}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6">
                            <label>Торговые номера (TradeNo) </label>
                            <Select
                                classNamePrefix="select"
                                classPrefix="multi-select"
                                isMulti
                                isSearchable={true}
                                name="TradeNo"
                                options={this.props.TradeNo}
                                placeholder={this.props.article.art_no}
                            />
                        </fieldset>
                    </div>
                </div>

            </div>

        );
    }

}

export default MainData;
