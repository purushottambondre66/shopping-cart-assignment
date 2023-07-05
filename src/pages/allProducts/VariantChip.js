import React from "react";
import useStyles from "./productStyles";

export const VariantChip = (props) => {
  const { classes } = useStyles();
  const { label, selected, onSelect, type } = props;
  return (
    <div
      className={classes.variantChip}
      onClick={() => onSelect(label, type)}
      style={
        selected
          ? { borderColor: "#f00", color: "#f00", backgroundColor: "#FAEBEC" }
          : {}
      }
    >
      {label}
    </div>
  );
};
