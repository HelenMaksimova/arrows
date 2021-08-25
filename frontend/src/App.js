import React from 'react';
import './App.css';
import axios from "axios";
import UsersList from "./components/User";
import MenuList from "./components/Menu";
import Footer from "./components/Footer";

const apiUrl = 'http://127.0.0.1:8000/api/'
const apiService = 'users'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'menu_points': []
        }
    }

    componentDidMount() {

        //Данные для меню - пока хард-код
        const menu_points = [
            {
                'name': 'Menu_point_1'
            },
            {
                'name': 'Menu_point_2'
            },
            {
                'name': 'Menu_point_3'
            },
            {
                'name': 'Menu_point_4'
            },
            {
                'name': 'Menu_point_5'
            }
        ]

        //подгрузка данных по пользователям из бэк-энда
        axios.get(apiUrl + apiService + '/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users,
                        'menu_points': menu_points
                    }
                )
            }).catch(error => console.log(error))

    }

    render() {
        return (
            <div>
                <MenuList menu_items={this.state.menu_points}/>
                <UsersList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;
