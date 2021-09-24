import React from 'react';
import {Link} from "react-router-dom";

const NoteItem = ({note, deleteNote}) => {
    return (
        <tr className="us_tab_row">
            <td className="us_clm_1">{note.id}</td>
            <td className="us_clm_2">{note.project.name}</td>
            <td className="us_clm_3">{note.text}</td>
            <td className="us_clm_4">{note.createdByUser.firstName + ' ' + note.createdByUser.lastName}</td>
            <td className="us_clm_5">{note.createdAt}</td>
            <td className="us_clm_6">{note.updatedAt}</td>
            <td className="us_clm_7">{note.isActive? 'Активна' : 'Закрыта' }</td>
            <td>
                <button onClick={() => deleteNote(note.id)} className="text_button_dark dark_link">Удалить
                </button>
            </td>
        </tr>
    );
}

const NotesList = ({notes, deleteNote}) => {
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
                    <th> </th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{textAlign: 'center'}}>
                    <div style={{margin: '10px 0', fontSize: '18px'}}>
                        <Link to='/notes/create/' className="dark_link">Создать заметку</Link>
                    </div>
                </td>
            </tr>
                {notes.map((note) => <NoteItem key={note.id} note={note} deleteNote={deleteNote}/>)}
            </tbody>
        </table>
    );
}

export default NotesList;
