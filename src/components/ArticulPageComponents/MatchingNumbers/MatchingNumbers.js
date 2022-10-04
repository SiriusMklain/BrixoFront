import React, {Component} from "react";
import ApiService from "../../../util/ApiService";
import Select from 'react-select';
import MatchingItem from "./MatchingItem";
import './MatchingNumbers.scss';
import LocalStorageService from "../../../util/LocalStorageService";

const apiService = new ApiService();
const localStorageService = new LocalStorageService();

class MatchingNumbers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            articles: [],
            next: 1,
            prev: 1,
            chunk: 10,
            count: 1,
            page_from: 0,
            page_to: 100,
            article_count: 0,
            count_pages: 1,
            page: 1,
            handle_status: false,
            number_article: 1,
            numsRows: [
                {value: '1', label: '10'},
                {value: '2', label: '20'},
                {value: '3', label: '50'}
            ]
        }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleForwardChange = this.handleForwardChange.bind(this);
        this.searhArticle = this.searhArticle.bind(this);
        this.searhNumberArticle = this.searhNumberArticle.bind(this);
        this.eventPaginationEnter = this.eventPaginationEnter.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('chunk', this.state.chunk);
        localStorage.setItem('page_from', "0");
        localStorage.setItem('page_to', "100");
        localStorage.setItem('count', "1");
        let brand_no = localStorage.getItem("brand_no")
        if (!brand_no) {
            localStorage.setItem('brand_no', "all");
            localStorage.setItem('brand_name', "All brands");
            brand_no = 'all'
        }

        apiService.getArticles(
            brand_no,
            this.state.chunk,
            this.state.next,
            this.state.prev,
            this.state.page_from,
            this.state.page_to
        ).then(result => {
            this.setState({
                articles: result.article,
                article_count: result.article_count,
                next: result.nextlink,
                prev: result.prevlink
            })
        });

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({articles: nextProps.articles_filter})
    }

    componentWillMount() {
        let chunk = localStorage.getItem('chunk')

        if (chunk) {
            this.setState({chunk: chunk})
        }
    }

    getPages() {
        return {"value": 0, "label": this.state.chunk}
    }

    nextPage() {
        localStorageService.getArticlePages("next")

        apiService.getArticlesByURL(
            this.state.next, "next",
            localStorage.getItem("brand_no"),
            localStorage.getItem('chunk') * 1,
            localStorage.getItem('page_from') * 1,
            localStorage.getItem('page_to') * 1
        ).then((result) => {
            this.setState({
                articles: result.article,
                count_pages: this.state.count_pages + 1,
                next: result.nextlink,
                prev: result.prevlink,
                page_from: localStorage.getItem('page_from') * 1
            })
        });

    }

    prevPage() {
        localStorageService.getArticlePages("prev")

        apiService.getArticlesByURL(
            this.state.prev, "prev",
            localStorage.getItem("brand_no"),
            localStorage.getItem('chunk') * 1,
            localStorage.getItem('page_from') * 1,
            localStorage.getItem('page_to') * 1
        ).then((result) => {
            this.setState({
                articles: result.article,
                count_pages: this.state.count_pages - 1,
                next: result.nextlink,
                prev: result.prevlink
            })
        });
    }

    handleChange(e) {
        let chunk = Number(e.label)
        localStorage.setItem('chunk', chunk);
        localStorage.setItem('count', 1);
        apiService.getArticles(
            localStorage.getItem("brand_no"),
            chunk,
            this.state.next,
            this.state.prev,
            this.state.page_from,
            this.state.page_to
        ).then(result => {
            this.setState({
                articles: result.article,
                next: result.nextlink,
                prev: result.prevlink,
                chunk: chunk
            })
        });
    }

    handleForwardChange() {
        let chunk = localStorage.getItem('chunk')
        localStorage.setItem('count', 1);
        apiService.getArticles(
            localStorage.getItem("brand_no"),
            chunk,
            this.state.next,
            this.state.prev,
            this.state.page_from,
            this.state.page_to
        ).then(result => {
            this.setState({
                articles: result.article,
                next: result.nextlink,
                prev: result.prevlink,
                chunk: chunk,
                handle_status: true
            })
        });
    }

    searhArticle(lexem) {
        this.setState({article: lexem.target.value})
        if (lexem.target.value.length > 0) {
            apiService.searchArticles(lexem.target.value, "full").then(result => {
                this.setState({articles: result.article})
            });
        } else {
            apiService.getArticles(
                this.state.chunk,
                this.state.next,
                this.state.prev,
                this.state.page_from,
                this.state.page_to
            ).then(result => {
                this.setState({articles: result.article, next: result.nextlink, prev: result.prevlink})
            });
        }
    }

    deleteArticle = (id) => {
        let article = this.state.articles.filter(el => el.id !== id)
        this.setState({articles: article})
        apiService.deleteArticle(id)
    }

    searhNumberArticle(lexem) {
        this.setState({number_article: lexem.target.value})
        if (lexem.target.value.length > 2) {
            let page_from = lexem.target.value * 1 - 1
            let page_to = lexem.target.value * 1 + 99
            localStorage.setItem('page_from', page_from)
            localStorage.setItem('page_to', page_to)
            this.setState({page_from: page_from, page_to: page_to, number_article: page_from, page: lexem.target.value})
        }
    }

    getNum(index) {
        if (this.state.page_from === 0 && this.state.count_pages === 1) {
            return index + 1
        }
        if (this.state.page_from * 1 > 0 && this.state.count_pages === 1) {
            return (index + 1) + (this.state.page_from * 1)
        }
        if (this.state.page_from * 1 > 0 && this.state.count_pages !== 1&& this.state.handle_status === false) {
            let i = (index + 1) + (this.state.count_pages - 1) * this.state.chunk
            if (i < 0) {
                return index + 1
            } else {
                return i
            }
        }
        if (this.state.page_from * 1 > 0 && this.state.count_pages !== 1 && this.state.handle_status === true) {
            if (this.state.page_from * 1 + 1 === this.state.page * 1) {
                console.log(1, this.state.count_pages)
                return (index + 1) + (this.state.page_from * 1) + (this.state.count_pages - 1) * this.state.chunk
            } if(this.state.count_pages == 11){
                this.setState({count_pages: 1})
                return (index + 1) + (this.state.page_from * 1)
            }else {
                return (index + 1) + (this.state.page_from * 1) + (this.state.count_pages - 1) * (this.state.chunk * 1)
            }
        } else {
            let i = index + 1 + (this.state.count_pages - 1) * this.state.chunk
            if (i < 0) {
                return index + 1
            } else {
                return i
            }
        }
    }

    countPages() {
        if (this.state.handle_status === true) {
            if (localStorage.getItem("page_from") * 1 === this.state.page * 1) {
                return (this.state.count_pages * 1 + localStorage.getItem('page_from') * 1 - 1) * localStorage.getItem('chunk')
            } else {
                return (this.state.count_pages + this.state.page * 1 - 1) * localStorage.getItem('chunk')
            }
        } else {
            return (this.state.count_pages) * localStorage.getItem('chunk')
        }
    }

    eventPaginationEnter(e) {
        if (e.key === "Enter") {
            this.setState({count_pages: 1})
            this.handleForwardChange()
            this.countPages()
        }
    }

    render() {
        return (
            <>
                <div className="data-block">
                    <div className="data-block__head">
                        <div className="data-block__title">Соответствие OEM-номерам</div>
                    </div>
                    <div className="data-block__nav">
                        <div className="data-block__search search-field">
                            <input type="text" placeholder="Поиск"
                                   value={this.state.article}
                                   onChange={this.searhArticle}
                            />
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.71 16.29L14.31 12.9C15.407 11.5025 16.0022 9.77666 16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16C9.77666 16.0022 11.5025 15.407 12.9 14.31L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29ZM2 8C2 6.81332 2.3519 5.65328 3.01119 4.66658C3.67047 3.67989 4.60755 2.91085 5.7039 2.45673C6.80026 2.0026 8.00666 1.88378 9.17055 2.11529C10.3344 2.3468 11.4035 2.91825 12.2426 3.75736C13.0818 4.59648 13.6532 5.66558 13.8847 6.82946C14.1162 7.99335 13.9974 9.19975 13.5433 10.2961C13.0892 11.3925 12.3201 12.3295 11.3334 12.9888C10.3467 13.6481 9.18669 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8Z"
                                    fill="#A0A1C0"/>
                            </svg>
                        </div>
                        <div className="data-block__num">
                            <div className="data-block__num-title">Отображаемые артикулы</div>
                            <Select
                                className="data-block__num-select"
                                classNamePrefix="select"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                name="numsOfRows"
                                options={this.state.numsRows}
                                value={this.getPages()}
                                placeholder={''}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="data-block__content">
                        <div className="table table2 table--matchings">
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <div className="table__th">
                                            <span className="table__num">№</span>
                                            <button className="table__sort">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M4 0L0 2.91517L1.13934 4.54264L3.01991 3.17209V10H4.98009V3.17209L6.86066 4.54264L8 2.91517L4 0Z"
                                                          fill="#CA003D"/>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M12 16L16 13.0848L14.8607 11.4574L12.9801 12.8279L12.9801 5.99998L11.0199 5.99998L11.0199 12.8279L9.13934 11.4574L8 13.0848L12 16Z"
                                                          fill="#BBBCD1"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <div className="table__check check">
                                                <input type="checkbox"/>
                                                <label></label>
                                            </div>
                                            <span>Артикул</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>Бренд</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className="table__th">
                                            <span>GTIN</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="table__th">
                                            <span>Страны</span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.articles.map((article, index) =>
                                    <MatchingItem
                                        index={index}
                                        num={this.getNum(index)}
                                        id={article.id}
                                        articles={article}
                                        deleteFunc={this.deleteArticle}
                                    />
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="nav">
                    <div className="nav__buttons">
                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.0557 6.4998L0.944554 6.4998M6.61122 12.0712L0.944554 6.4998L6.61122 0.92837"
                                stroke="#232445" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"></path>
                        </svg>
                        <button className="nav__btn btn btn-gray" onClick={this.prevPage}>Назад</button>
                        <button className="nav__btn btn btn-red-outline" onClick={this.nextPage}>Далее</button>
                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_69_3461)">
                                <path d="M0.944336 6.50002H16.0554M10.3888 0.928589L16.0554 6.50002L10.3888 12.0714"
                                      stroke="#CA003D" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_69_3461">
                                    <rect width="17" height="13" fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <div className="pagination">
                        <div className="pagination__input fg">
                            <input type="text"
                                   onChange={this.searhNumberArticle}
                                   onKeyDown={this.eventPaginationEnter}
                            />
                        </div>
                        <div className="pagination__num"><span>{this.countPages()} </span>
                            из <span>{(this.state.article_count).toFixed(0)}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MatchingNumbers;
