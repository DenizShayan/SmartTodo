import { useMemo, useState } from "react";

function App() {
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);

  const canAdd = useMemo(() => {
    return taskName.trim().length > 0 && time.trim().length > 0;
  }, [taskName, time]);

  function handleAdd() {
    if (!canAdd) return;

    const newTask = {
      id: crypto.randomUUID(),
      name: taskName.trim(),
      time: time.trim(),
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskName("");
    setTime("");
  }

  function toggleDone(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="p-4 max-w-md mx-auto grid gap-3">
      <h1 className="text-2xl font-bold text-center mb-2">Smart Todo</h1>

      <label className="font-semibold">Task Name:</label>
      <input
        type="text"
        className="border rounded px-3 py-2"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="e.g. water plants"
      />

      <label className="font-semibold">Time:</label>
      <input
        type="time"
        className="border rounded px-3 py-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button
        className="bg-black text-white rounded px-3 py-2 disabled:opacity-40"
        onClick={handleAdd}
        disabled={!canAdd}
      >
        Add Task
      </button>

      <div className="mt-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-600 text-center">No tasks yet.</p>
        ) : (
          <ul className="grid gap-2">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="border rounded p-3 flex items-center justify-between"
              >
                <div>
                  <div className={t.done ? "line-through opacity-60" : ""}>
                    {t.name}
                  </div>
                  <div className="text-sm text-gray-600">{t.time}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="border rounded px-2 py-1"
                    onClick={() => toggleDone(t.id)}
                  >
                    {t.done ? "Undo" : "Done"}
                  </button>
                  <button
                    className="border rounded px-2 py-1"
                    onClick={() => removeTask(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
