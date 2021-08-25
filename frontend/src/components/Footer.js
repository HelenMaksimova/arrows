import React from 'react';

//Футер вряд ли будет меняться динамически, поэтому просто рендер.

const Footer = () => {
    return (
        <div className="footer">
            <ul className="menu_list">
                <li className="menu_point">Footer Point</li>
                <li className="menu_point">Footer Point</li>
                <li className="menu_point">Footer Point</li>
            </ul>
        </div>
    );
}

export default Footer;