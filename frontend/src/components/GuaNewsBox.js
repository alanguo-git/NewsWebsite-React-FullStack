import React from 'react'
import {Link} from 'react-router-dom'
import sectionSet from '../pages/LocalVariable'
import {FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from "react-share"
import Modal from 'react-bootstrap/Modal'
import {MdShare} from 'react-icons/md'
import TextTruncate from 'react-text-truncate'
import { useMediaQuery } from 'react-responsive'
import {Card, Container, Row, Col} from 'react-bootstrap'

const defaultImg = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
function GuaNewsBox({article}){
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

    return (
        <>
        {(isMobileDevice) ? 
        <Link className="MobileNewsBox" to={`/GuaArticle?id=${article.id}`}>
            <Card>
                <Card.Img variant="top" src={(article.blocks.hasOwnProperty("main") && 
                    article.blocks.main.elements[0].assets.length !== 0 && 
                    article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].hasOwnProperty('file')) ? 
                    article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file : defaultImg} />
                <Card.Body>
                    <Card.Title>
                        {article.webTitle}
                        <MdShare size={20} onClick={(e) => handleClick(e)} />
                    </Card.Title>
                    <div className="MobileNewsBoxDescription">
                    <TextTruncate className="NewsBoxDescription" line={3} text={article.blocks.body[0].bodyTextSummary} />
                    </div>
                    <p className="Date">{article.webPublicationDate.substring(0,10)}</p>
                    {getSectionTag(article)}  
                </Card.Body>
            </Card>
        </Link> :
        <Link className="NewsBox" to={`/GuaArticle?id=${article.id}`}>
            <div className="NewsBoxLeft">
                <img src={(article.blocks.hasOwnProperty("main") && 
                article.blocks.main.elements[0].assets.length !== 0 && 
                article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].hasOwnProperty('file')) ? 
                article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file : defaultImg} alt="loading..."/>
            </div>             
            <div className = "NewsBoxRight">
                <div className = "NewsTitle">
                    <h3>{article.webTitle}</h3>
                    <MdShare size={20} onClick={(e) => handleClick(e)} />  
                </div> 
                <TextTruncate className="NewsBoxDescription" line={3} text={article.blocks.body[0].bodyTextSummary} />
                <p className="Date">{article.webPublicationDate.substring(0,10)}</p>
                <div className="Section">{getSectionTag(article)}</div>             
            </div>                
        </Link>}
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{article.webTitle}</Modal.Title>
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
                            <FacebookShareButton children="" url={article.webUrl} hashtag="#CSCI_571_NewsApp">
                                <FacebookIcon className="Icon" />
                            </FacebookShareButton>
                        </Col>   
                        <Col>
                            <TwitterShareButton children="" url={article.webUrl} hashtags={["CSCI_571_NewsApp"]}>
                                <TwitterIcon className="Icon" />
                            </TwitterShareButton>
                        </Col>
                        <Col>
                            <EmailShareButton children="" url={article.webUrl} subject="#CSCI_571_NewsApp">
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
export default GuaNewsBox;

function getSectionTag(myarticle){
    if(sectionSet.has(myarticle.sectionId.toUpperCase())){
        return <p className={`${myarticle.sectionId.toUpperCase()}Tag`}>{myarticle.sectionId.toUpperCase()}</p>
    }
    else{
        return <p className="otherTag">{(myarticle.sectionId !== "") ? myarticle.sectionId.toUpperCase() : "NONE"}</p>
    }
}