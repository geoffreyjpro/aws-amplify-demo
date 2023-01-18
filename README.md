## How to get here

1. npx create-react-app aws-amplify-demo

2. cd aws-amplify-demo

3. amplify init

4. yarn add aws-amplify @aws-amplify/ui-react

5. Add to index.js
   import {Amplify} from 'aws-amplify';
   import awsExports from "./aws-exports";
   Amplify.configure(awsExports);

6. amplify add api

7. amplify add auth

8. amplify push

9. change App.js to
```
import './App.css';
import {withAuthenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

function App({signOut, user}) {
return (
<div className="App">
<h1>Hello {user.attributes.email}</h1>
<button onClick={signOut}>Sign out</button>
</div>
);
}

export default withAuthenticator(App);
```
10. Add to App.js

```
    const [todos, setTodos] = useState([]);
    const [data, updateData] = useState(defaultForm);

    useEffect(() => {
    fetchAllToDos();
    }, [])

    const createToDo = async (todoDetails) => {
    const newTodo = await API.graphql({query: mutations.createTodo, variables: {input: todoDetails}});
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
```
11. amplify add hosting
12. amplify publish
