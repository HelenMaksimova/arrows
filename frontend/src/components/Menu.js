import React from 'react';
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <div className="menu">
            <ul className="menu_list">
                <li className="menu_point">
                    <Link to='/'>Главная</Link>
                </li>
                <li className="menu_point">
                    <Link to='/users/'>Пользователи</Link>
                </li>
                <li className="menu_point">
                    <Link to='/projects/'>Проекты</Link>
                </li>
                <li className="menu_point">
                    <Link to='/notes/'>Заметки</Link>
                </li>
                <li className="menu_point">
                    <Link to='/login/'>Войти</Link>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
