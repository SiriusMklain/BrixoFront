import MainData from "../../components/ArticulEditComponents/MainData/MainData";
import Characteristics from "../../components/ArticulEditComponents/Characteristics/Characteristics";
import Reference from "../../components/ArticulEditComponents/Reference/Reference";
import Validity from "../../components/ArticulEditComponents/Validity/Validity";
import Docs from "../../components/ArticulEditComponents/Docs/Docs";
import {Component} from "react";
import ApiService from "../../util/ApiService";

const apiService = new ApiService();

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
            reference: []
        }
    }

    componentDidMount() {
        const self = this;
        var paramsString = document.location.search;
        var searchParams = new URLSearchParams(paramsString);

        apiService.editArticle(searchParams.get("id")).then(function (result) {

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


            self.setState({
                article: result.article,
                brands: brands,
                brand: brand,
                countries: countries,
                trades: trades,
                supers: supers,
                all_countries: all_countries,
                crit: result.crit,
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
                        article={this.state.article}
                        brands={this.state.brands}
                        brand={this.state.brand}
                        countries={this.state.countries}
                        all_countries={this.state.all_countries}
                        trades={this.state.trades}
                        supers={this.state.supers}
                    />
                    <Characteristics
                        crit={this.state.crit}
                        art_no={this.state.article.art_no}
                    />
                    <Reference
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
