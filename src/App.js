import './App.css';
import {Button, TextField, withAuthenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import {API} from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import {useEffect, useState} from "react";

const defaultForm = {
    name: "",
    description: ""
};

function App({signOut, user}) {
    const [todos, setTodos] = useState([]);
    const [data, updateData] = useState(defaultForm);

    useEffect(() => {
        fetchAllToDos();
    }, [])

    const createToDo = async (todoDetails) => {
        const newTodo = await API.graphql({query: mutations.createTodo, variables: {input: todoDetails}});
    }

    const updateToDo = async (todoDetails) => {
        // N.B. todoDetails must have an ID here!!!
        const newTodo = await API.graphql({query: mutations.updateTodo, variables: {input: todoDetails}});
    }

    const deleteToDo = async (todoDetails) => {
        // N.B. todoDetails must have an ID here!!! (only ID needed)
        const newTodo = await API.graphql({query: mutations.deleteTodo, variables: {input: todoDetails}});
    }

    const fetchAllToDos = async () => {
        const allTodos = await API.graphql({ query: queries.listTodos });
        setTodos(allTodos.data.listTodos.items)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createToDo(data).then(() => {
            updateData(defaultForm)
            fetchAllToDos()
        })
    }

    const handleChange = (e) => {
        return updateData(values => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="App">
            <h1>Hello {user.attributes.email}</h1>
            <button onClick={signOut}>Sign out</button>
            {todos.map((todo) => (
                <p key={todo.id}>{todo.name} : {todo.description}</p>
            ))}
            <form onSubmit={handleSubmit}>
                <TextField label={'Task name'} type={'text'} name={'name'} value={data.name} onChange={handleChange} />
                <TextField label={'Task description'} type={'text'} name={'description'} value={data.description} onChange={handleChange} />
                <Button type={'submit'} color={'primary'}>Create New Task</Button>
            </form>
        </div>
    );
}

export default withAuthenticator(App);
