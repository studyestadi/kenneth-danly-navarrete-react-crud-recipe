import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMortarPestle,
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => setResult(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (uuid) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirm) {
      axios
        .delete("http://localhost:3001/recipes/" + uuid)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex p-5 flex-column justify-content-center align-items-center bg-light">
      <h1>Recipe Book</h1>
      <div className="w-100 py-4 d-flex justify-content-end">
        <div className="d-flex ">
          <Link to="/create" className="btn btn-success btn-md">
            <FontAwesomeIcon icon={faPlus} />
            <span className="mL1R">Add Recipe</span>
          </Link>
        </div>
      </div>
      <div className="rounded bg-white border shadow p-4 d-flex">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {result &&
            result.map((item, i) => (
              <div class="col d-flex justify-content-center" key={i}>
                <Link to={`/read/${item.uuid}`} className="tDN">
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      minHeight: "380px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={
                        item.images.small === ""
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVrnleKtShHAupeBTKLJO67aySrjAQn7zXQuaYEQfkPy-NesOb2AjffI_1N_u81mLvZs&usqp=CAU"
                          : `http://localhost:3001/${item.images.small}`
                      }
                      className="card-img-top"
                      style={{ minHeight: "215px" }}
                      alt="..."
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                      </div>
                      <div
                        className="btn-group-sm d-flex justify-content-around"
                        //   style={{
                        //     position: "absolute",
                        //     bottom: ".5rem",
                        //     width: "94%",
                        //   }}
                      >
                        <Link
                          to={`/read/${item.uuid}`}
                          className="btn btn-info"
                        >
                          <FontAwesomeIcon icon={faMortarPestle} />
                          <span className="mL1R">details</span>
                        </Link>
                        <Link
                          to={`/update/${item.uuid}`}
                          className="btn btn-primary"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                          <span className="mL1R">edit</span>
                        </Link>
                        <button
                          onClick={(e) => handleDelete(item.uuid)}
                          className="btn btn-danger"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          <span className="mL1R">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
