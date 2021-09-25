import React, {useMemo, useState} from 'react';
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr className="us_tab_row">
            <td className="us_clm_1"><Link to={`/projects/${project.id}`} className="dark_link">{project.name}</Link>
            </td>
            <td className="us_clm_2">{(project.repository === '') ? 'Ссылка не указана' :
                <a href={project.repository} className="dark_link" target="_blank"
                   rel="noreferrer">{project.repository}</a>}</td>
            <td className="us_clm_3">{project.users.map(user => user.firstName + ' ' + user.lastName).join(', ')}</td>
            <td className="us_clm_4">{project.notes.join(', ')}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} className="text_button_dark dark_link">Удалить
                </button>
            </td>
        </tr>
    );
}

const ProjectsList = ({projects, deleteProject}) => {

    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = useMemo(
        () => {
            return projects.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
        },
        [searchQuery, projects]);

    return (
        <div>
            <input
                type="text"
                placeholder="...поиск"
                style={{margin: '15px 50px', fontSize: '16px', padding: '5px'}}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <table className="us_tab">
                <thead>
                <tr className="us_tab_row_h">
                    <th className="us_tab_h">Название</th>
                    <th className="us_tab_h">Репозиторий</th>
                    <th className="us_tab_h">Участники</th>
                    <th className="us_tab_h">Заметки</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{textAlign: 'center'}}>
                        <div style={{margin: '10px 0', fontSize: '18px'}}>
                            <Link style={{textDecoration: 'underline'}}
                                  to='/projects/create/' className="dark_link">Создать проект</Link>
                        </div>
                    </td>
                </tr>
                {(filteredProjects.length > 0) ?
                    filteredProjects.map((project) => <ProjectItem key={project.id} project={project}
                                                                   deleteProject={deleteProject}/>)
                    :
                    <tr>
                        <td><h2 style={{textAlign: 'center'}}>Проекты не найдены</h2></td>
                    </tr>}


                </tbody>
            </table>
        </div>
    );
}

export default ProjectsList;
