import React, {useState} from 'react';
import classes from './CreateNoteForm.module.css'

const CreateNoteForm = ({createNote, users, projects}) => {

    const [note, setNote] = useState({project: projects[0].id, text: '', createdByUser: users[0].id});

    const addNote = (e) => {
        e.preventDefault();
        createNote(note);
    }

    const selectChange = (e) => {
        setNote({...note, [e.target.name]: +e.target.value})
    }

    return (
        <form className={classes.create_note_form}>
            <h1>Новая заметка</h1>
            <input
                type="text"
                value={note.text}
                placeholder="текст заметки"
                onChange={(e) => setNote({...note, text: e.target.value})}
            />
            <select name="createdByUser" onChange={selectChange}>
                {users.map(user => <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>)}
            </select>
            <select name="project" onChange={selectChange}>
                {projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
            </select>
            <button onClick={addNote}>Создать</button>
        </form>
    );
};

export default CreateNoteForm;