import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../components/AppContext";
import { PageHeader } from "../../components/PageHeader";
import { Category } from "./Category";
import useStyles from "./productStyles";
import { SubCategory } from "./SubCategory";

export const AllProducts = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [subcategoryList, setSubcategoryList] = useState([]);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { setSelectedComponent } = React.useContext(AppContext);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
      );
      if (
        response.data.success &&
        response.data.result &&
        response.data.result.length > 0
      ) {
        setCategoryList(response.data.result);
      }
    } catch (error) {
      console.log("getCategory error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectCategory = async (category) => {
    try {
      setSelectedCategory(category);
      let response = await axios.get(
        `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${category.categoryId}.json`
      );
      if (
        response.data.success &&
        response.data.result &&
        response.data.result.length > 0
      ) {
        setSubcategoryList(response.data.result);
      } else {
        setSubcategoryList([]);
      }
    } catch (error) {
      console.log("getSubCategory error", error);
    }
  };

  const handleSelectSubcategory = (subCategory) => {
    setSelectedComponent({
      type: "subCategories",
      activeId: subCategory.subCategoryId,
      data: [...subcategoryList],
    });
    navigate(`/product-list/${subCategory.subCategoryId}`);
  };

  return (
    <>
      <PageHeader title="Print Heads" />
      <div className={classes.categoryListContainer}>
        {categoryList && categoryList.length > 0 ? (
          categoryList.map((item) => (
            <Category
              key={item.categoryId}
              category={item}
              selectedCategory={selectedCategory}
              onSelect={(category) => handleSelectCategory(category)}
            />
          ))
        ) : (
          <div className={classes.noDataMessage}>No Category Found</div>
        )}
      </div>
      <div className={classes.br}></div>
      <Grid container spacing={3}>
        {subcategoryList && subcategoryList.length > 0 ? (
          subcategoryList.map((item) => (
            <Grid item xs={12} md={4} key={item.subCategoryId}>
              <SubCategory
                subCategory={item}
                onSelect={() => handleSelectSubcategory(item)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className={classes.noDataMessage}>
            No Sub Category Found
          </Grid>
        )}
      </Grid>
    </>
  );
};
