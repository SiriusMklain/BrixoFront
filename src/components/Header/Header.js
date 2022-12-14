import Select from "react-select";
import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './Header.scss';
import logo from '../../assets/img/logo.svg'
import avatarIcon from '../../assets/img/avatar.png'
import ApiService from "../../util/ApiService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const apiService = new ApiService();

var paramsString = document.location.search;
var art_no_id = new URLSearchParams(paramsString)
art_no_id = art_no_id.get("id")

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false,
            article: [],
            articles: [],
            brands: [],
            brand_style: {},
            customStyles: {control: base => ({...base, height: 46, minHeight: 45})},
            showModal: false
        }
        this.getDropdownVisible = this.getDropdownVisible.bind(this)
        this.getDropdownInvisible = this.getDropdownInvisible.bind(this)
        this.searchArticle = this.searchArticle.bind(this)
        this.goToEdit = this.goToEdit.bind(this)
        this.goToHome = this.goToHome.bind(this)
        this.addArticle = this.addArticle.bind(this)
        this.createCopy = this.createCopy.bind(this)

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({brands: nextProps.brands, dropdownVisible: nextProps.getDropdownVisible})
    }

    getDropdownVisible() {
        this.setState({dropdownVisible: true})
    }

    getDropdownInvisible() {
        this.setState({dropdownVisible: false})
    }


    dropdown() {
        return (
            <>
                <div className="header__user-dropdown">
                    <div className="header__user-title">Выберите бренд</div>
                    <div className="header__user-links">
                        <Link style={this.props.brand_style} to="/" className="header__user-link"
                              onClick={(e) => this.props.setBrandFunction(e)}
                        >Все бренды
                            <input type="hidden" defaultValue={"all"}/>
                        </Link>
                        {this.state.brands.map((brand, index) =>
                            <Link style={brand.brand_style} to="/" className="header__user-link"
                                  onClick={(e) => this.props.setBrandFunction(e, index)}
                            >{brand.name}
                                <input type="hidden" defaultValue={brand.brand_no}/>
                            </Link>
                        )}
                    </div>
                    <button className="header__user-link header__user-logout">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.25004 1.08325C2.05342 1.08325 1.08337 2.0533 1.08337 3.24992V4.87492H2.16671V3.24992C2.16671 2.65161 2.65173 2.16659 3.25004 2.16659H9.75004C10.3484 2.16659 10.8334 2.65161 10.8334 3.24992V9.74992C10.8334 10.3482 10.3484 10.8333 9.75004 10.8333H3.25004C2.65173 10.8333 2.16671 10.3482 2.16671 9.74992V8.12492H1.08337V9.74992C1.08337 10.9465 2.05342 11.9166 3.25004 11.9166H9.75004C10.9466 11.9166 11.9167 10.9465 11.9167 9.74992V3.24992C11.9167 2.0533 10.9466 1.08325 9.75004 1.08325H3.25004Z"
                                fill="#E21A1A"/>
                            <path
                                d="M1.62504 5.95826C1.32589 5.95826 1.08337 6.20076 1.08337 6.49992C1.08337 6.79909 1.32589 7.04159 1.62504 7.04159H6.81556L5.44211 8.41499C5.23059 8.62656 5.23059 8.96949 5.44211 9.18107C5.65363 9.39259 5.99661 9.39259 6.20814 9.18107L8.48081 6.90839C8.59472 6.80905 8.66671 6.66291 8.66671 6.49992C8.66671 6.33694 8.59472 6.19079 8.48081 6.09145L6.20814 3.81881C5.99661 3.60727 5.65363 3.60727 5.44211 3.81881C5.23059 4.03034 5.23059 4.37331 5.44211 4.58484L6.81556 5.95826H1.62504Z"
                                fill="#E21A1A"/>
                        </svg>
                        <span>Выйти из системы</span>
                    </button>

                </div>
                <div
                    onClick={this.getDropdownInvisible}
                    className="header__user-backdrop">
                </div>
            </>
        )
    }

    searchArticle(lexem) {
        const self = this;
        if (lexem.length > 1) {
            apiService.searchArticles(lexem, 'short').then(function (result) {
                let articles = [];
                result.article.forEach(function (item, index) {
                    articles.push({"value": index + 1, "label": item.art_no})
                });
                self.setState({article: result.article, articles: articles})
            });
        }
    }

    goToEdit(e) {
        window.location.href = '/edit/?id=' + this.state.article[e.value - 1].id
    }

    goToHome() {
        window.location.href = '/'
    }

    addArticle() {
        apiService.createArticle().then((result) => {
            let id = result.id
            window.location.href = '/edit/?id=' + id
        })
    }

    createCopy() {
        apiService.createDuplicate(art_no_id).then((result) => {
            let id = result.id
            window.location.href = '/edit/?id=' + id
        })
    }

    exportTAF() {
        apiService.exportTAF().then((result) => {
            const a = document.createElement('a')
            a.href = result.file
            a.download = result.file.split('/').pop()
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        })
    }

    close() {
        this.setState({showModal: false});
    }

    open(id, art_no) {
        this.setState({showModal: true, id: id, art_no: art_no});
    }

    modalSize() {
        if (this.props.articuls) {
            if (this.props.articuls.length > 10) {
                return "lg"
            } else {
                return ""
            }
        } else {
            return ""
        }
    }

    render() {
        return (
            <header className='header'>
                <div className='container'>
                    <div className='header__inner'>
                        <div className="header__left">
                            <div className="header__logo">
                                <a href={"/"}><img src={logo} alt=""/></a>
                            </div>
                        </div>

                        <div className="header__right">
                            <div className="header__search " style={{marginRight: 30, maxWidth: 250}}>
                                <Select
                                    classNamePrefix="select"
                                    isSearchable={true}
                                    options={this.state.articles}
                                    onInputChange={this.searchArticle}
                                    onChange={this.goToEdit}
                                    placeholder={'Поиск артикулов'}
                                    styles={this.state.customStyles}
                                />

                            </div>
                            <Button
                                style={{marginRight: 30, minWidth: 180, backgroundColor: '#6D71F9'}}
                                onClick={this.addArticle}
                            >
                                Добавить артикул
                            </Button>
                            {art_no_id !== null ?
                            <Button
                                style={{marginRight: 30, minWidth: 180, backgroundColor: '#6D71F9'}}
                                onClick={this.createCopy}
                            >
                                Создать дубликат
                            </Button> : ''
                            }
                            <Button className="btn btn-blue"
                                    style={{marginRight: 30, minWidth: 100, backgroundColor: '#6D71F9'}}
                                    onClick={this.exportTAF}
                            >
                                Экспорт
                            </Button>
                            {this.props.notification_num > 0 ?
                                <button className="header__notification"
                                        onClick={this.open}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.97 15.9042C11.3844 15.9164 11.7913 16.0175 12.1628 16.2005H12.1852C12.4955 16.4537 12.5483 16.9057 12.3045 17.2228C11.8605 17.8581 11.1501 18.2587 10.3735 18.3117C9.57566 18.4068 8.77216 18.1859 8.13695 17.6968C7.81028 17.4728 7.59798 17.1186 7.55544 16.7264C7.55544 16.3116 7.94312 16.119 8.30097 16.0375C8.72011 15.9492 9.14737 15.9046 9.57582 15.9042H10.97ZM10.0306 1.66666C12.6101 1.66666 15.2717 3.53339 15.5475 6.23719C15.5922 6.79277 15.5475 7.37056 15.5922 7.93355C15.7386 8.65956 16.0755 9.33423 16.5689 9.88917C16.8756 10.3452 17.0533 10.8748 17.0834 11.4226V11.5929C17.0879 12.332 16.8231 13.0477 16.3378 13.6078C15.7227 14.2655 14.8881 14.6788 13.9894 14.7708C11.3339 15.1115 8.64531 15.1115 5.98983 14.7708C5.08046 14.6858 4.23416 14.2719 3.61159 13.6078C3.14152 13.0423 2.89502 12.326 2.91825 11.5929V11.4226C2.94735 10.8769 3.11954 10.3483 3.41776 9.88917C3.91329 9.33371 4.25498 8.6598 4.40931 7.93355C4.45404 7.37056 4.40931 6.80017 4.45404 6.23719C4.73734 3.53339 7.34669 1.66666 9.95604 1.66666H10.0306Z"
                                            fill="#6D71F9"/>
                                    </svg>
                                    <span className="header__notification-num">{this.props.notification_num}</span>

                                </button> : ''}
                            <div className="header__user">
                                <div className="header__user-img">
                                    <img src={avatarIcon} alt=""/>
                                </div>
                                <div className="header__user-content">
                                    <div className="header__user-name">Администратор</div>
                                    {/*<div className="header__user-prof">Веб-дизайнер</div>*/}
                                </div>
                                <button
                                    onClick={this.getDropdownVisible}
                                    className="header__user-btn"
                                >
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.9999 1.17C10.8126 0.983753 10.5591 0.879211 10.2949 0.879211C10.0308 0.879211 9.77731 0.983753 9.58995 1.17L5.99995 4.71L2.45995 1.17C2.27259 0.983753 2.01913 0.879211 1.75495 0.879211C1.49076 0.879211 1.23731 0.983753 1.04995 1.17C0.95622 1.26297 0.881826 1.37357 0.831057 1.49543C0.780288 1.61729 0.75415 1.74799 0.75415 1.88C0.75415 2.01202 0.780288 2.14272 0.831057 2.26458C0.881826 2.38644 0.95622 2.49704 1.04995 2.59L5.28995 6.83C5.38291 6.92373 5.49351 6.99813 5.61537 7.04889C5.73723 7.09966 5.86794 7.1258 5.99995 7.1258C6.13196 7.1258 6.26267 7.09966 6.38453 7.04889C6.50638 6.99813 6.61699 6.92373 6.70995 6.83L10.9999 2.59C11.0937 2.49704 11.1681 2.38644 11.2188 2.26458C11.2696 2.14272 11.2957 2.01202 11.2957 1.88C11.2957 1.74799 11.2696 1.61729 11.2188 1.49543C11.1681 1.37357 11.0937 1.26297 10.9999 1.17Z"
                                            fill="#232445"/>
                                    </svg>
                                </button>
                                {this.state.dropdownVisible ? this.dropdown() : ''}
                            </div>
                        </div>
                    </div>
                    {this.props.home === false ?
                        <>
                            <Modal size={this.modalSize()} show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Требуют внимания артикулы</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Перейдите на главную страницу или проверьте артикул/ы <br/> <b>
                                    {this.props.articuls ? this.props.articuls.map((art_no) =>
                                        <Button style={{
                                            height: 40,
                                            marginRight: 20,
                                            marginTop: 10,
                                            backgroundColor: '#6D71F9'
                                        }} variant="primary">
                                            <a style={{color: 'white', textDecoration: "none"}}
                                               href={'/edit/?id=' + art_no.id}>{art_no.art_no}</a>

                                        </Button>) : ''}
                                </b></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.close}>
                                        Отмена
                                    </Button>
                                    <Button variant="warning" onClick={this.goToHome}>
                                        На главную
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </> :
                        <>
                            <Modal size={this.modalSize()} show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Требуют внимания артикулы </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Проверьте артикул/ы <br/><b>
                                    {this.props.articuls ? this.props.articuls.map((art_no) =>
                                        <Button style={{
                                            height: 40,
                                            marginRight: 20,
                                            marginTop: 10,
                                            backgroundColor: '#6D71F9'
                                        }} variant="primary">
                                            <a style={{color: 'white', textDecoration: "none"}}
                                               href={'/edit/?id=' + art_no.id}>{art_no.art_no}</a>

                                        </Button>) : ''}
                                </b></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.close}>
                                        Закрыть
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    }

                </div>
            </header>
        );
    }


}


export default Header;
