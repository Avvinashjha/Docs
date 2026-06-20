import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { INITIAL_STATE, todoReducer } from "./todoReducer";
import type { Priority, SortOptions, Todo } from "./todo.types";

const TodoApp = () => {
    const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE);

    // Local UI State using useState
    const [inputText, setInputText] = useState('');
    const [priority, setPriority] = useState<Priority>('low');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOptions>('date-asc');

    // for controlling the edit form sub-states
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [editPriority, setEditPriority] = useState<Priority>('medium');

    // useRef to focus input on load/init
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        inputRef.current?.focus();
    }, []);

    // UseCallback: memoized handlers
    const handleAddTodo = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if(!inputText.trim()) return;

        dispatch({type: "ADD_TODO", payload: {text: inputText.trim(), priority}});
        setInputText('');
        setPriority('medium');
    }, [inputText, priority]);

    const handleToggleTodo = useCallback((id: string) => {
        dispatch({type: "TOGGLE_TODO", payload: id});
    }, []);

    const handleDeleteTodo = useCallback((id: string)=>{
        dispatch({type: "DELETE_TODO", payload: id});
    },[]);

    const handleStartEdit = useCallback((todo: Todo) => {
       setEditText(todo.text);
       setEditingId(todo.id);
       setEditPriority(todo.priority);
    },[]);

    const handleSaveEdit = (id: string) => {
        console.log("hi")
        if(!editText.trim()) return;
        dispatch({
            type: "EDIT_TODO",
            payload: {
                id,
                newText: editText.trim(),
                newPriority: editPriority,
            }
        })
        setEditingId(null);
    };

    console.log(handleSaveEdit.name);
    console.log("test", handleDeleteTodo.name);
    

    // Use Memo for sort and search
    // only re calculates filtered/sorted list when state,todos, searchQuery, or sortByChanges
    const processedTodos = useMemo(()=> {
        // 1. Filter by search Query
        const result = state.todos.filter((todo) => {
            return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // Priority weight dictionary for sorting
        const priorityWeight = {high: 3, medium: 2, low: 1};

        // 2. Sort results

        return result.sort((a, b) => {
            switch(sortBy){
                case 'date-desc':
                    return b.createdAt.getTime() - a.createdAt.getTime();
                case 'date-asc':
                    return a.createdAt.getTime() - b.createdAt.getTime();
                case 'priority-high':
                    return priorityWeight[b.priority] - priorityWeight[a.priority];
                case "priority-low":
                    return priorityWeight[a.priority] - priorityWeight[b.priority];
                case "alphabetical":
                    return a.text.localeCompare(b.text);
            }
        });
    }, [state.todos, searchQuery, sortBy]);

    // Quick stats derived via useMemo
    const stats = useMemo(() => {
        console.log("hello");
        
        const total = state.todos.length;
        const completed = state.todos.filter((todo)=> todo.isCompleted).length;
        return {total, completed, pending: total - completed};
    },[state.todos]);

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', fontFamily: 'sans-serif' }}>

      {/* Stats Counter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: '#555' }}>
        <span>Total: {stats.total}</span> | 
        <span>Completed: {stats.completed}</span> | 
        <span>Pending: {stats.pending}</span>
      </div>

      {/* Search and Filters */}
      <fieldset style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '8px' }}>
        <legend>Search & Filters</legend>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '6px' }}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOptions)} style={{ padding: '6px' }}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="priority-high">Priority: High to Low</option>
            <option value="priority-low">Priority: Low to High</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </fieldset>

      {/* Create Todo Form */}
      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} style={{ padding: '10px' }}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Add</button>
      </form>

      {/* Todo List Rendering */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {processedTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: '1px solid #eee',
              background: todo.isCompleted ? '#f9f9f9' : '#fff',
            }}
          >
            {editingId === todo.id ? (
              /* EDIT MODE UI */
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1, padding: '4px' }}
                />
                <select value={editPriority} onChange={(e) => setEditPriority(e.target.value as Priority)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              /* NORMAL VIEW MODE UI */
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                    {todo.text}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: todo.priority === 'high' ? '#ffcccc' : todo.priority === 'medium' ? '#fff3cd' : '#d1ecf1',
                    color: todo.priority === 'high' ? '#721c24' : todo.priority === 'medium' ? '#856404' : '#0c5460'
                  }}>
                    {todo.priority}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button onClick={() => handleStartEdit(todo)}>Edit</button>
                  <button onClick={() => handleDeleteTodo(todo.id)} style={{ color: 'red' }}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {processedTodos.length === 0 && <p style={{ color: '#888', textAlign: 'center' }}>No todos found.</p>}
    </div>
    )
}

export default TodoApp;