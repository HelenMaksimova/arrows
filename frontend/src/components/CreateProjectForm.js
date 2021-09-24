import React, {useState} from 'react';
import classes from './CreateProjectForm.module.css'

const CreateProjectForm = ({createProject, users}) => {

    const [project, setProject] = useState({name: '', repository: '', users: [], notes: []});

    const addProject = (e) => {
        e.preventDefault();
        createProject(project);
    }

    const selectChange = (e) => {
        let selectedOptions = Array.from(e.target.selectedOptions);
        let selectedItems = selectedOptions.map(item => +item.value);
        setProject({...project, users: selectedItems});
    }

    return (
        <form className={classes.create_project_form}>
            <h1>Новый проект</h1>
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
                {users.map(user => <option value={user.id}>{`${user.firstName} ${user.lastName}`}</option>)}
            </select>
            <button onClick={addProject}>Создать</button>
        </form>
    );
};

export default CreateProjectForm;