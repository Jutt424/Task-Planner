import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 my-5 p-5 rounded-xl min-h-[80vh] ">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className=' bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 mx-6 font-bold rounded-md text-white text-sm'>Save</button>
        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex w-1/2 justify-between my-3">
                <div className='flex gap-5'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons">
                  <button onClick={(e) => handleEdit(e, item.id)} className=' bg-violet-800 hover:bg-violet-950 p-2 py-1 mx-1 font-bold rounded-md text-white text-sm'>Edit</button>
                  <button onClick={(e) => handleDelete(e, item.id)} className=' bg-violet-800 hover:bg-violet-950 p-2 py-1 mx-1 font-bold rounded-md text-white text-sm'>Delete</button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;