import React from 'react'
import {Link} from 'react-router-dom'
import sectionSet from '../pages/LocalVariable'
import {FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from "react-share"
import Modal from 'react-bootstrap/Modal'
import {MdShare, MdDelete} from 'react-icons/md'
import {Card, Container, Row, Col} from 'react-bootstrap'

class FavoriteCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            url: props.url,
            image: props.image,
            date: props.date,
            section: props.section,
            api: props.api,
            id: props.id,
            show: false,
            reload: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    static getDerivedStateFromProps(props, state){
        if(props.api !== state.api){
            return {loading: true, api: props.api};
        }   
        return null;
    }

    handleClose() {
        this.setState({show: false});
    }
    
    handleClick(e){       
        e.preventDefault();   
        this.setState({show: true});   
    }

    deleteFavorite(e){
        e.preventDefault();
        if(this.state.api==="NYTIMES"){
            var retrievedObjectNYT = localStorage.getItem("SaveNYT");
            var NYTjsonObj = JSON.parse(retrievedObjectNYT);
            if(NYTjsonObj.NYTNews.length === 1){ //only this news in local storage
                localStorage.removeItem("SaveNYT");
                this.props.handler(this.state.title);
            }
            else{
                for(var i = 0; i < NYTjsonObj.NYTNews.length; i++){
                    if(NYTjsonObj.NYTNews[i].url === this.state.url){
                        NYTjsonObj.NYTNews.splice(i,1);
                        localStorage.setItem("SaveNYT", JSON.stringify(NYTjsonObj));
                        this.props.handler(this.state.title);
                    }
                } 
            }  
        }
        else{
            var retrievedObject = localStorage.getItem("SaveGua");
            var jsonObj = JSON.parse(retrievedObject);
            if(jsonObj.GuaNews.length === 1){ //only this news in local storage
                localStorage.removeItem("SaveGua");
                this.props.handler(this.state.title);
            }
            else{
                for(var j = 0; j < jsonObj.GuaNews.length; j++){
                    if(jsonObj.GuaNews[j].id === this.state.id){
                        jsonObj.GuaNews.splice(j,1);
                        localStorage.setItem("SaveGua", JSON.stringify(jsonObj));
                        this.props.handler(this.state.title);
                    }
                }
            } 
        }
    }

    getSectionTag(){
        if(sectionSet.has(this.state.section.toUpperCase())){
            return <p className={`${this.state.section.toUpperCase()}Tag`}>{this.state.section.toUpperCase()}</p>
        }
        else{
            return <p className="otherTag">{(this.state.section !== "") ? this.state.section.toUpperCase() : "NONE"}</p>
        }
    }

    render(){
        return (
            <>
            {(this.state.api==="NYTIMES") ?  
            <Link className="MobileNewsBox" to={`/NYTArticle?id=${this.state.url}`}>
            <Card>
                <Card.Body> 
                    <Card.Title>
                        {this.state.title}
                        <MdShare size={20} onClick={this.handleClick} />
                        <MdDelete size={20} onClick={this.deleteFavorite} />
                    </Card.Title>
                    <Card.Img variant="middle" src={this.state.image} />
                    <p className="Date">{this.state.date}</p>   
                    <p className={`${this.state.api}Tag`}>{this.state.api}</p>
                    {this.getSectionTag()}  
                </Card.Body>
            </Card>
            </Link> :
            <Link className="MobileNewsBox" to={`/GuaArticle?id=${this.state.id}`}>
            <Card>
                <Card.Body> 
                    <Card.Title>
                        {this.state.title}
                        <MdShare size={20} onClick={this.handleClick} />
                        <MdDelete size={20} onClick={this.deleteFavorite} />
                    </Card.Title>
                    <Card.Img variant="middle" src={this.state.image} />
                    <p className="Date">{this.state.date}</p>
                    <p className={`${this.state.api}Tag`}>{this.state.api}</p>
                    {this.getSectionTag()}  
                </Card.Body>
            </Card>
            </Link>}
            <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ModalBody">
                    <div id="ModalTitle">
                    <h5>
                        Share via
                    </h5>
                    </div>
                    <Container>
                    <Row>
                        <Col>
                            <FacebookShareButton children="" url={this.state.url} hashtag="#CSCI_571_NewsApp">
                                <FacebookIcon className="Icon" />
                            </FacebookShareButton>
                        </Col>   
                        <Col>
                            <TwitterShareButton children="" url={this.state.url} hashtags={["CSCI_571_NewsApp"]}>
                                <TwitterIcon className="Icon" />
                            </TwitterShareButton>
                        </Col>
                        <Col>
                            <EmailShareButton children="" url={this.state.url} subject="#CSCI_571_NewsApp">
                                <EmailIcon className="Icon" />
                            </EmailShareButton>
                        </Col>
                    </Row>
                    </Container>
                    </Modal.Body>
            </Modal> 
            </>    
        );
    }
}

export default FavoriteCard;