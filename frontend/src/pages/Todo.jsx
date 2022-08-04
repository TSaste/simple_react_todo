import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";

export default function Todo() {
  const [todos, settodos] = useState([]);
  const [rid, setrid] = useState();
  const [uid, setuid] = useState();
  const [mtask, setmtask] = useState();
  const [mdesc, setmdesc] = useState();
  const [mpriority, setmpriority] = useState();
  const formik = useFormik({
    initialValues: {
      task: "",
      desc: "",
      priority: "",
    },
    validationSchema: yup.object({
      task: yup.string().required("please enter task name"),
      desc: yup.string().required("please enter description for your task"),
      priority: yup.string().required("please enter the priority"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await axios.post("http://localhost:5000/todo", values);
      handleGet();
    },
  });

  const handleGet = async () => {
    const { data } = await axios.get("http://localhost:5000/todo");
    settodos(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todo/${id}`);
    handleGet();
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/todo/${id}`, {
      task: mtask,
      desc: mdesc,
      priority: mpriority,
    });
    handleGet();
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header">Note / Todo</div>
              <form onSubmit={formik.handleSubmit}>
                <div className="card-body">
                  <div>
                    <label htmlFor="task" className="form-label">
                      First task
                    </label>
                    <input
                      type="text"
                      name="task"
                      value={formik.values.task}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={`form-control 
                      ${
                        formik.touched.task &&
                        formik.errors.task &&
                        "is-invalid"
                      }
                        ${
                          formik.touched.task &&
                          !formik.errors.task &&
                          "is-valid"
                        }
                      `}
                      id="task"
                      placeholder="Enter Your task"
                    />
                    <div className="invalid-feedback">Please add task.</div>
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="desc" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      name="desc"
                      value={formik.values.desc}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.desc &&
                        formik.errors.desc &&
                        "is-invalid"
                      }
                        ${
                          formik.touched.desc &&
                          !formik.errors.desc &&
                          "is-valid"
                        }
                      `}
                      id="desc"
                      placeholder="Enter task description"
                    />
                    <div className="invalid-feedback">
                      Please add description
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="mt-2">
                    <label htmlFor="priority"> Priority</label>
                    <select
                      name="priority"
                      value={formik.values.priority}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={`form-control
                       ${
                         formik.touched.priority &&
                         formik.errors.priority &&
                         "is-invalid"
                       }
                        ${
                          formik.touched.priority &&
                          !formik.errors.priority &&
                          "is-valid"
                        }
                      `}
                      id="priority"
                    >
                      <option selected>Select Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <div className="invalid-feedback">Please add priority</div>
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Add Todo
                  </button>
                </div>
              </form>
            </div>

            {todos.map((item) => (
              <div>
                <div className="card mt-4">
                  <div
                    className={`
                    card-header d-flex justify-content-between ${
                      item.priority === "high" && "bg-info"
                    }
                      ${item.priority === "medium" && "bg-primary text-light"} 
                    `}
                  >
                    {item.task}
                    <div>
                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        data-bs-target="#editModal"
                        data-bs-toggle="modal"
                        onClick={(e) => {
                          setuid(item.id);
                          setmtask(item.task);
                          setmdesc(item.desc);
                          setmpriority(item.priority);
                        }}
                      >
                        edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        data-bs-target="#deleteModal"
                        data-bs-toggle="modal"
                        onClick={(e) => setrid(item.id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  <div className="" id="task1">
                    <div className="card-body">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal fade" id="editModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModal">
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="mtask" className="form-label">
                  First task
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mtask"
                  value={mtask}
                  onChange={(e) => setmtask(e.target.value)}
                  placeholder="Enter Your task"
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please add task.</div>
              </div>
              <div className="mt-2">
                <label htmlFor="mdesc" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mdesc"
                  value={mdesc}
                  onChange={(e) => setmdesc(e.target.value)}
                  placeholder="Enter task description"
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please add description</div>
              </div>
              <div className="mt-2">
                <label htmlFor="mpriority"> Priority</label>
                <select
                  className="form-select"
                  id="mpriority"
                  value={mpriority}
                  onChange={(e) => setmpriority(e.target.value)}
                >
                  <option disabled>Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                data-bs-dismiss="modal"
                onClick={(e) => handleUpdate(uid)}
              >
                Update Todo
              </button>
              <button
                type="button"
                className="btn mt-2 w-100 btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">
                Are you sure you want delete this todo ?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-danger">
              <p className="text-center text-muted mb-5">
                You can delete this todo at any time. If you change your mind,
                you might not be able to recover it
              </p>
              <div className="btn-group w-100">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={(e) => handleDelete(rid)}
                  data-bs-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
