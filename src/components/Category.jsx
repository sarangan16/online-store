import React from "react";

const Category = () => {
  return (
    <div>
      <h2>Category</h2>
      <div>
        <label className="side-panel">
          <input type="radio" />
          <span className="checkmark">All</span>
        </label>
        <label className="side-panel">
          <input type="radio" />
          <span className="checkmark">Electronics</span>
        </label>
        <label className="side-panel">
          <input type="radio" />
          <span className="checkmark">Jewelery</span>
        </label>
        <label className="side-panel">
          <input type="radio" />
          <span className="checkmark">Men's clothing</span>
        </label>
        <label className="side-panel">
          <input type="radio" />
          <span className="checkmark">Women's clothing</span>
        </label>
      </div>
    </div>
  );
};

export default Category;
