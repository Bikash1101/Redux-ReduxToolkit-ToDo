import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

function Todos() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const handleUpdate = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const handleSave = (id) => {
    if (editText.trim() !== "") {
      dispatch(updateTodo({ id, text: editText }))
    }
    setEditId(null)
    setEditText("")
  }


  return (
    <>
      <div className='text-white text-3xl mt-7'>Todo List</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            
            {editId === todo.id ? (
              // ✏️ Edit Mode
              <div className="flex w-full justify-between items-center gap-3">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 rounded bg-zinc-700 text-white focus:outline-none"
                />
                <button
                  onClick={() => handleSave(todo.id)}
                  className="text-white bg-green-500 p-2 rounded hover:bg-green-600"
                >
                  ✅
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="text-white bg-gray-500 p-2 rounded hover:bg-gray-600"
                >
                  ❌
                </button>
              </div>
            ) : (
              // 👀 Normal Mode
              <>
                <div className="text-white">{todo.text}</div>
                <div className="flex gap-2">
                  {/* ✏️ Edit Button */}
                  <button
                    onClick={() => handleUpdate(todo.id, todo.text)}
                    className="text-white bg-blue-500 p-2 rounded hover:bg-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 
                        112.652 2.652l-1.688 1.687m-2.651-2.651L6.478 
                        15.862a4.5 4.5 0 00-1.12 1.873l-.637 
                        2.547a.75.75 0 00.91.91l2.548-.637a4.5 
                        4.5 0 001.872-1.12l10.384-10.384m-2.651-2.651
                        l2.651 2.651"
                      />
                    </svg>
                  </button>

                  {/* 🗑️ Delete Button */}
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-white bg-red-500 p-2 rounded hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 
                        0L9.26 9m9.968-3.21c.342.052.682.107 
                        1.022.166m-1.022-.165L18.16 19.673a2.25 
                        2.25 0 01-2.244 2.077H8.084a2.25 2.25 
                        0 01-2.244-2.077L4.772 
                        5.79m14.456 0a48.108 48.108 
                        0 00-3.478-.397m-12 
                        .562c.34-.059.68-.114 
                        1.022-.165m0 0a48.11 48.11 
                        0 013.478-.397m7.5 
                        0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 
                        51.964 0 00-3.32 0c-1.18.037-2.09 
                        1.022-2.09 2.201v.916m7.5 0a48.667 
                        48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos