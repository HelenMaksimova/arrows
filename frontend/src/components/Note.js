import React from 'react';

const NoteItem = ({note}) => {
    return (
        <tr className="us_tab_row">
            <td className="us_clm_1">{note.id}</td>
            <td className="us_clm_2">{note.project.name}</td>
            <td className="us_clm_3">{note.text}</td>
            <td className="us_clm_4">{note.createdByUser.firstName + ' ' + note.createdByUser.lastName}</td>
            <td className="us_clm_5">{note.createdAt}</td>
            <td className="us_clm_6">{note.updatedAt}</td>
            <td className="us_clm_7">{note.isActive? 'Активна' : 'Закрыта' }</td>
        </tr>
    );
}

const NotesList = ({notes}) => {
    return (
        <table className="us_tab">
            <thead>
                <tr className="us_tab_row_h">
                    <th className="us_tab_h">ID</th>
                    <th className="us_tab_h">Проект</th>
                    <th className="us_tab_h">Текст</th>
                    <th className="us_tab_h">Кем создана</th>
                    <th className="us_tab_h">Дата создания</th>
                    <th className="us_tab_h">Дата изменения</th>
                    <th className="us_tab_h">Статус</th>
                </tr>
            </thead>
            <tbody>
                {notes.map((note) => <NoteItem key={note.id} note={note}/>)}
            </tbody>
        </table>
    );
}

export default NotesList;