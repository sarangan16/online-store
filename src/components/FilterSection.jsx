import React, { useEffect, useState } from "react";

const FilterSection = () => {
  const [product, setProduct] = useState([]);
  const [catergories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/catergories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        alert("failed to fetch data..");
      });
  }, [id]);

  return (
    <div>
      <div className="filter">
        <select></select>
      </div>
    </div>
  );
};

export default FilterSection;
