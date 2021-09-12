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
import LoginForm from "./components/LoginForm";
import Cookies from "universal-cookie/lib";

const apiUrl = 'http://127.0.0.1:8000/';
const apiServices = ['users', 'projects', 'notes'];
const apiAuth = 'api-token-auth';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': ''
        }
    }

    getToken(username, password) {
        axios.post(apiUrl + apiAuth + '/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data['token']);
            })
            .catch(error => alert('Неверный логин или пароль'));
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    isAuthenticated() {
        return this.state.token !== '';
    }

    logout() {
        this.setToken('')
        window.location.reload()
    }

    loadData() {
        const headers = this.getHeaders()
        apiServices.forEach((apiService) => {
            axios.get(apiUrl + 'api/' + apiService + '/', {headers})
                .then(response => {
                    this.setState(
                        {
                            [apiService]: response.data.results
                        }
                    );
                }).catch(error => {
                console.log(error);
                this.setState(
                    {
                        [apiService]: []
                    }
                );
            });
        })
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    componentDidMount() {
        this.getTokenFromStorage();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Menu userIsAuth={this.isAuthenticated.bind(this)}
                          userLogout={this.logout.bind(this)}/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={() => <Index/>}/>
                            <Route exact path='/users/' component={() => <UsersList users={this.state.users}/>}/>
                            <Route exact path='/projects/'
                                   component={() => <ProjectsList projects={this.state.projects}/>}/>
                            <Route exact path='/notes/' component={() => <NotesList notes={this.state.notes}/>}/>
                            <Route exact path='/login/' component={() =>
                                <LoginForm getToken={(username, password) => this.getToken(username, password)}/>}/>
                            <Route path='/projects/:id'>
                                <ProjectDetailItem projects={this.state.projects} notes={this.state.notes}/>
                            </Route>
                            <Route component={() => <NotFound/>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}

export default App;
