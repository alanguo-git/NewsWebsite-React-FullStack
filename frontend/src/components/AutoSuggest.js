import React from 'react'
import AsyncSelect from 'react-select/async'
import _ from "lodash";
import { withRouter } from 'react-router-dom'

const loadingOptions = [
  { value: null, label: 'Loading...' },
]

class AutoSuggest extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      results: [], 
      selectedResult: null, 
      loading: true, 
      input: "" ,
      key: null,
      mode: this.props.mode,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.mode !== this.props.mode){
      this.setState({mode: this.props.mode});
    }
    if(this.state.mode !== "search" && this.state.key === null && prevState && prevState.mode === "search"){
      this.setState({key: this.state.value});
    } 
    if(this.state.mode !== "search" && this.state.key !== null){
      this.setState({key: null});
    }
  }

  handleSearchChange = async ( value ) => {
    this.setState({loading: true, input: value, results: loadingOptions})
  };

  getOptions = async (value, callback) => {
    if (!value) {
      return callback([]);
    }
    else{
      try {
        const response = await fetch(
          `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${value}`,
          {
            headers: {
              "Ocp-Apim-Subscription-Key": "Your Bing Autosuggest API key"
            }
          }
        );
        const data = await response.json();
        const resultsRaw = data.suggestionGroups[0].searchSuggestions;
        const results = resultsRaw.map(result => ({ label: result.displayText, value: result.displayText }));
        this.setState({results: results, loading: false});
        callback(this.state.results);
      } catch (error) {
        console.error(`Error fetching search ${value}`);
      }
    }
  }

  handleChange = (e) => {
    this.setState({value: e.value});
    this.props.history.push(`Search?keyword=${e.value}`); 
  }

  render(){
      return (
        <>
          <div className="App">          
            <AsyncSelect
              className="selectBar" placeholder="Enter keyword .."
              loadOptions={_.debounce(this.getOptions, 1000)}
              onInputChange={_.debounce(this.handleSearchChange, 1000)}
              onChange={this.handleChange}
              key={this.state.key}
            />
          </div>
        </>
      );
  }
}

export default withRouter(AutoSuggest);