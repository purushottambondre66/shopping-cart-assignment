import React from "react";
import useStyles from "./productStyles";
import defaultImage from "../../images/default-img.jpeg";

export const Category = (props) => {
  const { category, onSelect, selectedCategory } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.categoryItem} onClick={() => onSelect(category)}>
      <div
        className={classes.selectedCategory}
        style={{
          border:
            selectedCategory.categoryId === category.categoryId
              ? `2px solid #f00`
              : "none",
        }}
      >
        <img
          src={category.categoryImageURL || defaultImage}
          className={classes.categoryImage}
          alt="category"
        />
      </div>
      <div
        className={classes.categoryName}
        style={{ color: category.categoryImageURL ? "#fff" : "#000" }}
      >
        {category.categoryName}
      </div>
    </div>
  );
};
