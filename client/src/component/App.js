
import React, { Component } from 'react';
// import {BrowserRouter,Router} from 'react-router-dom'
import Header from './Header';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {connect} from 'react-redux';
import * as action from '../actions';
import Landing from './Landing';
import Dashboard from './Dashbordd';
import SurveyNew from './surveys/SurveyNew';

// const SurveyNew =()=> <h2>SurveyNew</h2>
// const Dashboard =()=> <h2>Dashboard</h2>

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
        // console.log(this.props,"as")
    }
    

render(){
    return(
        <div className="container">
           <Router>
               <div>
                   <Header/>
                   <Route exact path='/' component={Landing}/>
                   <Route exact path='/Surveys' component={Dashboard}/>
                   <Route path='/surveys/new' component={SurveyNew}/>
               </div>
           </Router>
        </div>
    )
    }
}



export default connect(null,action) (App);