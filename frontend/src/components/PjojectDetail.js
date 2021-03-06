import React from "react";
import {useParams, Link} from 'react-router-dom'
import UsersList from "./User";
import NotesList from "./Note";

const ProjectDetailItem = ({projects, notes, deleteNote}) => {
    let {id} = useParams();
    if (projects.length !== 0) {
        let projectItem = projects.find(item => item.id === +id)
        let notesFiltered = notes.filter(item => item.project.id === +id)
        return (
            <div>
                <h1>{projectItem.name}</h1>
                <Link
                    style={{padding: '0 50px', fontSize: '18px', textDecoration: 'underline'}}
                    className="dark_link" to={`/projects/update/${id}`}>
                    Редактировать
                </Link>
                <h3>Репозиторий:</h3>
                <p>
                    {(projectItem.repository === '') ? 'Ссылка не указана' :
                        <a href={projectItem.repository} className="dark_link"
                           target="_blank" rel="noreferrer">{projectItem.repository}</a>}
                </p>
                <h3>Участники:</h3>
                <UsersList users={projectItem.users}/>
                <h3>Заметки:</h3>
                <NotesList notes={notesFiltered} deleteNote={deleteNote}/>
            </div>
        );
    }
    return null
}

export default ProjectDetailItem;
