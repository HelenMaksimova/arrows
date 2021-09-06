import React from 'react';
import './App.css';
import axios from "axios";
import UsersList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectsList from "./components/Project";
import NotesList from "./components/Note";
import Index from "./components/Index";
import NotFound from "./components/NotFound";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProjectDetailItem from "./components/PjojectDetail";

const apiUrl = 'http://127.0.0.1:8000/api/'
const apiServices = ['users', 'projects', 'notes']

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
        }
    }

    componentDidMount() {

        axios.get(apiUrl + apiServices[0] + '/')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users,
                    }
                );
            }).catch(error => console.log(error));

        axios.get(apiUrl + apiServices[1] + '/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects,
                    }
                );
            }).catch(error => console.log(error));

        axios.get(apiUrl + apiServices[2] + '/')
            .then(response => {
                const notes = response.data.results
                this.setState(
                    {
                        'notes': notes,
                    }
                );
            }).catch(error => console.log(error));

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Menu/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={() => <Index/>}/>
                            <Route exact path='/users/' component={() => <UsersList users={this.state.users}/>}/>
                            <Route exact path='/projects/'
                                   component={() => <ProjectsList projects={this.state.projects}/>}/>
                            <Route exact path='/notes/' component={() => <NotesList notes={this.state.notes}/>}/>
                            <Route exact path='/projects/:id'>
                                <ProjectDetailItem projects={this.state.projects} notes={this.state.notes}/>
                            </Route>
                            <Route component={() => <NotFound/>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}


export default App;
