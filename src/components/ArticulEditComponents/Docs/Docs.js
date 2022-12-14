import './Docs.scss';
import DocItem from "./DocItem";
import React, {Component} from "react";
import ApiService from "../../../util/ApiService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const apiService = new ApiService();

class Docs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docs: [],
            data: '',
            doc_name: '',
            doc_no: '',
            opacity: '',

        }
        this.sendFile = this.sendFile.bind(this)
        this.beforeDelete = this.beforeDelete.bind(this)
        this.deleteDoc = this.deleteDoc.bind(this)


    }

    componentDidMount() {
        apiService.getImages(this.props.art_no_id).then((result) =>
            this.setState({docs: result.docs, opacity: 1})
        )
    }

    sendFile(e) {
        this.setState({data: e.target.files[0]})
    }

    doSubmit() {
        apiService.sendFile(this.props.art_no_id, this.state.data).then(() => {
            apiService.getImages(this.props.art_no_id).then((result) =>
                this.setState({docs: result.docs})
            )
        })
    }

    beforeDelete(doc_name, doc_no){
        if (this.state.opacity === 1){
            this.setState({doc_name: doc_name, doc_no: doc_no, opacity: 0.4})
    }else{
            this.setState({doc_name: doc_name, doc_no: doc_no, opacity: 1})
        }
    }

    deleteDoc() {
        apiService.deleteDoc(this.props.art_no_id, this.state.doc_no, this.state.doc_name).then(() => {
            apiService.getImages(this.props.art_no_id).then((result) =>
                this.setState({docs: result.docs, opacity: 1})
            )
        })
        return true
    }



    render() {
        return (
            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Документы</div>
                </div>
                <div className="data-block__content">
                    <div className="docs">
                        {this.state.docs.map((item, index) =>
                            <DocItem
                                key={index}
                                path_image={item.path_image}
                                doc_name={item.doc_name}
                                doc_no={item.doc_no}
                                opacity={this.state.opacity}
                                isDeleteFunc={this.beforeDelete}
                            />
                        )}
                        <div className="docs__input">
                            <input type="file"
                                   name="image_url"
                                   accept="image/jpeg,image/png,image/bmp"
                                   onChange={this.sendFile}
                            />
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.11 15.3901L8.23002 19.2701C8.00053 19.5005 7.72781 19.6833 7.4275 19.808C7.12719 19.9328 6.80521 19.997 6.48002 19.997C6.15483 19.997 5.83285 19.9328 5.53254 19.808C5.23223 19.6833 4.95951 19.5005 4.73002 19.2701C4.49842 19.0413 4.31454 18.7688 4.18904 18.4684C4.06354 18.168 3.99892 17.8456 3.99892 17.5201C3.99892 17.1945 4.06354 16.8722 4.18904 16.5718C4.31454 16.2714 4.49842 15.9989 4.73002 15.7701L8.61002 11.8901C8.79832 11.7018 8.90411 11.4464 8.90411 11.1801C8.90411 10.9138 8.79832 10.6584 8.61002 10.4701C8.42172 10.2818 8.16632 10.176 7.90002 10.176C7.63372 10.176 7.37832 10.2818 7.19002 10.4701L3.31002 14.3601C2.52838 15.2109 2.10564 16.3307 2.13009 17.4858C2.15455 18.6409 2.6243 19.7419 3.44125 20.5588C4.2582 21.3758 5.35918 21.8456 6.51427 21.87C7.66935 21.8945 8.78923 21.4717 9.64002 20.6901L13.53 16.8101C13.6233 16.7168 13.6972 16.6062 13.7477 16.4843C13.7981 16.3625 13.8241 16.2319 13.8241 16.1001C13.8241 15.9682 13.7981 15.8377 13.7477 15.7158C13.6972 15.594 13.6233 15.4833 13.53 15.3901C13.4368 15.2968 13.3261 15.2229 13.2043 15.1724C13.0824 15.122 12.9519 15.096 12.82 15.096C12.6882 15.096 12.5576 15.122 12.4358 15.1724C12.3139 15.2229 12.2033 15.2968 12.11 15.3901ZM8.83002 15.1701C8.92346 15.2628 9.03428 15.3361 9.15611 15.3859C9.27795 15.4356 9.40841 15.4608 9.54002 15.4601C9.67163 15.4608 9.80209 15.4356 9.92393 15.3859C10.0458 15.3361 10.1566 15.2628 10.25 15.1701L15.17 10.2501C15.3583 10.0618 15.4641 9.80638 15.4641 9.54008C15.4641 9.27378 15.3583 9.01838 15.17 8.83008C14.9817 8.64178 14.7263 8.53599 14.46 8.53599C14.1937 8.53599 13.9383 8.64178 13.75 8.83008L8.83002 13.7501C8.73629 13.843 8.6619 13.9536 8.61113 14.0755C8.56036 14.1974 8.53422 14.3281 8.53422 14.4601C8.53422 14.5921 8.56036 14.7228 8.61113 14.8447C8.6619 14.9665 8.73629 15.0771 8.83002 15.1701ZM21 18.0001H20V17.0001C20 16.7349 19.8947 16.4805 19.7071 16.293C19.5196 16.1054 19.2652 16.0001 19 16.0001C18.7348 16.0001 18.4804 16.1054 18.2929 16.293C18.1054 16.4805 18 16.7349 18 17.0001V18.0001H17C16.7348 18.0001 16.4804 18.1054 16.2929 18.293C16.1054 18.4805 16 18.7349 16 19.0001C16 19.2653 16.1054 19.5197 16.2929 19.7072C16.4804 19.8947 16.7348 20.0001 17 20.0001H18V21.0001C18 21.2653 18.1054 21.5197 18.2929 21.7072C18.4804 21.8947 18.7348 22.0001 19 22.0001C19.2652 22.0001 19.5196 21.8947 19.7071 21.7072C19.8947 21.5197 20 21.2653 20 21.0001V20.0001H21C21.2652 20.0001 21.5196 19.8947 21.7071 19.7072C21.8947 19.5197 22 19.2653 22 19.0001C22 18.7349 21.8947 18.4805 21.7071 18.293C21.5196 18.1054 21.2652 18.0001 21 18.0001ZM16.81 13.5301L20.69 9.64008C21.4717 8.78929 21.8944 7.66941 21.8699 6.51433C21.8455 5.35924 21.3757 4.25826 20.5588 3.44131C19.7418 2.62436 18.6409 2.15461 17.4858 2.13016C16.3307 2.1057 15.2108 2.52844 14.36 3.31008L10.47 7.19008C10.3768 7.28332 10.3028 7.39401 10.2524 7.51583C10.2019 7.63765 10.1759 7.76822 10.1759 7.90008C10.1759 8.03194 10.2019 8.16251 10.2524 8.28433C10.3028 8.40615 10.3768 8.51684 10.47 8.61008C10.5633 8.70332 10.6739 8.77728 10.7958 8.82774C10.9176 8.8782 11.0482 8.90417 11.18 8.90417C11.3119 8.90417 11.4424 8.8782 11.5643 8.82774C11.6861 8.77728 11.7968 8.70332 11.89 8.61008L15.77 4.73008C15.9995 4.49969 16.2722 4.31687 16.5725 4.19213C16.8728 4.06739 17.1948 4.00318 17.52 4.00318C17.8452 4.00318 18.1672 4.06739 18.4675 4.19213C18.7678 4.31687 19.0405 4.49969 19.27 4.73008C19.5016 4.95889 19.6855 5.23139 19.811 5.53179C19.9365 5.83219 20.0011 6.15452 20.0011 6.48008C20.0011 6.80564 19.9365 7.12797 19.811 7.42837C19.6855 7.72877 19.5016 8.00127 19.27 8.23008L15.39 12.1101C15.2963 12.203 15.2219 12.3136 15.1711 12.4355C15.1204 12.5574 15.0942 12.6881 15.0942 12.8201C15.0942 12.9521 15.1204 13.0828 15.1711 13.2047C15.2219 13.3265 15.2963 13.4371 15.39 13.5301C15.483 13.6238 15.5936 13.6982 15.7154 13.749C15.8373 13.7997 15.968 13.8259 16.1 13.8259C16.232 13.8259 16.3627 13.7997 16.4846 13.749C16.6065 13.6982 16.7171 13.6238 16.81 13.5301Z"
                                    fill="#6D71F9"/>
                            </svg>
                            <span style={{paddingLeft:20, paddingRight: 20}}>Выбрать файл</span>
                        </div>
                        <Button className="btn btn-blue" style={{marginTop: 20, backgroundColor: '#6D71F9'}}
                                onClick={(e) => this.doSubmit(e)}
                        >Загрузить файл
                        </Button>
                        <Button className="btn btn-blue" style={{marginTop: 80, marginLeft: -146, minWidth: 146, backgroundColor: '#6D71F9'}}
                                onClick={this.deleteDoc}
                        >Удалить файл
                        </Button>
                    </div>
                </div>

            </div>

        );
    }


}


export default Docs;
