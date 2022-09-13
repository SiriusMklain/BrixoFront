import MainData from "../../components/ArticulEditComponents/MainData/MainData";
import Characteristics from "../../components/ArticulEditComponents/Characteristics/Characteristics";
import Reference from "../../components/ArticulEditComponents/Reference/Reference";
import Validity from "../../components/ArticulEditComponents/Validity/Validity";
import Docs from "../../components/ArticulEditComponents/Docs/Docs";
import {Component} from "react";
import ApiService from "../../util/ApiService";

const apiService = new ApiService();

var paramsString = document.location.search;
var art_no_id = new URLSearchParams(paramsString)
art_no_id = art_no_id.get("id")

class Edit extends Component {
    constructor(props) {
        super(props);
        const {id} = props
        this.id = id
        this.state = {
            article: [],
            brands: [],
            brand: [],
            countries: [],
            all_countries: [],
            trades: [],
            supers: [],
            crit: [],
            characteristics: [],
            reference: []
        }
    }

    componentDidMount() {
        const self = this;

        apiService.editArticle(art_no_id).then(function (result) {

            let brands = []
            let brand = {}
            let name = "Нет данных"
            let _name = ""
            result.brands.forEach(function (item, index, array) {
                if (item.name) {
                    name = item.name
                }
                if (result.article.brand_no_id) {
                    _name = result.article.brand_no_id.name
                }
                brands.push({"value": index + 1, "label": name})
                if (name === _name) {
                    brand = {"value": String(index + 1), "label": name.trim()}
                } else {
                    return true
                }
            })

            let all_countries = []
            result.country.forEach(function (item, index) {
                all_countries.push({"value": index + 1, "label": item.country_code})

            })
            let countries = []
            result.article.country_id.forEach(function (item, index) {
                countries.push({"value": index + 1, "label": item.country_code})
            })
            let trades = []
            result.trade.forEach(function (item, index) {
                trades.push({"value": index + 1, "label": item.trade_no})
            })
            let supers = []
            result.supers.forEach(function (item, index) {
                supers.push({"value": index + 1, "label": item.supers_no})
            })
            let characteristics = []
            result.characteristics.forEach(function (item, index) {
                characteristics.push({"value": index + 1, "label": item.name})
            })

            self.setState({
                article: result.article,
                brands: brands,
                brand: brand,
                countries: countries,
                trades: trades,
                supers: supers,
                all_countries: all_countries,
                crit: result.crit,
                characteristics: characteristics,
                reference: result.reference
            })
        });
    }

    render() {

        return (
            <div className="edit-page">
                <div className="container">
                    <div className="home-page__title display2">Редактирование артикула</div>
                    <MainData
                        art_no_id={art_no_id}
                        article={this.state.article}
                        brands={this.state.brands}
                        brand={this.state.brand}
                        countries={this.state.countries}
                        all_countries={this.state.all_countries}
                        trades={this.state.trades}
                        supers={this.state.supers}
                    />
                    <Characteristics
                        art_no_id={art_no_id}
                        crit={this.state.crit}
                        all_crit={this.state.characteristics}
                    />
                    <Reference
                        art_no_id={art_no_id}
                        reference={this.state.reference}
                        all_countries={this.state.all_countries}
                        art_no={this.state.article.art_no}
                    />
                    <Validity/>
                    <Docs/>
                </div>
            </div>
        );
    }
}

export default Edit;
