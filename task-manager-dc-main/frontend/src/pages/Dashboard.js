import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // tasks ka state banaya
  const [taskName, setTaskName] = useState(""); // task ka naam input ke liye state
  const [taskDesc, setTaskDesc] = useState(""); // task ka description input ke liye state
  const [editingTaskId, setEditingTaskId] = useState(null); // kis task ko edit kar rahe hain, uska id
  const navigate = useNavigate(); // redirect ke liye useNavigate hook ka use kiya

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token"); // token ko localStorage se fetch kiya

      try {
        const response = await fetch("http://localhost:8080/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // token ko request headers me bheja
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data); // tasks ko state me set kiya
        } else {
          console.error(
            "Tasks fetch karne me samasya hui:",
            await response.text()
          );
        }
      } catch (err) {
        console.error("Tasks fetch karne me error aaya:", err);
      }
    };

    fetchTasks(); // component mount hone par tasks ko fetch kiya
  }, []);

  const handleAddTask = async () => {
    if (taskName && taskDesc) {
      const token = localStorage.getItem("token"); // token ko localStorage se nikala
      try {
        const response = await fetch("http://localhost:8080/api/tasks", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // token ko request headers me include kiya
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: taskName, // task ka naam
            description: taskDesc, // task ka description
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setTasks([...tasks, data]); // naye task ko list me add kiya
          setTaskName(""); // form ko clear kiya
          setTaskDesc("");
          alert("Task safalta se add kiya gaya!");
        } else {
          console.error(
            "Task add karne me samasya hui:",
            await response.text()
          );
        }
      } catch (err) {
        console.error("Task add karne me error aaya:", err);
      }
    } else {
      alert("Kripya task ka naam aur description bharen.");
    }
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token"); // token ko localStorage se fetch kiya

    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // request headers me token diya
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId)); // task ko list se hataya
      } else {
        console.error(
          "Task delete karne me samasya hui:",
          await response.text()
        );
      }
    } catch (err) {
      console.error("Task delete karne me error aaya:", err);
    }
  };

  const handleEdit = async () => {
    if (editingTaskId && taskName && taskDesc) {
      const token = localStorage.getItem("token"); // token ko localStorage se nikala

      try {
        const response = await fetch(
          `http://localhost:8080/api/tasks/${editingTaskId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`, // request me token include kiya
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: taskName, // naye task ka naam
              description: taskDesc, // naye task ka description
            }),
          }
        );

        if (response.ok) {
          const updatedTask = await response.json();
          setTasks(
            tasks.map((task) =>
              task._id === editingTaskId ? updatedTask : task
            )
          );
          setEditingTaskId(null); // edit mode se bahar nikle
          setTaskName(""); // form ko clear kiya
          setTaskDesc("");
          alert("Task safalta se update kiya gaya!");
        } else {
          console.error(
            "Task update karne me samasya hui:",
            await response.text()
          );
        }
      } catch (err) {
        console.error("Task update karne me error aaya:", err);
      }
    } else {
      alert("Kripya task ka naam aur description bharen.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // localStorage se token hataya
    navigate("/login"); // login page par redirect kiya
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      {/* Logout Button */}
      <div className="fixed top-6 right-6 z-20">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="heading text-4xl font-bold text-white mb-8 text-center">Task Manager</h1>

        {/* Add Task Form */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="text"
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task Description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
              onClick={editingTaskId ? handleEdit : handleAddTask}
            >
              {editingTaskId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-center">No tasks available. Add a task to get started!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{task.name}</h3>
                    <p className="text-gray-400">{task.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEditingTaskId(task._id);
                        setTaskName(task.name);
                        setTaskDesc(task.description);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
