import React from 'react'
import {Link} from 'react-router-dom'
import sectionSet from '../pages/LocalVariable'
import {FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from "react-share"
import Modal from 'react-bootstrap/Modal'
import {MdShare} from 'react-icons/md'
import TextTruncate from 'react-text-truncate'
import {useMediaQuery} from 'react-responsive'
import {Card, Container, Row, Col} from 'react-bootstrap'

const defaultImg = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
function NYTNewsBox({article}){
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isMobileDevice = useMediaQuery({
        query: '(max-device-width: 500px)'
      })

    function handleClick(e){       
        e.preventDefault();   
        handleShow();    
    }

    function getImg(){
        if(!article.multimedia && article.multimedia.length === 0){
            return defaultImg;
        }
        for(var i = 0; i < article.multimedia.length; i++){
            if(article.multimedia[i].width >= 2000 ){
                return article.multimedia[i].url;
            }
        }
        return defaultImg;
    }

    return (
        <>
        {(isMobileDevice) ? 
        <Link className="MobileNewsBox" to={`/NYTArticle?id=${article.url}`}>
            <Card>
                <Card.Img variant="top" src={getImg()} />
                <Card.Body>
                    <Card.Title>
                        {article.title}
                        <MdShare size={20} onClick={(e) => handleClick(e)} />
                    </Card.Title>
                    <div className="MobileNewsBoxDescription">
                    <TextTruncate className="NewsBoxDescription" line={3} text={article.abstract} />
                    </div>
                    <p className="Date">{article.published_date.substring(0,10)}</p>
                    {getSectionTag(article)}  
                </Card.Body>
            </Card>
        </Link> :
        <Link className="NewsBox"  to={`/NYTArticle?id=${article.url}`}>
            <div className="NewsBoxLeft">
                <img src={getImg()} alt="loading..."/>
            </div>             
            <div className = "NewsBoxRight">
                <div className = "NewsTitle">
                    <h3>{article.title}</h3>
                    <MdShare size={20} onClick={(e) => handleClick(e)} />              
                </div> 
                <TextTruncate className="NewsBoxDescription" line={3} text={article.abstract} />
                <p className="Date">{article.published_date.substring(0,10)}</p>
                <div className="Section">{getSectionTag(article)}</div>                 
            </div>                
        </Link>}
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.title}</Modal.Title>
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
                            <FacebookShareButton children="" url={article.url} hashtag="#CSCI_571_NewsApp">
                                <FacebookIcon className="Icon" />
                            </FacebookShareButton>
                        </Col>   
                        <Col>
                            <TwitterShareButton children="" url={article.url} hashtags={["CSCI_571_NewsApp"]}>
                                <TwitterIcon className="Icon" />
                            </TwitterShareButton>
                        </Col>
                        <Col>
                            <EmailShareButton children="" url={article.url} subject="#CSCI_571_NewsApp">
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
export default NYTNewsBox;

function getSectionTag(myarticle){
    if(sectionSet.has(myarticle.section.toUpperCase())){
        return <p className={`${myarticle.section.toUpperCase()}Tag`}>{myarticle.section.toUpperCase()}</p>
    }
    else{
        return <p className="otherTag">{(myarticle.section !== "") ? myarticle.section.toUpperCase() : "NONE"}</p>
    }
}