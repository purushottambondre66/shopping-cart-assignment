import React from "react";
import useStyles from "./productStyles";
import defaultImage from "../../images/default-img.jpeg";

export const SubCategory = (props) => {
  const { subCategory, onSelect } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.subCategoryItem} onClick={onSelect}>
      <img
        src={subCategory.subCategoryImageURL || defaultImage}
        className={classes.subCategoryImage}
        alt="subCategory"
      />
      <div className={classes.subCategoryName}>
        {subCategory.subCategoryName}
      </div>
    </div>
  );
};
