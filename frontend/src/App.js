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
import CreateProjectForm from "./components/CreateProjectForm";
import CreateNoteForm from "./components/CreateNoteForm";

const apiUrl = 'http://127.0.0.1:8000/';
const apiServices = ['users', 'projects', 'notes'];
const apiAuth = 'api/token-auth';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': ''
        }
        this.deleteProject = this.deleteProject.bind(this)
        this.createProject = this.createProject.bind(this)
        this.createNote = this.createNote.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
    }

    getToken(username, password) {
        axios.post(apiUrl + apiAuth + '/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data['token'], username);
            })
            .catch(error => alert('Неверный логин или пароль'));
    }

    setToken(token) {
        const cookies = new Cookies();
        cookies.set('token', token);
        this.setState({'token': token}, () => this.loadData());
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData());
    }

    isAuthenticated() {
        return this.state.token !== '';
    }

    logout() {
        this.setToken('');
    }

    loadData() {
        const headers = this.getHeaders();
        apiServices.forEach((apiService) => {
            axios.get(apiUrl + 'api/' + apiService + '/', {headers})
                .then(response => {
                    this.setState({[apiService]: response.data.results});
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

    deleteProject(id) {
        const headers = this.getHeaders()
        axios
            .delete(apiUrl + 'api/' + apiServices[1] + `/${id}/`, {headers})
            .then(() => {
                this.setState({'projects': this.state.projects.filter(project => project.id !== id)})
                this.setState({'notes': this.state.notes.filter(note => note.project.id !== id)})
            })
            .catch(error => console.log(error))
    }

    deleteNote(id) {
        const headers = this.getHeaders()
        axios
            .delete(apiUrl + 'api/' + apiServices[2] + `/${id}/`, {headers})
            .then(() => {
                this.setState({'notes': this.state.notes.filter(note => note.id !== id)})
            })
            .catch(error => console.log(error))
    }

    createProject(project) {
        const headers = this.getHeaders()
        axios
            .post(apiUrl + 'api/' + apiServices[1] + '/', project, {headers})
            .then((response) => {
                let projectData = {
                    ...response.data,
                    users: response.data.users.map(id => this.state.users.find(user => user.id === id))
                };
                this.setState({'projects': [...this.state.projects, projectData]})
            })
            .catch(error => console.log(error))
    }

    createNote(note) {
        const headers = this.getHeaders()
        axios
            .post(apiUrl + 'api/' + apiServices[2] + '/', note, {headers})
            .then((response) => {
                console.log(response.data)
                let noteData = {
                    ...response.data,
                    project: this.state.projects.find(project => project.id === response.data.project),
                    createdByUser: this.state.users.find(user => user.id === response.data.project)
                };
                this.setState({'notes': [...this.state.notes, noteData]})
            })
            .catch(error => console.log(error))
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
                                   component={() => <ProjectsList deleteProject={this.deleteProject}
                                                                  projects={this.state.projects}/>}/>
                            <Route exact path='/notes/' component={() => <NotesList deleteNote={this.deleteNote}
                                                                                    notes={this.state.notes}/>}/>
                            <Route exact path='/login/' component={() =>
                                <LoginForm getToken={(username, password) => this.getToken(username, password)}/>}/>
                            <Route exact path='/projects/create/'>
                                <CreateProjectForm createProject={this.createProject} users={this.state.users}/>
                            </Route>
                            <Route exact path='/notes/create/'>
                                <CreateNoteForm createNote={this.createNote} users={this.state.users}
                                                projects={this.state.projects}/>
                            </Route>
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
