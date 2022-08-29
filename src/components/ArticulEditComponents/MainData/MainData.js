import {Component} from "react";
import './MainData.scss';
import Select from "react-select";
import ApiService from "../../../util/ApiService";

const apiService = new ApiService();

class MainData extends Component {
    constructor(props) {
        super(props);
        const {id} = props
        this.id = id
        this.state = {
            article: [],
            brands: [],
            brand: [],
            countries: [],
            GenArtNo: [
                {value: '1', label: '25'},
                {value: '2', label: '7'},
                {value: '3', label: '6'}
            ],
            SupersNo: [
                {value: '1', label: 'BL1059W'},
                {value: '2', label: 'BL1059W2'},
                {value: '3', label: 'BL1059W3'},
                {value: '4', label: 'BL1059W4'},
            ],
            TradeNo: [
                {value: '1', label: 'BL1059W'},
                {value: '2', label: 'BL1059W2'},
                {value: '3', label: 'BL1059W3'},
                {value: '4', label: 'BL1059W4'},
            ]

        }
    }

    componentDidMount() {
        const self = this;
        var paramsString = document.location.search;
        var searchParams = new URLSearchParams(paramsString);

        apiService.editArticle(searchParams.get("id")).then(function (result) {
            let brands = []
            let brand = {}
            result.brands.forEach(function (item, index, array) {
                brands.push({"value": index + 1, "label": item.name})
                if (item.name === result.article.brand_no_id.name){
                     brand = {"value":String(index+1), "label":item.name.trim()}
               }
            })

            let country = []
            result.country.forEach(function (item, index, array) {
                country.push({"value": index + 1, "label": item.country_name})

            })

            self.setState({
                article: result.article,
                brands: brands,
                brand: brand,
                country: country
            })
        });
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
                            <input type="text" value={this.state.article.id}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Бренд</label>
                            <Select
                                classNamePrefix="select"
                                isSearchable={true}
                                name="numsOfRows"
                                options={this.state.brands}
                                defaultValue={this.state.brand}
                                placeholder={this.state.brand.label}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>QuantUnit </label>
                            <input type="text" value={this.state.article.quant_unit}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>QuantPerUnit </label>
                            <input type="text" value={this.state.article.quant_per_unit}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Статус</label>
                            <input type="text" value={this.state.article.art_stat}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Дата</label>
                            <input type="text" value={this.state.article.status_dat}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6">
                            <label>Страны</label>
                            <Select
                                classNamePrefix="select"
                                classPrefix="multi-select"
                                isMulti
                                isSearchable={true}
                                name="countries"
                                options={this.state.country}
                                placeholder={''}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GTIN </label>
                            <input type="text" value={this.state.article.gtin}/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GenArtNo</label>
                            <Select
                                classNamePrefix="select"
                                isSearchable={true}
                                name="GenArtNo"
                                options={this.state.GenArtNo}
                                placeholder={this.state.article.gen_art_no}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6">
                            <label>Замены (SupersNo)</label>
                            <Select
                                classNamePrefix="select"
                                classPrefix="multi-select"
                                isMulti
                                isSearchable={true}
                                name="SupersNo"
                                options={this.state.SupersNo}
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
                                options={this.state.TradeNo}
                                placeholder={this.state.article.art_no}
                            />
                        </fieldset>
                    </div>
                </div>

            </div>

        );
    }

}

export default MainData;
