import React from 'react'
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import WorldPage from './pages/WorldPage'
import PoliticsPage from './pages/PoliticsPage'
import BusinessPage from './pages/BusinessPage'
import TechnologyPage from './pages/TechnologyPage'
import SportsPage from './pages/SportsPage'
import NYTArticlePage from './pages/NYTArticlePage'
import GuaArticlePage from './pages/GuaArticlePage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css';
import SearchPage from './pages/SearchPage'
import FavoritePage from './pages/FavoritePage'


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        api: "Guardian"
    };
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount(){
    if(!localStorage.getItem("SwitchState")){
      localStorage.setItem("SwitchState", this.state.api);
    }
    else{
      var SwitchState = localStorage.getItem("SwitchState");
      this.setState({api: SwitchState});
    }  
  }

  changeState(){
    if(this.state.api === "Guardian"){
      localStorage.setItem("SwitchState", "NYTimes");
      this.setState({api: "NYTimes"});
    }
    else if(this.state.api === "NYTimes"){
      localStorage.setItem("SwitchState", "Guardian");
      this.setState({api: "Guardian"});
    }
    else{
      console.log("api state goes wrong!");
    }
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div id="page-body">
            <Switch>
              <Route 
                path="/"
                render={(routeProps) => (
                  <>
                    <Navigation mode="Home" handler={this.changeState} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")}/>
                    <HomePage {...routeProps} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")} />
                  </>
                )}   
              exact />
              <Route 
                path="/World" 
                render={(routeProps) => (
                  <>
                    <Navigation mode="World" handler={this.changeState} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")}/>
                    <WorldPage {...routeProps} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")} />
                  </>
                )}   
              />
              <Route 
                path="/Politics"
                render={(routeProps) => (
                  <>
                    <Navigation mode="Politics" handler={this.changeState} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")}/>
                    <PoliticsPage {...routeProps} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")} />
                  </>
                )}   
              />
              <Route 
                path="/Business"
                render={(routeProps) => (
                  <>
                    <Navigation mode="Business" handler={this.changeState} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")}/>
                    <BusinessPage {...routeProps} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")} />
                  </>
                )}   
              />
              <Route 
                path="/Technology"
                render={(routeProps) => (
                  <>
                    <Navigation mode="Technology" handler={this.changeState} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")}/>
                    <TechnologyPage {...routeProps} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")} />
                  </>
                )}   
              />
              <Route 
                path="/Sports"
                render={(routeProps) => (
                  <>
                    <Navigation mode="Sports" handler={this.changeState} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")}/>
                    <SportsPage {...routeProps} api={(localStorage.getItem("SwitchState") ? localStorage.getItem("SwitchState") : "Guardian")} />
                  </>
                )}    
              />
              <Route path="/NYTArticle" 
                render={(routeProps) => (
                  <>
                    <Navigation mode="article" />
                    <NYTArticlePage {...routeProps}/>
                  </>
                )}
              />
              <Route path="/GuaArticle"
                render={(routeProps) => (
                  <>
                    <Navigation mode="article" />
                    <GuaArticlePage {...routeProps}/>
                  </>
                )} 
              />
              <Route path="/Search" 
              render={(routeProps) => (
                  <>
                    <Navigation mode="search" />
                    <SearchPage {...routeProps}/>
                  </>
                )} 
              />
              <Route path="/Favorite" 
                render={ ()=>(
                  <>
                    <Navigation mode="favorite" />
                    <FavoritePage />
                  </>
                )}
              />
              <Route 
                render={() => (
                  <>
                    <Navigation mode="article" />
                    <NotFoundPage />
                  </>  
                )}
              />        
            </Switch>     
          </div> 
        </div>
      </Router>
    );
  }
}

export default App;
