import React from "react";
import useStyles from "./productStyles";
import defaultImage from "../../images/default-img.jpeg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const Product = (props) => {
  const { productData, onSelect } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.productCard} onClick={onSelect}>
      <img
        src={
          productData.productImages && productData.productImages.length > 0
            ? productData.productImages[0]
            : defaultImage
        }
        className={classes.productImage}
        alt="subCategory"
      />
      <div className={classes.productLabel}>{productData.itemDescription}</div>
      <div className={classes.productDescription}>
        Lorem ipsum dolor sit amet, consectetur adispicing...
      </div>
      <div className={classes.favoriteContainer}>
        <FavoriteBorderIcon color="error" />
      </div>
    </div>
  );
};
