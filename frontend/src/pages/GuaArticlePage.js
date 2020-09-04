import React from 'react'
import NotFoundPage from './NotFoundPage'
import Loading from '../components/Loading'
import {FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton} from "react-share"
import CommentBox from '../components/CommentBox'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {FaRegBookmark, FaBookmark, FaChevronDown, FaChevronUp, FaRegThumbsUp} from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import {Container, Row, Col} from 'react-bootstrap'
import backendUrl from './backendUrl'

const defaultImg = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
class GuaArticlePage extends React.Component{
    constructor(props){
        super(props);
        const prams = new URLSearchParams(this.props.location.search);
        this.state = {
            id: prams.get("id"),
            loading: true,
            json: null,
            showFull: false,
            upvotes: 0,
        };
        this.onClick = this.changeShow.bind(this);
        this.myRef = React.createRef();
        this.Ref = React.createRef();
        this.addFavourite = this.addFavourite.bind(this);
        this.deleteFavourite = this.deleteFavourite.bind(this);
        this.upvote = this.upvote.bind(this);
    }

    async componentDidMount(){   
        const response =  await fetch(`${backendUrl}/GuaArticle?id=${this.state.id}`);
        if (!response.ok) throw new Error(response.statusText);
        const jsonObj = await response.json();
        if(jsonObj.response.status === "ok"){
            this.setState({json: jsonObj, loading: false});
        }  
        else{
            this.setState({loading: false});
        }  
        if(this.hasSaved()){
            this.setState({saved: true});
        }
        else{
            this.setState({saved: false});
        }
        const mongoData = await fetch(`${backendUrl}/mongodb?id=${this.state.id}`);
        const mongoJson = await mongoData.json();
        if(!mongoJson.hasOwnProperty("upvotes")) this.setState({upvotes: 0});
        else this.setState({upvotes: mongoJson.upvotes});
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        ReactTooltip.rebuild();
        if((this.state.showFull) && (!prevState.showFull)){
            this.scrollDown();
        }
        if((!this.state.showFull) && (prevState.showFull)){
            this.scrollUp();
        }
    }

    getImg(){
        var ass = this.state.json.response.content.blocks.main.elements[0].assets;
        if(ass.length === 0){
            return defaultImg;
        }
        for(var i = 0; i < ass.length; i++){
            if(ass[i].typeData.width >= 2000 ){
                return ass[i].file;
            }
        }
        return defaultImg;
    }
    
    changeShow(){
        if(this.state.showFull){
            this.setState({showFull: false});
        }
        else{
            this.setState({showFull: true});
        }
    }

    scrollDown(){
        this.myRef.current.scrollIntoView({behavior: 'smooth'});
    }

    scrollUp(){
        this.Ref.current.scrollIntoView({behavior: 'smooth'});
    }

    addFavourite(){
        if(this.state.saved){
            return toast(`You have already saved this news`);
        }
        if(localStorage.getItem("SaveGua")){
            var retrievedObject = localStorage.getItem("SaveGua");
            var jsonObj = JSON.parse(retrievedObject);
            jsonObj.GuaNews.push({id:this.state.id,
                title: this.state.json.response.content.webTitle,
                image: this.getImg(),
                date: this.state.json.response.content.webPublicationDate.substring(0, 10),
                section: this.state.json.response.content.sectionId,
                url: this.state.json.response.content.webUrl,
            });
            localStorage.setItem("SaveGua", JSON.stringify(jsonObj));
        }
        else{//no favourite news
            var GuaNews = {"GuaNews":[{id:this.state.id,
                title: this.state.json.response.content.webTitle,
                image: this.getImg(),
                date: this.state.json.response.content.webPublicationDate.substring(0, 10),
                section: this.state.json.response.content.sectionId,
                url: this.state.json.response.content.webUrl,
            }]}
            localStorage.setItem("SaveGua", JSON.stringify(GuaNews))
        }
        this.setState({saved: true});
        return toast(`Saving ${this.state.json.response.content.webTitle}`);
    }

