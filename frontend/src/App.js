import React from 'react';
import './App.css';
import UsersList from "./components/User";
import MenuList from "./components/Menu";
import Footer from "./components/Footer";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'menu_points': []
        }
    }

    componentDidMount() {
        const users = [
            {
                'username': 'User',
                'first_name': 'Name',
                'last_name': 'Last Name',
                'email': 'E-mail'
            },
            {
                'username': 'User',
                'first_name': 'Name',
                'last_name': 'Last Name',
                'email': 'E-mail'
            },
            {
                'username': 'User',
                'first_name': 'Name',
                'last_name': 'Last Name',
                'email': 'E-mail'
            },
            {
                'username': 'User',
                'first_name': 'Name',
                'last_name': 'Last Name',
                'email': 'E-mail'
            },
            {
                'username': 'User',
                'first_name': 'Name',
                'last_name': 'Last Name',
                'email': 'E-mail'
            }
        ]

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

        this.setState(
            {
                'users': users,
                'menu_points': menu_points
            }
        )
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
