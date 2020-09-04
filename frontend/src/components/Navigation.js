import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AutoSuggest from './AutoSuggest'
import {Navbar, Nav, Form} from 'react-bootstrap'
import {FaRegBookmark, FaBookmark} from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import {Link} from "react-router-dom" ;

class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        mode: this.props.mode,
        api: this.props.api,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.mode !== this.state.mode){
      this.setState({mode: this.props.mode});
    }
    if(this.props.api !== this.state.api){
      this.setState({api: this.props.api})
    }
  }

  render(){
    if(this.state.mode === "favorite"){
      return(
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>        
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>      
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaBookmark data-tip="Bookmark"/></Nav.Link>
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "article"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">           
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>      
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "search"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">           
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>      
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "Home"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="text-white" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>      
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
            <Navbar.Text className="text-white NYTimes">NYTimes</Navbar.Text>
            <Form>
              {(this.state.api === "Guardian") ? 
                <Form.Check  defaultChecked type="switch" id="custom-switch" label="" onChange={this.props.handler}/> :
                <Form.Check type="switch" id="custom-switch" label="" onChange={this.props.handler}/>
              }
            </Form>
            <Navbar.Text className="text-white Guardian">Guardian</Navbar.Text> 
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "World"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>      
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
            <Navbar.Text className="text-white NYTimes">NYTimes</Navbar.Text>
            <Form>
              {(this.state.api === "Guardian") ? 
                <Form.Check  defaultChecked type="switch" id="custom-switch" label="" onChange={this.props.handler}/> :
                <Form.Check type="switch" id="custom-switch" label="" onChange={this.props.handler}/>
              }
            </Form>
            <Navbar.Text className="text-white Guardian">Guardian</Navbar.Text> 
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "Politics"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>     
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
            <Navbar.Text className="text-white NYTimes">NYTimes</Navbar.Text>
            <Form>
              {(this.state.api === "Guardian") ? 
                <Form.Check  defaultChecked type="switch" id="custom-switch" label="" onChange={this.props.handler}/> :
                <Form.Check type="switch" id="custom-switch" label="" onChange={this.props.handler}/>
              }
            </Form>
            <Navbar.Text className="text-white Guardian">Guardian</Navbar.Text> 
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "Business"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>      
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
            <Navbar.Text className="text-white NYTimes">NYTimes</Navbar.Text>
            <Form>
              {(this.state.api === "Guardian") ? 
                <Form.Check  defaultChecked type="switch" id="custom-switch" label="" onChange={this.props.handler}/> :
                <Form.Check type="switch" id="custom-switch" label="" onChange={this.props.handler}/>
              }
            </Form>
            <Navbar.Text className="text-white Guardian">Guardian</Navbar.Text> 
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "Technology"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>     
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
            <Navbar.Text className="text-white NYTimes">NYTimes</Navbar.Text>
            <Form>
              {(this.state.api === "Guardian") ? 
                <Form.Check  defaultChecked type="switch" id="custom-switch" label="" onChange={this.props.handler}/> :
                <Form.Check type="switch" id="custom-switch" label="" onChange={this.props.handler}/>
              }
            </Form>
            <Navbar.Text className="text-white Guardian">Guardian</Navbar.Text> 
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else if(this.state.mode === "Sports"){
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest mode={this.state.mode}/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="text-white" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>    
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
            <Navbar.Text className="text-white NYTimes">NYTimes</Navbar.Text>
            <Form>
              {(this.state.api === "Guardian") ? 
                <Form.Check  defaultChecked type="switch" id="custom-switch" label="" onChange={this.props.handler}/> :
                <Form.Check type="switch" id="custom-switch" label="" onChange={this.props.handler}/>
              }
            </Form>
            <Navbar.Text className="text-white Guardian">Guardian</Navbar.Text> 
          </Navbar.Collapse>   
        </Navbar>
      )
    }
    else{
      return (
        <Navbar className="NavigationBar" bg="light" expand="lg">
          <AutoSuggest/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="mr-auto">
              <Nav.Link className="" as={Link} to="/" href="/">Home</Nav.Link>
              <Nav.Link className="" as={Link} to="/World" href="/World">World</Nav.Link>
              <Nav.Link className="" as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
              <Nav.Link className="" as={Link} to="/Business" href="/Business">Business</Nav.Link>
              <Nav.Link className="" as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
              <Nav.Link className="" as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>      
            </Nav> 
            <ReactTooltip effect="solid"/>
            <Nav.Link className="text-white" as={Link} to="/Favorite" href="/Favorite" id="NavBookmark"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
            <Navbar.Text className="text-white NYTimes">NYTimes</Navbar.Text>
            <Form>
              {(this.state.api === "Guardian") ? 
                <Form.Check  defaultChecked type="switch" id="custom-switch" label="" onChange={this.props.handler}/> :
                <Form.Check type="switch" id="custom-switch" label="" onChange={this.props.handler}/>
              }
            </Form>
            <Navbar.Text className="text-white Guardian">Guardian</Navbar.Text> 
          </Navbar.Collapse>   
        </Navbar>
      )
    }
  }   
}

export default Navigation;