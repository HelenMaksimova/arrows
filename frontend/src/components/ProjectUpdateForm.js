import React, {useState} from 'react';
import classes from "./CreateProjectForm.module.css";
import {useHistory, useParams} from "react-router-dom";

const ProjectUpdateForm = ({updateProject, projects, users}) => {
    const {id} = useParams()
    const history = useHistory()
    let instanceProject = projects.find(project => project.id === +id)
    if (instanceProject === undefined) {
        instanceProject = {id: id, users: []}
    }
    const [project, setProject] = useState({
        ...instanceProject,
        users: instanceProject.users.map(user => user.id)});
    console.log('project', project)

    const renewProject = (e) => {
        e.preventDefault();
        updateProject(project);
        history.push(`/projects/${id}`)
    }

    const selectChange = (e) => {
        let selectedOptions = Array.from(e.target.selectedOptions);
        let selectedItems = selectedOptions.map(item => +item.value);
        setProject({...project, users: selectedItems});
    }

        return (
            <form className={classes.create_project_form}>
                <h1>Редактировать проект</h1>
                <input
                    type="text"
                    value={project.name}
                    placeholder="название проекта"
                    onChange={(e) => setProject({...project, name: e.target.value})}
                />
                <input
                    type="text"
                    value={project.repository}
                    placeholder="репозиторий проекта"
                    onChange={(e) => setProject({...project, repository: e.target.value})}
                />
                <p>Выберите участников:</p>
                <select multiple="multiple" onChange={selectChange}>
                    {users.map(user =>
                        <option key={user.id} value={user.id}
                                selected={(project.users.includes(user.id)) ? "selected" : ""}>
                            {`${user.firstName} ${user.lastName}`}
                        </option>)}
                </select>
                <button onClick={renewProject}>Сохранить</button>
            </form>
        );
}

export default ProjectUpdateForm;