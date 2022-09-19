import Articuls from "../../components/ArticulPageComponents/Articuls/Articuls";
import MatchingNumbers from "../../components/ArticulPageComponents/MatchingNumbers/MatchingNumbers";
import Header from "../../components/Header/Header";
import React, {Component} from "react";
import ApiService from "../../util/ApiService";

const apiService = new ApiService();

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            articles_filter: [],
            dropdownVisible: false,
            brand_no: 'all',
            brand_style: {}
        }
        this.setBrand = this.setBrand.bind(this)
        this.getStyle = this.getStyle.bind(this)
    }

    componentDidMount() {
        apiService.getArticlesBrand().then((result) => {
            let brand_no = localStorage.getItem("brand_no")
            let brands = []
            let brand_style = {}
            result.brands.forEach((item) => {
                if (brand_no * 1 === item.brand_no) {
                    brand_style = {color: 'black', backgroundColor: 'while'}
                    brands.push({...item, brand_style: {color: 'white', backgroundColor: '#6D71F9'}})
                } else {
                    if(brand_no === 'all'){
                       brand_style = {color: 'white', backgroundColor: '#6D71F9'}
                    }
                    brands.push({...item, brand_style: {color: 'black', backgroundColor: 'while'}})
                }
            })
            this.setState({brands: brands, brand_style: brand_style})
        })
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
            this.setState({brand_no: brand_no, brands: brands, brand_style: brand_style})
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

    render() {
        return (
            <div className="home-page">
                <div className="container">
                    <Header
                        brands={this.state.brands}
                        setBrandFunction={this.setBrand}
                        dropdownVisible={this.state.dropdownVisible}
                        brand_style={this.state.brand_style}
                    />
                    <div className="home-page__title display2">Список и поиск артикулов</div>
                    <Articuls/>
                    <MatchingNumbers
                        articles_filter={this.state.articles_filter}
                    />

                </div>
            </div>
        );
    }
}


export default Home;
