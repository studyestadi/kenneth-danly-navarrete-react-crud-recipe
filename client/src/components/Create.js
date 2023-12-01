import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Create() {
  const [values, setValues] = useState({
    uuid: "",
    title: "",
    description: "",
    images: {
      full: "",
      medium: "",
      small: "",
    },
    servings: "",
    prepTime: "",
    cookTime: "",
    postDate: "",
    editDate: "",
    ingredients: [
      {
        uuid: "",
        amount: "",
        measurement: "",
        name: "",
      },
    ],
    directions: [
      {
        instructions: "",
      },
    ],
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/recipes", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteIng = (event, i) => {
    event.preventDefault();
    console.log(i);
    const datas = JSON.parse(JSON.stringify(values));
    const ingredients = datas.ingredients;

    // const index = ingredients.indexOf(i);
    if (i > -1) {
      ingredients.splice(i, 1);
    }

    datas.ingredients = ingredients;
    setValues(datas);
  };

  const handleAddIng = (event) => {
    event.preventDefault();
    const datas = JSON.parse(JSON.stringify(values));
    const ingredients = datas.ingredients;

    datas.ingredients = [
      ...ingredients,
      {
        uuid: "",
        amount: "",
        measurement: "",
        name: "",
      },
    ];

    setValues(datas);
  };

  const handleDeleteDir = (event, i) => {
    event.preventDefault();
    console.log(i);
    const datas = JSON.parse(JSON.stringify(values));
    const directions = datas.directions;

    // const index = directions.indexOf(i);
    if (i > -1) {
      directions.splice(i, 1);
    }

    datas.directions = directions;
    setValues(datas);
  };

  const handleAddDir = (event) => {
    event.preventDefault();
    const datas = JSON.parse(JSON.stringify(values));
    const directions = datas.directions;

    datas.directions = [
      ...directions,
      {
        instructions: "",
      },
    ];

    setValues(datas);
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-75 border bg-white shadow p-5 rounded">
        <h1>Add Recipe</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="title">Recipe Name:</label>
            <input
              type="text"
              required
              name="title"
              className="form-control"
              placeholder="Enter recipe name (required)"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Enter the recipe description (optional)"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-start mb-2">
            <div className="mb-2 mR1R">
              <label htmlFor="servings">Servings:</label>
              <input
                type="number"
                required
                name="servings"
                className="form-control"
                placeholder="Enter the recipe servings (required)"
                onChange={(e) =>
                  setValues({ ...values, servings: e.target.value })
                }
              />
            </div>
            <div className="mb-2 mR1R">
              <label htmlFor="preptime">Preparation time in mins:</label>
              <input
                type="number"
                required
                name="preptime"
                className="form-control"
                placeholder="Enter the recipe preparation time (required)"
                onChange={(e) =>
                  setValues({ ...values, prepTime: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="cooktime">Cooking time in mins:</label>
              <input
                type="number"
                required
                name="cooktime"
                className="form-control"
                placeholder="Enter the recipe cooking time (required)"
                onChange={(e) =>
                  setValues({ ...values, cookTime: e.target.value })
                }
              />
            </div>
          </div>
          {/* ingredients section */}
          <div className="mb-3">
            <label htmlFor="ingredients">
              <h2>Ingredients:</h2>
            </label>
            {values.ingredients?.map((list, index) => (
              <div className="d-flex mb-2">
                <div className="mR1R">
                  <label htmlFor="ingredient name">Ingredients name:</label>
                  <input
                    type="text"
                    required
                    name="name"
                    className="form-control"
                    placeholder="Ingredients name (reqired)"
                    value={values.ingredients[index].name}
                    onChange={(e) => {
                      const datas = JSON.parse(JSON.stringify(values));
                      const ingredients = datas.ingredients;
                      ingredients[index].name = e.target.value;
                      setValues(datas);
                    }}
                  />
                </div>
                <div className="mR1R">
                  <label htmlFor="Amount">Amount:</label>
                  <input
                    type="text"
                    required
                    name="amount"
                    className="form-control"
                    placeholder="Amount (required)"
                    value={values.ingredients[index].amount}
                    onChange={(e) => {
                      const datas = JSON.parse(JSON.stringify(values));
                      const ingredients = datas.ingredients;
                      ingredients[index].amount = e.target.value;
                      setValues(datas);
                    }}
                  />
                </div>
                <div className="mR1R">
                  <label htmlFor="ingredient measurement">Measurement:</label>
                  <input
                    type="text"
                    name="measurement"
                    className="form-control"
                    placeholder="Measurement (optional)"
                    value={values.ingredients[index].measurement}
                    onChange={(e) => {
                      const datas = JSON.parse(JSON.stringify(values));
                      const ingredients = datas.ingredients;
                      ingredients[index].measurement = e.target.value;
                      setValues(datas);
                    }}
                  />
                </div>
                <button
                  onClick={(event) => handleDeleteIng(event, index)}
                  className="btn btn-danger align-self-end"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span className="mL1R">Delete</span>
                </button>
              </div>
            ))}
            <div className="pt-3">
              <button onClick={handleAddIng} className="btn btn-success">
                <FontAwesomeIcon icon={faPlus} />
                <span className="mL1R">Add</span>
              </button>
            </div>
          </div>

          <div className="mb-3 f1">
            <h2>Directions:</h2>
            {values.directions?.map((list, index) => (
              <div className="d-flex mb-2">
                <div className="flex-grow-1">
                  <input
                    type="text"
                    required
                    name="cooktime"
                    className="form-control"
                    placeholder="Add directions (required)"
                    value={values.directions[index].instructions}
                    onChange={(e) => {
                      const datas = JSON.parse(JSON.stringify(values));
                      const directions = datas.directions;
                      directions[index].instructions = e.target.value;
                      setValues(datas);
                    }}
                  />
                </div>

                <button
                  onClick={(event) => handleDeleteDir(event, index)}
                  className="btn btn-danger ms-3"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span className="mL1R">Delete</span>
                </button>
              </div>
            ))}
            <div className="pt-3">
              <button onClick={handleAddDir} className="btn btn-success">
                <FontAwesomeIcon icon={faPlus} />
                <span className="mL1R">Add</span>
              </button>
            </div>
          </div>
          <div className="pt-3">
            <Link to="/" className="btn btn-secondary ">
              <FontAwesomeIcon icon={faXmark} />
              <span className="mL1R">Cancel</span>
            </Link>
            <button className="btn btn-primary ms-3">
              <FontAwesomeIcon icon={faCheck} />
              <span className="mL1R">Confirm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
