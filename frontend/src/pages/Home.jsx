import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to The Note Taking/Todo App</h1>
        <h1 className="bg-light">Start Taking Notes or Making Todos Now!</h1>

        <Link className="btn btn-info text-dark" to={"/todo"}>
          Click here
        </Link>
      </div>
    </div>
  );
}
