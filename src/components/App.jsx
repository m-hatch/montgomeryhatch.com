import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, 
  Route } from 'react-router-dom';
import appData from '../data.json';
import ScrollToTop from './ScrollToTop';
import NavbarContainer from './NavbarContainer';
import Main from './Main';
import Blog from './Blog';
import ContactFormContainer from './ContactFormContainer';
import Footer from './Footer';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class App extends React.Component {

  componentDidMount() {
    fetch('http://localhost:3000/alldata')
      .then(response => response.json())
      .then(data => this.props.dispatch(
        actions.setMainContent(data))
      );
  }

  getData(data) {
    return this.props.content;
    //return appData; // static data for testing
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div> 

            <NavbarContainer 
              name={ this.getData().myinfo.name } 
              nav={ this.getData().navigation } />
            
            <Route exact path="/" render={(props) => 
              <Main appData={ this.getData() }/> 
            }/>

            <Route path="/blog" render={(props) => 
              <Blog {...props} content={ this.getData().blog }/> 
            }/>

            <ContactFormContainer />

            <Footer links={ this.getData().myinfo.links } />

          </div>
        </ScrollToTop>
      </Router>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    content: state.main.content
  };
};

export default connect(
  mapStateToProps
)(App);