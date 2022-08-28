import {Component} from "react";
import './MainData.scss';
import Select from "react-select";
import ApiService from "../../../util/ApiService";

const apiService = new ApiService();

class MainData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            brands: [],
            brand: [],
            countries: [
                {value: '1', label: 'Россия'},
                {value: '2', label: 'Грузия'},
                {value: '3', label: 'Германия'},
                {value: '4', label: 'Китай'},
                {value: '5', label: 'Япония'},
                {value: '6', label: 'Дания'},
                {value: '7', label: 'Италия'},
            ],
            GenArtNo: [
                {value: '1', label: 'Колодки (454212)'},
                {value: '2', label: 'Колодки (454212) 2'},
                {value: '3', label: 'Колодки (454212) 3'}
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
        apiService.editArticle(41510).then(function (result) {
            let brands = []
            result.brands.forEach(function (item, index, array) {
                brands.push({"value": index + 1, "label": item.name})
            })
            let brand = {}
            for(brand of brands){
               if (brand['label'] === result.article.brand_no_id.name){
                     brand = {"value":String(brand["value"]), "label":brand["label"].trim()}
               }
            }
            self.setState({article: result.article, brands: brands, brand: brand})
            console.log("TEST", self.state.brand)
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
                            <input type="text"/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>QuantPerUnit </label>
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
                                isSearchable={true}
                                name="countries"
                                options={this.state.countries}
                                placeholder={''}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GTIN </label>
                            <input type="text"/>
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GenArtNo</label>
                            <Select
                                classNamePrefix="select"
                                isSearchable={true}
                                name="GenArtNo"
                                options={this.state.GenArtNo}
                                placeholder={''}
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
                                placeholder={''}
                            />
                        </fieldset>
                    </div>
                </div>
            </div>

        );
    }

}

export default MainData;