    deleteFavourite(){
        if(!this.state.saved){
            return toast(`You have already deleted this news`);
        }
        if(localStorage.getItem("SaveGua")){
            var retrievedObject = localStorage.getItem("SaveGua");
            var jsonObj = JSON.parse(retrievedObject);
            if(jsonObj.GuaNews.length === 1){ //only this news in local storage
                localStorage.removeItem("SaveGua");
                this.setState({saved: false});
                return toast(`Removing - ${this.state.json.response.content.webTitle}`);
            }
            for(var i = 0; i < jsonObj.GuaNews.length; i++){
                if(jsonObj.GuaNews[i].id === this.state.id){
                    jsonObj.GuaNews.splice(i,1);
                    localStorage.setItem("SaveGua", JSON.stringify(jsonObj));
                    this.setState({saved: false});
                    return toast(`Removing - ${this.state.json.response.content.webTitle}`);
                }
            }    
            return toast(`do not find this news in local storage`);
        }
        else{
            return toast(`there is no saved news`);
        }
    }

    hasSaved(){
        if(!localStorage.getItem("SaveGua")){
            return false;
        }
        var retrievedObject = localStorage.getItem("SaveGua");
        var jsonObj = JSON.parse(retrievedObject);
        for(var i = 0; i < jsonObj.GuaNews.length; i++){
            if(jsonObj.GuaNews[i].id === this.state.id){
                return true;
            }
        }
        return false;
    }

    async upvote(){
        await fetch(`${backendUrl}/upvote?id=${this.state.id}`);
        const newUpvotes = this.state.upvotes+1;
        this.setState({upvotes: newUpvotes})
    }

