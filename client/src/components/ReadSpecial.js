import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ReadSpecial() {
  const [result, setResult] = useState([]);
  const { uuid } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3001/specials/")
      .then((res) => {
        setResult(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex vh-100 w-100 justify-content-center align-items-center bg-light">
      <div className="w-75 border bg-white shadow p-5 rounded">
        <h1 className="mb-3">{result.title}</h1>

        <div className="mb-3 d-flex justify-content-start flex-row mR1R">
          <div className="pL1R">
            <p>
              <strong>Description:</strong>
            </p>
            <p>{result.description}</p>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Servings</th>
                  <td>{result.servings}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">Preparaton Time</th>

                  <td>{result.prepTime}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th scope="col">Cooking Time</th>
                  <td>{result.cookTime}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div className="mb-2 f1">
            <p>
              <h3>Ingredients:</h3>
            </p>

            {result.ingredients &&
              result.ingredients?.map((item) => {
                return (
                  <div>
                    <p className="mYP3R">
                      <strong>Name:</strong> {item.name}
                    </p>
                    <ul>
                      {!item.amount ? (
                        ""
                      ) : (
                        <li>
                          <strong>Amount:</strong> {item.amount}
                        </li>
                      )}

                      {!item.measurement ? (
                        ""
                      ) : (
                        <li>
                          <strong>Measurement:</strong> {item.measurement}
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
          </div>
          <div className="mb-2 f2">
            <p>
              <h3>Directions in Cooking:</h3>
            </p>
            <ol>
              {result.directions &&
                result.directions?.map((x) => (
                  <li className="mY1R">{x.instructions}</li>
                ))}
            </ol>
          </div>
        </div>

        <div className="pt-3">
          <Link to="/" className="btn btn-secondary ">
            <FontAwesomeIcon icon={faXmark} />
            <span className="mL1R">Cancel</span>
          </Link>
          <Link to={`/update/${uuid}`} className="btn btn-primary ms-3 ">
            <FontAwesomeIcon icon={faPenToSquare} />
            <span className="mL1R">Edit</span>
          </Link>

          {/* <button className="btn btn-primary ms-3">
            <FontAwesomeIcon icon={faCheck} />
            <span className="mL1R">Confirm</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ReadSpecial;
