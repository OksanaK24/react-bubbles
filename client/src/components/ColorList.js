import React, { useState } from "react";
import api from "../utils/api";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [addNewColor, setAddNewColor] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const OpenFormForNewColor = (color) => {
    setAddNewColor(true);
    setColorToAdd(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    api()
			.put(`/api/colors/${colorToEdit.id}`, colorToEdit)
			.then((result) => {
				updateColors([
          result.data,
          ...colors.filter(color => color.id !== result.data.id)
        ]);
        setEditing(false);
			})
			.catch((error) => {
				console.log(error)
      })
  };

  const saveNewColor = e => {
    e.preventDefault();
    api()
			.post("/api/colors", colorToAdd)
			.then((result) => {
        updateColors(result.data);
        // if (!window.confirm(`${colorToAdd}  color was added. Do you want to add one more color?`)) {
          setAddNewColor(false);
        // }else{
        //   setColorToAdd(initialColor);
        // }
			})
			.catch((error) => {
				console.log(error)
      })
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color

		if (window.confirm(`${color.color}  color will be deleted`)) {
			api()
				.delete(`/api/colors/${color.id}`)
				.then((result) => {
          console.log(`${color.color} color was deleted`)
          updateColors(colors.filter((color) => color.id !== result.data))
				})
				.catch((error) => {
					console.log(error)
				})
		}
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button onClick={(color) => OpenFormForNewColor(color)}>Add New Color</button>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}

      {addNewColor && (
        <form onSubmit={saveNewColor}>
          <legend>Add new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              // value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAddNewColor(false)}>cancel</button>
          </div>
        </form>
      )}

    </div>
  );
};

export default ColorList;
