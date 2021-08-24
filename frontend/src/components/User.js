import React from 'react';

const UserItem = ({user}) => {
    return (
        <tr className="us_tab_row">
            <td className="us_clm_1">{user.username}</td>
            <td className="us_clm_2">{user.first_name}</td>
            <td className="us_clm_3">{user.last_name}</td>
            <td className="us_clm_4">{user.email}</td>
        </tr>
    );
}

const UsersList = ({users}) => {
    return (
        <table className="us_tab">
            <tr className="us_tab_row_h">
                <th className="us_tab_h">Username</th>
                <th className="us_tab_h">Имя</th>
                <th className="us_tab_h">Фамилия</th>
                <th className="us_tab_h">E-mail</th>
            </tr>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    );
}

export default UsersList;