"use client";
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function Dashboard() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editor, setEditor] = useState(false);
  const [editID, setEditID] = useState();

  useEffect(() => {
    getingItem();
  }, []);

  const getingItem = () => {
    try {
      fetch("http://localhost:3001/items")
        .then((res) => res.json())
        .then((res) => setList(res.items));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title.trim() === "" || description.trim() === "") {
        return alert("Please enter all required fields");
      }

      await fetch("http://localhost:3001/items/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));

      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };
  const editValue = (item) => {
    try {
      setEditor(true);
      const { title, description, _id } = item;
      setTitle(title);
      setDescription(description);
      // editIt(_id);
      setEditID(_id);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(editID, "editID OUT");
  const editIt = async () => {
    try {
      console.log(editID, "editID IN");

      await fetch(`http://localhost:3001/items/update/${editID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res.message));
      setEditor(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const remove = async (id) => {
    try {
      console.log(id, "id");
      await fetch(`http://localhost:3001/items/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => console.log(res.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <>
        <form className="flex flex-col gap-3">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
              margin: "2rem 0",
              padding: "1rem",
              borderBottom: "1px solid #000",
              borderTop: "1px solid #000",
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
            }}
          >
            Create Todo List
          </h2>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Topic Title"
          />

          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Topic Description"
          />

          {!editor ? (
            <button
              // type="submit"
              onClick={handleSubmit}
              className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
            >
              Add Topic
            </button>
          ) : (
            <button
              // type="submit"
              onClick={editIt}
              className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
            >
              Edit Topic
            </button>
          )}
        </form>

        {list.map((item) => (
          <div
            key={item._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{item.title}</h2>
              <div>{item.description}</div>
            </div>
            <div className="flex gap-2">
              <FaEdit
                style={{
                  color: "#750b12",
                  cursor: "pointer",
                  fontSize: "170%",
                  fontWeight: "bold",
                }}
                onClick={() => editValue(item)}
              />
              <MdDelete
                style={{
                  color: "#000",
                  cursor: "pointer",
                  fontSize: "170%",
                  fontWeight: "bold",
                }}
                onClick={() => remove(item._id)}
              />
            </div>
          </div>
        ))}
      </>
    </div>
  );
}

export default Dashboard;
