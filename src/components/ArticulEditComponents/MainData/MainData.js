import React, {Component} from "react";
import './MainData.scss';
import Select from "react-select";
import ApiService from "../../../util/ApiService";


const apiService = new ApiService();

class MainData extends Component {
    constructor(props) {
        super(props);
        this.genArtNoValue = React.createRef();
        this.supersValue = React.createRef();
        this.tradeValue = React.createRef();
        this.state = {
            propsArray: this.props.crit,
            art_no: '',
            brand: {},
            countries: [],
            trades: [],
            all_trades: [],
            supers: [],
            all_supers: [],
            tradeNo: '',
            supersNo: '',
            quant_unit: '',
            quant_per_unit: '',
            art_stat: '',
            status_dat: '',
            gtin: '',
            gen_art_no: '',
            list_gen_art_no: [],
            searchStatus: true

        }
        this.changeArticle = this.changeArticle.bind(this);
        this.changeBrand = this.changeBrand.bind(this);
        this.changeCountries = this.changeCountries.bind(this);
        this.changeTrades = this.changeTrades.bind(this);
        this.changeQuantUnit = this.changeQuantUnit.bind(this);
        this.changeQuantPerUnit = this.changeQuantPerUnit.bind(this);
        this.changeArtStat = this.changeArtStat.bind(this);
        this.changeStatusDat = this.changeStatusDat.bind(this);
        this.changeGTIN = this.changeGTIN.bind(this);
        this.changeGenArtNo = this.changeGenArtNo.bind(this);
        this.changeSupers = this.changeSupers.bind(this);

        this.updateData = this.updateData.bind(this);

        this.setName = this.setName.bind(this);
        this.setSupers = this.setSupers.bind(this);
        this.eventTradeEnter = this.eventTradeEnter.bind(this);
        this.eventSupersEnter = this.eventSupersEnter.bind(this);
        this.enterUpdate = this.enterUpdate.bind(this);
        this.searchGetArtNo = this.searchGetArtNo.bind(this)
    }

