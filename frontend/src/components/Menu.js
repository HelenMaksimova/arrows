import React from 'react';

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