import "./style.css"
import { useState } from 'react'

export default function GerenciadorDeTarefas() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Baixa',
    id: '',
    assignedTo: '',
    completed: false,
  })

  const addTask = () => {
    const newTasks = [...tasks]
    if (newTask.priority === 'Alta') {
      newTasks.unshift({ ...newTask, id: Date.now() })
    } else {
      newTasks.push({ ...newTask, id: Date.now() })
    }
    setTasks(newTasks)
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Baixa',
      assignedTo: '',
      completed: false,
    })
  }

  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value })
  }

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="gerenciador-de-tarefas">
      <header>
        <h1>Gerenciador de Tarefas</h1>
        <button onClick={addTask}>Adicionar Tarefa</button>
      </header>
      <form>
        <label>
          Titulo: <br />
          <input type="text" name="title" placeholder="Digite seu título aqui" value={newTask.title} onChange={handleChange} />
        </label>
        <label>
          Descrição: <br />
          <input type="text" name="description" placeholder="Digite sua descrição aqui" value={newTask.description} onChange={handleChange} />
        </label>
        <label>
          Data de Vencimento: <br />
          <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleChange} />
        </label>
        <label>
          Prioridade: <br />
          <select name="priority" value={newTask.priority} onChange={handleChange}>
            <option value="Baixa">Baixa</option>
            <option value="Alta">Alta</option>
          </select>
        </label>
        <label>
          Responsável: <br />
          <input type="text" name="assignedTo" value={newTask.assignedTo} placeholder="Informe o responsável" onChange={handleChange} />
        </label>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ opacity: task.completed ? 0.5 : 1 }}>
            <h2>{task.title === "" ? "Sem título" : task.title}</h2>
            <p>Descrição: {task.description === "" ? "Sem descrição" : task.description}</p>
            <p>Data de Vencimento: {new Date(task.dueDate).toLocaleDateString() === "Invalid Date" ? "Sem data de vencimento" : new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Prioridade: {task.priority}</p>
            <p>Responsável: {task.assignedTo === "Felipe" ? "Irresponsável" : task.assignedTo === "" ? "Sem responsável" : task.assignedTo}</p>
            <p>Status: {task.completed ? "Concluída" : "Pendente"}</p>
            <button onClick={() => toggleCompletion(task.id)}>{task.completed ? "Desmarcar" : "Concluir"}</button>
            <button onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