    render(){
        if(this.state.loading){
            return <Loading />
        }
        else{
            if(this.state.json){
                var split = this.state.json.response.content.blocks.body[0].bodyTextSummary.split(".");
                var desLen = split.length;
                if(desLen <= 4){
                    return(
                        <>
                            <ToastContainer position="top-center" hideProgressBar={true}/>
                            <div className="ArticleDetail">
                                <h2>{this.state.json.response.content.webTitle}</h2>
                                <div className="Date">
                                    <p>{this.state.json.response.content.webPublicationDate.substring(0, 10)}</p>
                                </div>
                                <div className = "Icons">
                                    <ReactTooltip effect="solid"/>
                                    <Container fluid>
                                        <Row>
                                            <Col xs={1} md={9} xl={10}></Col>
                                            <Col xs="auto"  style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <FacebookShareButton data-tip="Facebook"  children="" url={this.state.json.response.content.webUrl} hashtag="#CSCI_571_NewsApp">
                                                    <FacebookIcon size={30} round={true}/>
                                                </FacebookShareButton>
                                            </Col>   
                                            <Col xs="auto" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <TwitterShareButton data-tip="Twitter"  children="" url={this.state.json.response.content.webUrl} hashtags={["CSCI_571_NewsApp"]}>
                                                    <TwitterIcon size={30} round={true}/>
                                                </TwitterShareButton>
                                            </Col>
                                            <Col xs="auto" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <EmailShareButton data-tip="Email" children="" url={this.state.json.response.content.webUrl} subject="#CSCI_571_NewsApp">
                                                    <EmailIcon size={30} round={true}/>
                                                </EmailShareButton>
                                            </Col>
                                            <Col xs={1}>
                                                {(this.hasSaved()) ? <FaBookmark data-tip="Bookmark" className="BookMark" size={30} style={{color: "red"}} onClick={this.deleteFavourite}/> : 
                                                <FaRegBookmark data-tip="Bookmark" className="BookMark" size={30} style={{color: "red"}} onClick={this.addFavourite}/>}
                                            </Col>
                                        </Row>
                                    </Container> 
                                </div>
                                <img src={this.getImg()} alt="loading..."/>
                                <div className="DetailDescription">
                                    <p>{this.state.json.response.content.blocks.body[0].bodyTextSummary}</p>  
                                    <div className="upvote">
                                        <FaRegThumbsUp className="FaRegThumbsUp" onClick={this.upvote}/>
                                        {this.state.upvotes}
                                    </div>
                                </div>  
                            </div> 
                            <CommentBox />
                        </>
                    )
                }
                else{
                    if(!this.state.showFull){
                        return(
                            <>
                                <ToastContainer position="top-center" hideProgressBar={true}/>
                                <div className="ArticleDetail">
                                    <h2>{this.state.json.response.content.webTitle}</h2>
                                    <div className="Date">
                                        <p>{this.state.json.response.content.webPublicationDate.substring(0, 10)}</p>
                                    </div>
                                    <div className = "Icons">
                                        <ReactTooltip effect="solid"/>
                                        <Container fluid>
                                            <Row>
                                                <Col xs={1} md={9} xl={10}></Col>
                                                <Col xs="auto"  style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <FacebookShareButton data-tip="Facebook"  children="" url={this.state.json.response.content.webUrl} hashtag="#CSCI_571_NewsApp">
                                                        <FacebookIcon size={30} round={true}/>
                                                    </FacebookShareButton>
                                                </Col>   
                                                <Col xs="auto" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <TwitterShareButton data-tip="Twitter"  children="" url={this.state.json.response.content.webUrl} hashtags={["CSCI_571_NewsApp"]}>
                                                        <TwitterIcon size={30} round={true}/>
                                                    </TwitterShareButton>
                                                </Col>
                                                <Col xs="auto" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <EmailShareButton data-tip="Email" children="" url={this.state.json.response.content.webUrl} subject="#CSCI_571_NewsApp">
                                                        <EmailIcon size={30} round={true}/>
                                                    </EmailShareButton>
                                                </Col>
                                                <Col xs={1}>
                                                    {(this.hasSaved()) ? <FaBookmark data-tip="Bookmark" className="BookMark" size={30} style={{color: "red"}} onClick={this.deleteFavourite}/> : 
                                                    <FaRegBookmark data-tip="Bookmark" className="BookMark" size={30} style={{color: "red"}} onClick={this.addFavourite}/>}
                                                </Col>
                                            </Row>
                                        </Container>     
                                    </div>
                                    <img src={this.getImg()} alt="loading..."/>
                                    <div className="DetailDescription">
                                        <p ref={this.Ref}>{split.slice(0,4).join(".") + "."}</p>
                                        <FaChevronDown className="FaChevronDown" onClick={this.onClick}/>
                                        <div className="upvote">
                                            <FaRegThumbsUp className="FaRegThumbsUp" onClick={this.upvote}/>
                                            {this.state.upvotes}
                                        </div>
                                    </div>
                                </div>
                                <CommentBox />
                            </>
                        )
                    }
                    else{
                        return(
                            <>
                                <ToastContainer position="top-center" hideProgressBar={true}/>
                                <div className="ArticleDetail">
                                    <h2>{this.state.json.response.content.webTitle}</h2>
                                    <div className="Date">
                                        <p>{this.state.json.response.content.webPublicationDate.substring(0, 10)}</p>
                                    </div>
                                    <div className = "Icons">
                                        <ReactTooltip effect="solid"/>
                                        <Container fluid>
                                            <Row>
                                                <Col xs={1} md={9} xl={10}></Col>
                                                <Col xs="auto"  style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <FacebookShareButton data-tip="Facebook"  children="" url={this.state.json.response.content.webUrl} hashtag="#CSCI_571_NewsApp">
                                                        <FacebookIcon size={30} round={true}/>
                                                    </FacebookShareButton>
                                                </Col>   
                                                <Col xs="auto" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <TwitterShareButton data-tip="Twitter"  children="" url={this.state.json.response.content.webUrl} hashtags={["CSCI_571_NewsApp"]}>
                                                        <TwitterIcon size={30} round={true}/>
                                                    </TwitterShareButton>
                                                </Col>
                                                <Col xs="auto" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                    <EmailShareButton data-tip="Email" children="" url={this.state.json.response.content.webUrl} subject="#CSCI_571_NewsApp">
                                                        <EmailIcon size={30} round={true}/>
                                                    </EmailShareButton>
                                                </Col>
                                                <Col xs={1}>
                                                    {(this.hasSaved()) ? <FaBookmark data-tip="Bookmark" className="BookMark" size={30} style={{color: "red"}} onClick={this.deleteFavourite}/> : 
                                                    <FaRegBookmark data-tip="Bookmark" className="BookMark" size={30} style={{color: "red"}} onClick={this.addFavourite}/>}
                                                </Col>
                                            </Row>
                                        </Container> 
                                    </div>
                                    <img src={this.getImg()} alt="loading..."/>
                                    <div className="DetailDescription">
                                        <p>{split.slice(0,4).join(".") + "."}</p>
                                        <p ref={this.myRef}>{split.slice(4,desLen).join(".")}</p>
                                        <FaChevronUp className="FaChevronUp" onClick={this.onClick}/>
                                        <div className="upvote">
                                            <FaRegThumbsUp className="FaRegThumbsUp" onClick={this.upvote}/>
                                            {this.state.upvotes}
                                        </div>
                                    </div>   
                                </div>
                                <CommentBox />
                            </>
                        )
                    }
                }
            }
            else{
                return(
                    <>
                        <NotFoundPage />
                    </>
                )
            }
        } 
    }  
}
export default GuaArticlePage;