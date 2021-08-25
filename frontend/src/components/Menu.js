import React from 'react';

//Подумала, что меню может меняться в зависимости от статуса пользователя, например.
//Поэтому решила сделать отдельный компонент для пункта меню.
//Пункты вряд ли будут лежать на бэк-энде, но, наверное, удобно оперировать ими через состояние?
//Скорее всего, итоговая структура компонентов меню будет сложнее, но пока что так.

const MenuItem = ({menu_item}) => {
    return (
        <li className="menu_point">{menu_item.name}</li>
    );
}

const MenuList = ({menu_items}) => {
    return (
        <div className="menu">
            <ul className="menu_list">
                {menu_items.map((menu_item) => <MenuItem menu_item={menu_item}/>)}
            </ul>
        </div>
    );
}

export default MenuList;
