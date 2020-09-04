import React from 'react'
import NYTNewsCard from '../components/NYTNewsCard'
import GuaNewsCard from '../components/GuaNewsCard'
import Loading from '../components/Loading'
import backendUrl from './backendUrl'

class SearchPage extends React.Component{
    constructor(props){
        super(props);
        const prams = new URLSearchParams(this.props.location.search);
        this.state = {
            keyword: prams.get("keyword"),
            loading: true,
            json: null,
        };
    }

    async componentDidMount(){   
        var data = await Promise.all([
            fetch(`${backendUrl}/NYTSearch?keyword=${this.state.keyword}`).then((response) => response.json()),
            fetch(`${backendUrl}/GuaSearch?keyword=${this.state.keyword}`).then((response) => response.json()),
        ]);
        this.setState({loading: false, json: data}) 
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.location.search !== prevProps.location.search){
            const prams = new URLSearchParams(this.props.location.search);
            this.setState({keyword: prams.get("keyword"), loading: true, json: null});
            var data = await Promise.all([
                fetch(`${backendUrl}/NYTSearch?keyword=${prams.get("keyword")}`).then((response) => response.json()),
                fetch(`${backendUrl}/GuaSearch?keyword=${prams.get("keyword")}`).then((response) => response.json()),
            ]);
            this.setState({loading: false, json: data}) 
        }
      }

    render(){
        if(this.state.loading){
            return <Loading />
        }
        else{
            return(
                <>
                    <div className="SearchResult">
                        {(this.state.json[0].response.docs.length === 0) && (this.state.json[1].response.results.length === 0) ?
                        <h2>no results</h2> : 
                        <h2>Results</h2>}
                        {(this.state.json[0].response.docs.length !== 0) ?
                        <>
                            {(this.state.json[0].response.docs[0]) ? <NYTNewsCard article={this.state.json[0].response.docs[0]} /> : null}
                            {(this.state.json[0].response.docs[1]) ? <NYTNewsCard article={this.state.json[0].response.docs[1]} /> : null}
                            {(this.state.json[0].response.docs[2]) ? <NYTNewsCard article={this.state.json[0].response.docs[2]} /> : null}
                            {(this.state.json[0].response.docs[3]) ? <NYTNewsCard article={this.state.json[0].response.docs[3]} /> : null}
                            {(this.state.json[0].response.docs[4]) ? <NYTNewsCard article={this.state.json[0].response.docs[4]} /> : null}
                        </>
                        : null
                        }
                        {(this.state.json[1].response.results.length !== 0) ?
                        <>
                            {(this.state.json[1].response.results[0]) ? <GuaNewsCard article={this.state.json[1].response.results[0]} /> : null}
                            {(this.state.json[1].response.results[1]) ? <GuaNewsCard article={this.state.json[1].response.results[1]} /> : null}
                            {(this.state.json[1].response.results[2]) ? <GuaNewsCard article={this.state.json[1].response.results[2]} /> : null}
                            {(this.state.json[1].response.results[3]) ? <GuaNewsCard article={this.state.json[1].response.results[3]} /> : null}
                            {(this.state.json[1].response.results[4]) ? <GuaNewsCard article={this.state.json[1].response.results[4]} /> : null}
                        </>
                        : null
                        } 
                    </div>
                </>
            )
        }

    }
}
export default SearchPage;