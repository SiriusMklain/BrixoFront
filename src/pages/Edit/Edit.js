import MainData from "../../components/ArticulEditComponents/MainData/MainData";
import Characteristics from "../../components/ArticulEditComponents/Characteristics/Characteristics";
import Reference from "../../components/ArticulEditComponents/Reference/Reference";
import Validity from "../../components/ArticulEditComponents/Validity/Validity";
import Docs from "../../components/ArticulEditComponents/Docs/Docs";
import React, {Component} from "react";
import ApiService from "../../util/ApiService";
import Header from "../../components/Header/Header";

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
            _brands: [],
            brand: [],
            countries: [],
            all_countries: [],
            trades: [],
            supers: [],
            crit: [],
            characteristics: [],
            characteristics_en: [],
            reference: [],
            articles_filter: [],
            dropdownVisible: false,
            notification_num: '',
            brand_style: {},
            brand_no: 'all',
            crit_list: []
        }

        this.setBrand = this.setBrand.bind(this)
        this.getStyle = this.getStyle.bind(this)
        this.getCritList = this.getCritList.bind(this)
    }

    componentDidMount() {
        const self = this;
        apiService.getErrors().then((result) => {
            self.setState({notification_num: result.length})
        })

        apiService.getArticlesBrand().then((result) => {
            let brand_no = localStorage.getItem("brand_no")
            let brands = []
            let brand_style = {}
            result.brands.forEach((item) => {
                if (brand_no * 1 === item.brand_no) {
                    brand_style = {color: 'black', backgroundColor: 'while'}
                    brands.push({...item, brand_style: {color: 'white', backgroundColor: '#6D71F9'}})
                } else {
                    if (brand_no === 'all') {
                        brand_style = {color: 'white', backgroundColor: '#6D71F9'}
                    }
                    brands.push({...item, brand_style: {color: 'black', backgroundColor: 'while'}})
                }
            })
            self.setState({_brands: brands, brand_style: brand_style})
        })

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
                characteristics.push({"value": index, "label": item.name})
            })
            let characteristics_en = []
            result.characteristics.forEach(function (item, index) {
                characteristics_en.push({"value": index, "label": item.name_en})
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
                characteristics_en: characteristics_en,
                reference: result.reference
            }, () => document.title = self.state.article.art_no)
        });

    }
    getStyle(_brands, index) {
        let brand_no = localStorage.getItem("brand_no")
        let brand_style = {}
        if (brand_no === 'all') {
            brand_style = {color: 'white', backgroundColor: '#6D71F9'}
            this.setState({brand_style: brand_style})
            window.location.href = '/'
        } else {
            brand_style = {color: 'black', backgroundColor: 'while'}
            let brands = []
            _brands.forEach((brand, _index) => {
                if (index === _index) {
                    brands.push({..._brands[_index], brand_style: {color: 'white', backgroundColor: '#6D71F9'}})
                } else {
                    brands.push({..._brands[_index], brand_style: {color: 'black', backgroundColor: 'while'}})
                }
            })
            this.setState({brand_no: brand_no, _brands: brands, brand_style: brand_style})
        }
    }

    setBrand(e, index) {
        let brand_no = e.target.firstElementChild.value
        localStorage.setItem("brand_no", brand_no)

        this.getStyle(this.state.brands, index)

        apiService.getArticlesFiltersBrand(brand_no, localStorage.getItem("chunk")).then((result) => {
                this.setState({
                    articles_filter: result.article,
                    dropdownVisible: true,
                })
            }
        )
    }

    getCritList(
        art_no_id, art_no,
        brand, countries,
        trades, quant_unit,
        quant_per_unit,
        art_stat, status_dat,
        gtin, gen_art_no, supers) {
        apiService.updateArticle(
            art_no_id,
            art_no,
            brand,
            countries,
            trades,
            quant_unit,
            quant_per_unit,
            art_stat,
            status_dat,
            gtin,
            gen_art_no,
            supers,
        ).then((result) => {
            this.setState({
                article: result.request_data,
                crit_list: result.crit_list,
                brand: result.request_data.brand_no_id.name,
                countries: result.request_data.country_id,
                supers: result.request_data.supers_id,
                trades: result.request_data.trade_id
            })
        })
    }

    render() {
        return (
            <div className="edit-page">
                <div className="container">
                    <Header
                        brands={this.state._brands}
                        setBrandFunction={this.setBrand}
                        dropdownVisible={this.state.dropdownVisible}
                        brand_style={this.state.brand_style}
                        notification_num={this.state.notification_num}
                    />
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
                        critListFunc={this.getCritList}
                    />
                    <Characteristics
                        art_no_id={art_no_id}
                        crit={this.state.crit}
                        all_crit={this.state.characteristics}
                        all_crit_en={this.state.characteristics_en}
                        crit_list={this.state.crit_list}
                    />
                    <Reference
                        art_no_id={art_no_id}
                        reference={this.state.reference}
                        all_countries={this.state.all_countries}
                        art_no={this.state.article.art_no}
                    />
                    <Validity
                        art_no_id={art_no_id}
                    />
                    <Docs
                        art_no_id={art_no_id}
                    />
                </div>
            </div>
        );
    }
}

export default Edit;
