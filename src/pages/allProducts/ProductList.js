import {
  Checkbox,
  Drawer,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "./Product";
import useStyles from "./productStyles";
import defaultImage from "../../images/default-img.jpeg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { VariantChip } from "./VariantChip";
import CloseIcon from "@mui/icons-material/Close";
import AppContext from "../../components/AppContext";
import { PageHeader } from "../../components/PageHeader";

export const ProductList = (props) => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const { classes } = useStyles();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [colorDescriptionArray, setColorDescriptionArray] = useState([]);
  const [packagingDescriptionArray, setPackagingDescriptionArray] = useState(
    []
  );
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const {
    cartItems,
    setCartItems,
    drawerOpen,
    setDrawerOpen,
    editCartClicked,
  } = useContext(AppContext);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${params.subCategoryId}.json`
      );
      if (
        response.data.success &&
        response.data.result &&
        response.data.result.length > 0
      ) {
        setProducts(response.data.result);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("productList error", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [params.subCategoryId]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    let colorDescriptionList = product.variants.filter(
      (item, index) =>
        product.variants?.findIndex(
          (v) => v.colorDescription === item.colorDescription
        ) === index
    );
    let packingDescriptionList = product.variants.filter(
      (item, index) =>
        product.variants?.findIndex(
          (v) => v.packingDescription === item.packingDescription
        ) === index
    );
    setColorDescriptionArray(colorDescriptionList);
    setPackagingDescriptionArray(packingDescriptionList);
    setSelectedVariant(product.variants[0]);
    setDrawerOpen(true);
  };

  useEffect(() => {
    if (drawerOpen && editCartClicked) {
      handleSelectProduct(products[0]);
      setOrderList([...cartItems]);
    }
    // eslint-disable-next-line
  }, [drawerOpen, editCartClicked]);

  const handleVariantSelect = (label, type) => {
    let colorLabel = "";
    let packagingLabel = "";
    if (type === "colorDescription") {
      colorLabel = label;
      packagingLabel = selectedVariant.packingDescription;
    } else {
      colorLabel = selectedVariant.colorDescription;
      packagingLabel = label;
    }
    let newVariant = selectedProduct.variants.find(
      (item) =>
        item.colorDescription === colorLabel &&
        item.packingDescription === packagingLabel
    );
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleAddVariant = () => {
    if (quantity >= 12 && quantity <= 100) {
      let newOrderList = [...orderList];
      //check if variant is already added in cart
      let foundElementIndex = newOrderList.findIndex(
        (item) => item._id === selectedVariant._id
      );
      if (foundElementIndex < 0) {
        newOrderList.push({
          ...selectedVariant,
          ...selectedProduct,
          quantity: Number(quantity),
          price: (selectedVariant.grossPrice || 1) * quantity,
        });
      } else {
        let foundElement = { ...newOrderList[foundElementIndex] };
        let totalQuantity = Number(foundElement.quantity) + Number(quantity);
        newOrderList[foundElementIndex] = {
          ...foundElement,
          quantity: totalQuantity,
          price: (selectedVariant.grossPrice || 1) * totalQuantity,
        };
      }
      setOrderList(newOrderList);
    }
  };

  const handleRemoveItem = (record) => {
    let newOrderList = [...orderList];
    newOrderList = newOrderList.filter((item) => item._id !== record._id);
    setOrderList(newOrderList);
  };

  const handleAddToCart = () => {
    let newCartItems = [...cartItems];
    orderList.forEach((order) => {
      //check if items is already in cart. if yes, increase the quantity, else add the item
      let itemIndexInCart = newCartItems.findIndex(
        (item) => item._id === order._id
      );
      if (itemIndexInCart < 0) {
        newCartItems.push({ ...order });
      } else {
        let foundElement = { ...newCartItems[itemIndexInCart] };
        let totalQuantity =
          Number(foundElement.quantity) + Number(order.quantity);
        newCartItems[itemIndexInCart] = {
          ...foundElement,
          quantity: totalQuantity,
          price: Number(order.grossPrice || 1) * totalQuantity,
        };
      }
    });
    setCartItems(newCartItems);
    setDrawerOpen(false);
  };

  return (
    <>
      <PageHeader title="All Products" showBack={true} />
      <Grid container spacing={3}>
        {products && products.length > 0 ? (
          products.map((item) => (
            <Grid key={item.productId} item xs={12} md={4}>
              <Product
                productData={item}
                onSelect={() => handleSelectProduct(item)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className={classes.noDataMessage}>
            No Products found for this subcategory
          </Grid>
        )}
      </Grid>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedProduct && selectedVariant && (
          <Grid container className={classes.productDrawer}>
            <Grid item p={2}>
              <div className={classes.productLabel}>
                {selectedProduct.itemDescription}
              </div>
              <div className={classes.productImageContainer}>
                <img
                  src={
                    selectedProduct.productImages &&
                    selectedProduct.productImages.length > 0
                      ? selectedProduct.productImages[0]
                      : defaultImage
                  }
                  alt="product"
                  className={classes.productImage}
                />
                <div className={classes.favoriteContainer}>
                  <FavoriteBorderIcon color="error" />
                </div>
                <div className={classes.thumbnailContainer}>
                  <div>
                    <img
                      src={
                        selectedProduct.productImages &&
                        selectedProduct.productImages.length > 0
                          ? selectedProduct.productImages[0]
                          : defaultImage
                      }
                      alt="product"
                      className={classes.productImagethumbnail}
                    />
                  </div>
                  <div>
                    <img
                      src={
                        selectedProduct.productImages &&
                        selectedProduct.productImages.length > 0
                          ? selectedProduct.productImages[0]
                          : defaultImage
                      }
                      alt="product"
                      className={classes.productImagethumbnail}
                    />
                  </div>
                  <div>
                    <img
                      src={
                        selectedProduct.productImages &&
                        selectedProduct.productImages.length > 0
                          ? selectedProduct.productImages[0]
                          : defaultImage
                      }
                      alt="product"
                      className={classes.productImagethumbnail}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.description}>
                #{selectedVariant?.bpCatalogNumber}
              </div>
              <div className={classes.itemDescription}>
                <div>{selectedProduct.itemDescription}</div>
                <div className={classes.priceContainer}>
                  {selectedProduct?.currency?.symbol}
                  {selectedVariant?.grossPrice}
                </div>
              </div>
              <div className={classes.description}>
                {selectedVariant.saleDescription}
              </div>
              <div className={classes.drawerFieldLabel}>
                Please Select Color Description
              </div>
              <Grid container className={classes.variantContainer}>
                {colorDescriptionArray.map((item) => (
                  <Grid key={item._id} item xs={6}>
                    <VariantChip
                      type="colorDescription"
                      label={item.colorDescription}
                      selected={
                        item.colorDescription ===
                        selectedVariant.colorDescription
                      }
                      onSelect={handleVariantSelect}
                    />
                  </Grid>
                ))}
              </Grid>
              <div className={classes.drawerFieldLabel}>
                Please Select Packaging Description
              </div>
              <Grid container className={classes.variantContainer}>
                {packagingDescriptionArray.map((item) => (
                  <Grid key={item._id} item xs={6}>
                    <VariantChip
                      type="packingDescription"
                      label={item.packingDescription}
                      selected={
                        item.packingDescription ===
                        selectedVariant.packingDescription
                      }
                      onSelect={handleVariantSelect}
                    />
                  </Grid>
                ))}
              </Grid>
              <div className={classes.drawerFieldLabel}>Enter Quantity</div>
              <TextField
                type="number"
                onChange={(event) => setQuantity(event.target.value)}
                value={quantity}
                error={quantity < 12 || quantity > 100}
                helperText={
                  quantity < 12
                    ? "Minimum Orders 12*"
                    : quantity > 100
                    ? "Maximum Orders 100*"
                    : ""
                }
              />
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Need Urgent Order"
                />
              </div>
              <div className={classes.buttonContainer}>
                <div
                  className={classes.outlinedButton}
                  onClick={handleAddVariant}
                >
                  Add
                </div>
              </div>
            </Grid>
            <Grid item className={classes.drawerCartItemsContainer} p={2}>
              <div className={classes.productLabel}>
                Order List
                <div className={classes.closeIconContainer}>
                  <CloseIcon
                    fontSize="small"
                    onClick={() => setDrawerOpen(false)}
                  />
                </div>
              </div>
              <Grid container className={classes.cartHeader}>
                <Grid item xs={5} className={classes.cartHeaderText}>
                  Products
                </Grid>
                <Grid item xs={3} className={classes.cartHeaderText}>
                  Quantity
                </Grid>
                <Grid
                  item
                  xs={4}
                  className={classes.cartHeaderText}
                  style={{ justifyContent: "flex-start", display: "flex" }}
                >
                  Price
                </Grid>
              </Grid>

              {orderList.length > 0 ? (
                orderList.map((item) => (
                  <Grid
                    key={item._id}
                    container
                    className={classes.cartItemRecord}
                    onClick={() => setSelectedVariant(item)}
                  >
                    <Grid
                      item
                      xs={5}
                      className={classes.productColumnContainer}
                    >
                      <div className={classes.cartProductImageContainer}>
                        <img
                          src={
                            item.productImages && item.productImages.length > 0
                              ? item.productImages[0]
                              : defaultImage
                          }
                          alt="product"
                          className={classes.cartpProductImage}
                        />
                      </div>
                      <div className={classes.productLabelsContainer}>
                        <div className={classes.productName}>
                          {item.itemDescription}
                        </div>
                        <div className={classes.saleDescription}>
                          {item.saleDescription}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={3} className={classes.quantity}>
                      {item.quantity}
                    </Grid>
                    <Grid item xs={4} className={classes.price}>
                      {item.currency.symbol}
                      {item.price}
                      <div className={classes.removeIconContainer}>
                        <CloseIcon
                          fontSize="small"
                          color="error"
                          onClick={() => handleRemoveItem(item)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <div className={classes.noDataMessage}>Nothing is selected</div>
              )}

              {orderList.length > 0 && (
                <div className={classes.buttonContainer}>
                  <div
                    className={classes.filledButton}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        )}
      </Drawer>
    </>
  );
};