    componentDidMount() {
        this.setState({
            art_no: this.props.article.art_no,
            brand: this.props.brand,
            countries: this.props.countries,
            trades: this.props.trades,
            all_trades: this.props.trades,
            supers: this.props.supers,
            all_supers: this.props.supers,
            quant_unit: this.props.article.quant_unit,
            quant_per_unit: this.props.article.quant_per_unit,
            art_stat: this.props.article.art_stat,
            status_dat: this.props.article.status_dat,
            gtin: this.props.article.gtin,
            gen_art_no: this.props.article.gen_art_no
        })

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            art_no: nextProps.article.art_no,
            brand: nextProps.brand,
            countries: nextProps.countries,
            trades: nextProps.trades,
            all_trades: nextProps.trades,
            supers: nextProps.supers,
            all_supers: nextProps.supers,
            quant_unit: nextProps.article.quant_unit,
            quant_per_unit: nextProps.article.quant_per_unit,
            art_stat: nextProps.article.art_stat,
            status_dat: nextProps.article.status_dat,
            gtin: nextProps.article.gtin,
            gen_art_no: nextProps.article.gen_art_no
        })
    }

    changeArticle(e) {
        this.setState({art_no: e.target.value})
    }

    changeBrand(e) {
        this.setState({brand: e}, () => this.updateData())
    }

    changeCountries(e) {

        this.setState({countries: e}, () => this.updateData())
    }

    changeTrades(e) {
        this.setState({trades: e}, () => this.updateData())
    }

    changeQuantUnit(e) {
        this.setState({quant_unit: e.target.value})
    }

    changeQuantPerUnit(e) {
        this.setState({quant_per_unit: e.target.value})
    }

    changeArtStat(e) {
        this.setState({art_stat: e.target.value})
    }

    changeStatusDat(e) {
        this.setState({status_dat: e.target.value})
    }

    changeGTIN(e) {
        this.setState({gtin: e.target.value})
    }

    changeGenArtNo(e) {
         try {
            this.setState({gen_art_no: e.label})
        } catch (e) {
        }
    }

    changeSupers(e) {
        try {
            this.setState({supers: e}, () => this.updateData())
        } catch (e) {

        }

    }

    updateData() {
        this.props.critListFunc(
            this.props.art_no_id,
            this.state.art_no,
            this.state.brand,
            this.state.countries,
            this.state.trades,
            this.state.quant_unit,
            this.state.quant_per_unit,
            this.state.art_stat,
            this.state.status_dat,
            this.state.gtin,
            this.state.gen_art_no,
            this.state.supers,
        )
    }

    setName(e) {
        this.setState({tradeNo: e})
    }

    setSupers(e) {
        this.setState({supersNo: e})
    }

    eventTradeEnter(e) {
        if (e.key === "Enter") {
            this.tradeValue.current.setValue()
            this.setState({
                trades: [...this.state.trades, {
                    "value": 1,
                    "label": this.state.tradeNo
                }]
            })
        }
    }

    eventSupersEnter(e) {
        this.genArtNoValue.current.clearValue()
        if (e.key === "Enter") {
            this.supersValue.current.setValue()
            this.setState({
                supers: [...this.state.supers, {
                    "value": 1,
                    "label": this.state.supersNo
                }]
            })
        }
    }

    enterUpdate(e) {
        if (e.key === "Enter") {
            this.updateData()
        }
    }

    isValid(param) {
        if (param === '' || param === null || param === undefined) {
            return {borderColor: "red"}
        } else {
            return {borderColor: "green"}
        }

    }

    isSelectValid() {
        return {
            control: (provided, state) => ({
                ...provided,
                borderColor: state.selectProps.value.label ? 'green !important' : 'red !important',
            }),
        }
    }

    searchGetArtNo(lexem) {
        apiService.getGenArtNo(lexem).then((result) => {
                let gen_art_no = [];
                result.forEach(function (item, index) {
                    gen_art_no.push({"value": index + 2, "label": item.gen_number})
                });
                this.setState({list_gen_art_no: [{
                    "value": 1,
                    "label": lexem
                }, ...gen_art_no]})
                this.updateData()
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
                            <input type="text" style={this.isValid(this.state.art_no)}
                                   value={this.state.art_no}
                                   onChange={this.changeArticle}
                                   onBlur={this.updateData}
                                   onKeyDown={this.enterUpdate}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Бренд</label>
                            <Select
                                classNamePrefix="select"
                                styles={this.isSelectValid()}
                                isSearchable={true}
                                name="numsOfRows"
                                options={this.props.brands}
                                value={this.state.brand}
                                onChange={this.changeBrand}
                                onBlur={this.updateData}
                                placeholder={""}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>QuantUnit </label>
                            <input type="text"
                                   value={this.state.quant_unit}
                                   onChange={this.changeQuantUnit}
                                   onBlur={this.updateData}
                                   onKeyDown={this.enterUpdate}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>QuantPerUnit </label>
                            <input type="text"
                                   value={this.state.quant_per_unit}
                                   onChange={this.changeQuantPerUnit}
                                   onBlur={this.updateData}
                                   onKeyDown={this.enterUpdate}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Статус</label>
                            <input type="text"
                                   value={this.state.art_stat}
                                   onChange={this.changeArtStat}
                                   onBlur={this.updateData}
                                   onKeyDown={this.enterUpdate}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col2">
                            <label>Дата</label>
                            <input type="text"
                                   value={this.state.status_dat}
                                   onChange={this.changeStatusDat}
                                   onBlur={this.updateData}
                                   onKeyDown={this.enterUpdate}
                            />
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
                                value={this.state.countries}
                                onChange={this.changeCountries}
                                onBlur={this.updateData}
                                placeholder={''}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GTIN </label>
                            <input type="text"
                                   value={this.state.gtin}
                                   onChange={this.changeGTIN}
                                   onBlur={this.updateData}
                                   onKeyDown={this.enterUpdate}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col3">
                            <label>GenArtNo</label>
                            <Select
                                ref={this.genArtNoValue}
                                classNamePrefix="select"
                                styles={this.isSelectValid()}
                                isSearchable={true}
                                name="getArtNo"
                                value={this.state.gen_art_no ? {'value': 1, 'label': this.state.gen_art_no} : ''}
                                options={this.state.list_gen_art_no}
                                onChange={this.changeGenArtNo}
                                onInputChange={this.searchGetArtNo}
                                onMenuOpen={()=> this.setState({gen_art_no: this.state.gen_art_no})}
                                onBlur={this.updateData}
                                placeholder={"Создание, поиск"}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6">
                            <label>Замены (SupersNo)</label>
                            <Select
                                ref={this.supersValue}
                                classNamePrefix="select"
                                classPrefix="multi-select"
                                isMulti
                                isSearchable={this.state.searchStatus}
                                name="SupersNo"
                                options={this.state.all_supers}
                                value={this.state.supers}
                                onInputChange={this.setSupers}
                                onKeyDown={this.eventSupersEnter}
                                onChange={this.changeSupers}
                                onBlur={this.updateData}
                                placeholder={''}
                            />
                        </fieldset>
                        <fieldset className="fg data-block__col data-block__col6">
                            <label>Торговые номера (TradeNo) </label>
                            <Select
                                ref={this.tradeValue}
                                classNamePrefix="select"
                                classPrefix="multi-select"
                                isMulti
                                isSearchable={true}
                                name="TradeNo"
                                options={this.state.all_trades}
                                value={this.state.trades}
                                onInputChange={this.setName}
                                onKeyDown={this.eventTradeEnter}
                                onChange={this.changeTrades}
                                onBlur={this.updateData}
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
