import React from "react";
import useStyles from "./layoutStyles";
import defaultImage from "../images/default-img.jpeg";

export const FooterComponent = (props) => {
  const { classes } = useStyles();
  const { label, imageURL, onSelect, itemId, isActive } = props;
  return (
    <div
      className={classes.footerItem}
      style={isActive ? { border: "2px solid #f00" } : {}}
      onClick={() => onSelect(itemId)}
    >
      <img
        src={imageURL || defaultImage}
        className={classes.footerItemImage}
        alt="subCategory"
      />
      <div className={classes.footerLabel}>{label}</div>
    </div>
  );
};
