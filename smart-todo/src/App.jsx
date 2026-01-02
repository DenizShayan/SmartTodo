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
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-center">
          Smart Todo
        </h1>
        <p className="mt-2 text-center text-sm text-slate-300">
          Tiny, clean, and actually usable 😄
        </p>

        <div className="mt-6 grid gap-3">
          <label className="text-sm font-semibold text-slate-200">
            Task Name
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="e.g. water plants"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
          />

          <label className="text-sm font-semibold text-slate-200">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-100 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
          />

          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add Task
          </button>
        </div>

        <div className="mt-6">
          {tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4 text-center text-sm text-slate-300">
              No tasks yet. Add your first one 👆
            </div>
          ) : (
            <ul className="grid gap-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className={
                          "text-base font-semibold break-words " +
                          (t.done ? "line-through opacity-60" : "")
                        }
                      >
                        {t.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">{t.time}</p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => toggleDone(t.id)}
                        className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
                      >
                        {t.done ? "Undo" : "Done"}
                      </button>
                      <button
                        onClick={() => removeTask(t.id)}
                        className="rounded-lg border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-200 transition hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          {tasks.length} task(s)
        </div>
      </div>
    </div>
  );
}

export default App;
