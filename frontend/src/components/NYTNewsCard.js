import React from 'react'
import {Link} from 'react-router-dom'
import sectionSet from '../pages/LocalVariable'
import {FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from "react-share"
import Modal from 'react-bootstrap/Modal'
import {MdShare} from 'react-icons/md'
import {useMediaQuery} from 'react-responsive'
import {Card, Container, Row, Col} from 'react-bootstrap'

const defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
function NYTNewsCard({article}){
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 500px)'
      })

    function getImg(){
        if(!article.multimedia && article.multimedia.length === 0){
            return defaultImg;
        }
        for(var i = 0; i < article.multimedia.length; i++){
            if(article.multimedia[i].width >= 2000 ){
                return "https://nyt.com/" + article.multimedia[i].url;
            }
        }
        return defaultImg;
    }

    function handleClick(e){       
        e.preventDefault();   
        handleShow();    
    }

    function getSectionTag(){
        if(sectionSet.has(article.news_desk.toUpperCase())){
            return <p className={`${article.news_desk.toUpperCase()}Tag`}>{article.news_desk.toUpperCase()}</p>
        }
        else{
            return <p className="otherTag">{(article.news_desk !== "") ? article.news_desk.toUpperCase() : "NONE"}</p>
        }
    }

    return (
        <>
        {(isMobileDevice) ? 
        <Link className="MobileNewsBox" to={`/NYTArticle?id=${article.web_url}`}>
            <Card>
                <Card.Body> 
                    <Card.Title>
                        {article.headline.main}
                        <MdShare size={20} onClick={(e) => handleClick(e)} />
                    </Card.Title>
                    <Card.Img variant="middle" src={getImg()} />
                    <p className="Date">{article.pub_date.substring(0,10)}</p>
                    {getSectionTag()}  
                </Card.Body>
            </Card>
        </Link> :
        <Link className="NewsCard"  to={`/NYTArticle?id=${article.web_url}`}>
            <div className="cardTitle">
                <h5>{article.headline.main}</h5>
                <MdShare className="MdShare" size={20} onClick={(e) => handleClick(e)} /> 
            </div>
            <div className = "cardImage"><img src={getImg()} alt="loading..."/></div>
            <div className="CardBottom">
                <p className="Date">{article.pub_date.substring(0,10)}</p>   
                {getSectionTag()} 
            </div>                                      
        </Link>}
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.headline.main}</Modal.Title>
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
                            <FacebookShareButton children="" url={article.web_url} hashtag="#CSCI_571_NewsApp">
                                <FacebookIcon className="Icon" />
                            </FacebookShareButton>
                        </Col>   
                        <Col>
                            <TwitterShareButton children="" url={article.web_url} hashtags={["CSCI_571_NewsApp"]}>
                                <TwitterIcon className="Icon" />
                            </TwitterShareButton>
                        </Col>
                        <Col>
                            <EmailShareButton children="" url={article.web_url} subject="#CSCI_571_NewsApp">
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

export default NYTNewsCard;