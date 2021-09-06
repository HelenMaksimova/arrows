import React from 'react';
import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr className="us_tab_row">
            <td className="us_clm_1"><Link to={`/projects/${project.id}`} className="dark_link">{project.name}</Link></td>
            <td className="us_clm_2">{(project.repository === '') ? 'Ссылка не указана':
                    <a href={project.repository} className="dark_link" target="_blank">{project.repository}</a>}</td>
            <td className="us_clm_3">{project.users.map(user => user.firstName + ' ' + user.lastName).join(', ')}</td>
            <td className="us_clm_4">{project.notes.join(', ')}</td>
        </tr>
    );
}

const ProjectsList = ({projects}) => {
    return (
        <table className="us_tab">
            <thead>
                <tr className="us_tab_row_h">
                    <th className="us_tab_h">Название</th>
                    <th className="us_tab_h">Репозиторий</th>
                    <th className="us_tab_h">Участники</th>
                    <th className="us_tab_h">Заметки</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem key={project.id} project={project}/>)}
            </tbody>
        </table>
    );
}

export default ProjectsList;