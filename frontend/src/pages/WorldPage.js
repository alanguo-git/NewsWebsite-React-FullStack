import React from 'react'
import GuaNews from '../components/GuaNews'
import NYTNews from '../components/NYTNews'
import Loading from '../components/Loading'
import backendUrl from './backendUrl'

class WorldPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            api: props.api,
            loading: true,
            json: null,
        };
    }
    static getDerivedStateFromProps(props, state){
        if(props.api !== state.api){
            return {loading: true, api: props.api};
        }   
        return null;
    }

    async componentDidMount(){   
        const NYTUrl = backendUrl + '/NYTWorld';
        const GuaUrl = backendUrl + '/GuaWorld';
        const response = (this.props.api === "NYTimes") ? await fetch(NYTUrl) : await fetch(GuaUrl);
        if (!response.ok) throw new Error(response.statusText)
        const jsonObj = await response.json();     
        this.setState({json: jsonObj, loading: false});
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.api !== prevState.api){
            this.refresh();
        }
    }

    async refresh(){
        this.setState({loading: true})
        const NYTUrl = backendUrl + '/NYTWorld';
        const GuaUrl = backendUrl + '/GuaWorld';
        const response = (this.props.api === "NYTimes") ? await fetch(NYTUrl) : await fetch(GuaUrl);
        if (!response.ok) throw new Error(response.statusText)
        const jsonObj = await response.json();     
        this.setState({json: jsonObj, loading: false})
    }

    render(){
        if(this.props.api === "NYTimes"){
            return (
                <>
                    {(this.state.loading || !this.state.json) ? <Loading /> : <NYTNews articles={this.state.json.results} />}   
                </>
                
            );
        }
        else if(this.props.api === "Guardian"){
            return (
                <>
                    {(this.state.loading || !this.state.json) ? <Loading /> : <GuaNews articles={this.state.json.response.results} />}
                </>
                
            );
        }
        else{
            return(
                <p>api state goes wrong</p>
            );
        }
        
    }   
}
    
export default WorldPage;