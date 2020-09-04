import React from 'react'
import FavoriteCard from '../components/FavoriteCard'
import Loading from '../components/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row, Col} from 'react-bootstrap'

class FavoritePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            NYTNews: null,
            GuaNews: null,
            reload: false,
        };
        this.handler = this.handler.bind(this);
    }

    async componentDidMount(){
        var NYTjson = await JSON.parse(localStorage.getItem("SaveNYT"));
        var Guajson = await JSON.parse(localStorage.getItem("SaveGua"));
        this.setState({NYTNews: NYTjson,
                    GuaNews:Guajson,
                    loading: false});
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.reload !== prevState.reload){
            this.setState({reload: false});
        } 
    }

    async handler(title){
        this.setState({reload: true, loading: true});
        var NYTjson = await JSON.parse(localStorage.getItem("SaveNYT"));
        var Guajson = await JSON.parse(localStorage.getItem("SaveGua"));
        this.setState({NYTNews: NYTjson,
                    GuaNews:Guajson,
                    loading: false});
        return toast(`Removing - ${title}`);
    }

    render(){
        if(this.state.loading){
            return <Loading />
        }
        else{
            if(this.state.GuaNews === null && this.state.NYTNews === null){ //no favorite news
                return(
                    <>
                        <ToastContainer position="top-center" hideProgressBar={true}/>
                        <h2>You have no saved articles</h2>
                    </>
                )
            }
            else{
                return(
                    <>
                    <ToastContainer position="top-center" hideProgressBar={true}/>
                    <div className="Favorite">
                    <h2>Favorites</h2>
                    <Container fluid>
                        <Row>
                            {(this.state.NYTNews !== null) ? this.state.NYTNews.NYTNews.map((news,key) => (
                            <Col md={6} lg={3} key={key}>
                            <FavoriteCard 
                                title={news.title}
                                url={news.url}
                                image={news.image}
                                date={news.date}
                                section={news.section}
                                api="NYTIMES"
                                handler={this.handler}
                            /></Col>
                            )) :  null}
                            {(this.state.GuaNews !== null) ? this.state.GuaNews.GuaNews.map((news,key) => (
                            <Col md={6} lg={3} key={key}>    
                            <FavoriteCard 
                                title={news.title}
                                url={news.url}
                                image={news.image}
                                date={news.date}
                                section={news.section}
                                api="GUARDIAN"
                                id={news.id}
                                handler={this.handler}
                            /></Col>
                            )) : null}
                        </Row>
                    </Container>
                    </div> 
                    </>
                )
            }
        }
    }
}
export default FavoritePage;