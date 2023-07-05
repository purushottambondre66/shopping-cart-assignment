import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../images/atlnks-logo.png";
import logo2 from "../images/atlnks-logo-2.png";
import tomcruiseimg from "../images/tomcruise.jpeg";
import useStyles from "./layoutStyles";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AppContext from "./AppContext";
import { menuItems } from "../utils/constants";
import { FooterComponent } from "./FooterComponent";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import emptyCartImage from "../images/empty-cart.png";
import defaultImage from "../images/default-img.jpeg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import successImage from "../images/success-logo.png";
import EditIcon from "@mui/icons-material/Edit";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 100,
  width: "400px !important",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 100,
    width: "auto",
  },
  borderRadius: 5,
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    visibility: "hidden",
  },
}));

const GridItem = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  width: "100%",
  borderRadius: 10,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  width: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Layout({ children }) {
  const { classes } = useStyles();
  const {
    selectedComponent,
    setSelectedComponent,
    cartItems,
    setCartItems,
    setDrawerOpen,
    setEditCartClicked,
  } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [itemsTotal, setItemsTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [dialog, setDialog] = useState({ open: false });

  const UserComponent = (
    <div className={classes.userDetailsContainer}>
      <Avatar alt="user" src={tomcruiseimg} sx={{ width: 38, height: 38 }} />
      <div className={classes.userContainer}>
        <Typography className={classes.userName}>User Admin</Typography>
        <Typography className={classes.email}>useradmin@elred.com</Typography>
      </div>
      <div className={classes.downArrowContainer}>
        <KeyboardArrowDownIcon sx={{ color: "#DCDCDC" }} />
      </div>
    </div>
  );

  const handleFooterItemSelect = (itemId) => {
    console.log("itemId", itemId);
    let newSelectedComponent = { ...selectedComponent };
    let newComponent = newSelectedComponent.data.find(
      (item) => item.subCategoryId === itemId
    );

    setSelectedComponent({
      ...newSelectedComponent,
      activeId: newComponent.subCategoryId,
    });
    navigate(`/product-list/${newComponent.subCategoryId}`);
  };

  const handleHomeClick = () => {
    setSelectedComponent({});
    navigate("/");
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      let total = cartItems.reduce((acc, curr) => {
        return acc + Number(curr.price || 0);
      }, 0);
      setItemsTotal(total);
      setTax(0.09 * total);
    }
  }, [cartItems]);

  const handlePlaceOrder = () => {
    setDialog({ open: true, showActions: false, type: "orderPlaced" });
    setTimeout(() => {
      setDialog({ open: false });
      setCartItems([]);
    }, 1000);
  };

  const CartItem = (cartItemProps) => {
    const { item } = cartItemProps;
    return (
      <Grid key={item._id} container className={classes.cartItemRecord}>
        <Grid item xs={5} className={classes.productColumnContainer}>
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
            <div className={classes.productName}>{item.itemDescription}</div>
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
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar classes={{ root: classes.abRoot }}>
          <img src={logo} className={classes.logo} alt="logo" />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              className={classes.searchBox}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div className={classes.avatarContainer}>
              <Avatar alt="logo" src={logo2} sx={{ backgroundColor: "#fff" }} />
            </div>
            <div className={classes.downArrowContainer}>
              <KeyboardArrowDownIcon sx={{ color: "#DCDCDC" }} />
            </div>
            {UserComponent}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {UserComponent}
          </Box>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className={classes.layoutContainer}>
        <Grid item container spacing={2} xs={12} md={9}>
          <Grid
            item
            xs={12}
            md={3}
            className={selectedComponent.type ? classes.contentContainer : ""}
          >
            <GridItem>
              <div className={classes.menuLogoContainer}>
                <img src={logo} className={classes.logo} alt="logo" />
              </div>
              <MenuList>
                {menuItems.map(({ key, icon: Icon, label, disabled, link }) => (
                  <MenuItem
                    key={key}
                    className={classes.menuItem}
                    disabled={disabled}
                    onClick={() => {
                      setSelectedComponent({});
                      navigate(link);
                    }}
                  >
                    <ListItemIcon>
                      <Icon
                        fontSize="small"
                        color={disabled ? "default" : "error"}
                      />
                    </ListItemIcon>
                    <Typography
                      variant="inherit"
                      color={disabled ? "default" : "error"}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                ))}
              </MenuList>
            </GridItem>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            className={selectedComponent.type ? classes.contentContainer : ""}
          >
            <GridItem>{children}</GridItem>
          </Grid>
          {selectedComponent.type && (
            <Grid
              item
              xs={12}
              md={12}
              className={classes.selectedComponentContainer}
            >
              <GridItem>
                <div className={classes.footerItemsContainer}>
                  <div
                    className={classes.homeIconContainer}
                    onClick={handleHomeClick}
                  >
                    <HomeIcon />
                  </div>
                  {selectedComponent.data &&
                    selectedComponent.data.map((item) => (
                      <FooterComponent
                        isActive={
                          selectedComponent.activeId === item.subCategoryId
                        }
                        key={item.subCategoryId}
                        label={item.subCategoryName}
                        imageURL={item.subCategoryImageURL}
                        onSelect={handleFooterItemSelect}
                        itemId={item.subCategoryId}
                      />
                    ))}
                </div>
              </GridItem>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <GridItem>
            <div className={classes.cartHeader}>
              <Grid container>
                <Grid item xs={5} className={classes.cartHeaderText}>
                  Products
                </Grid>
                <Grid item xs={3} className={classes.cartHeaderText}>
                  Quantity
                </Grid>
                <Grid
                  item
                  xs={4}
                  className={`${classes.cartHeaderText} ${classes.priceContainer}`}
                >
                  Price
                  <div
                    className={classes.editIconContainer}
                    onClick={() => {
                      setEditCartClicked(true);
                      setDrawerOpen(true);
                    }}
                  >
                    <EditIcon color="error" fontSize="small" />
                    Edit
                  </div>
                </Grid>
              </Grid>
            </div>

            {cartItems.length > 0 ? (
              cartItems
                .slice(0, 4)
                .map((item) => <CartItem key={item._id} item={item} />)
            ) : (
              <img
                src={emptyCartImage}
                className={classes.emptyCartImage}
                alt="cart empty"
              />
            )}
            {cartItems.length > 0 && (
              <>
                <div
                  className={classes.seeAllContainter}
                  onClick={() =>
                    setDialog({
                      open: true,
                      showActions: true,
                      title: "Cart Items",
                      type: "cart",
                    })
                  }
                >
                  See all
                  <KeyboardArrowRightIcon fontSize="small" color="error" />
                </div>
                <div className={classes.otherInstructionContainer}>
                  Other Instructions
                  <div className={classes.rightAlighedArrowButton}>
                    Add
                    <KeyboardArrowRightIcon fontSize="small" color="error" />
                  </div>
                </div>
                <div className={classes.productLabel}>
                  Purchase Order Number:
                </div>
                <div className={classes.purchaseNumbnerContainer}>
                  1011564321
                </div>
                <div className={classes.addressLabelContainer}>
                  Address
                  <div className={classes.rightAlighedArrowButton}>
                    View
                    <KeyboardArrowRightIcon fontSize="small" color="error" />
                  </div>
                </div>
                <div className={classes.cartLabels}>
                  Office: 28 Rajasthani udyog nagar, G. T Karnal...
                </div>
                <div className={classes.cartCalculationContainer}>
                  <div
                    className={`${classes.calculationRow} ${classes.cartLabels}`}
                  >
                    Items Total
                    <div className={classes.cartLabelRight}>
                      {cartItems[0]?.currency?.symbol}
                      {itemsTotal}
                    </div>
                  </div>
                  <div
                    className={`${classes.calculationRow} ${classes.cartLabels}`}
                  >
                    SGST (9%)
                    <div className={classes.cartLabelRight}>
                      {cartItems[0]?.currency?.symbol}
                      {tax}
                    </div>
                  </div>
                  <div
                    className={`${classes.calculationRow} ${classes.cartLabels}`}
                  >
                    CGST (9%)
                    <div className={classes.cartLabelRight}>
                      {cartItems[0]?.currency?.symbol}
                      {tax}
                    </div>
                  </div>
                  <div
                    className={`${classes.calculationRow} ${classes.cartLabels}`}
                  >
                    IGST (9%)
                    <div className={classes.cartLabelRight}>
                      {cartItems[0]?.currency?.symbol}
                      {tax}
                    </div>
                  </div>
                  <div
                    className={`${classes.calculationRow} ${classes.cartLabels}`}
                  >
                    Taxable Amount
                    <div className={classes.cartLabelRight}>
                      {cartItems[0]?.currency?.symbol}
                      {tax * 3}
                    </div>
                  </div>
                </div>
                <div className={classes.orderTotalContainer}>
                  Order Total
                  <div className={classes.cartLabelRight}>
                    {cartItems[0]?.currency?.symbol}
                    {itemsTotal + tax * 3}
                  </div>
                </div>
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={6}>
                    <div
                      className={classes.clearCartButton}
                      onClick={() => setCartItems([])}
                    >
                      Clear Cart
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      className={classes.placeOrderButton}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
          </GridItem>
        </Grid>
      </Grid>
      {dialog.open && (
        <Dialog
          open={true}
          onClose={() => setDialog({ open: false })}
          fullWidth
        >
          {dialog.title && (
            <DialogTitle
              id="responsive-dialog-title"
              className={classes.dialogTitle}
              style={{ marginBottom: "15px" }}
            >
              {dialog.title}
            </DialogTitle>
          )}
          <DialogContent>
            {dialog.type === "cart" && (
              <div>
                <Grid container>
                  <Grid item xs={5} className={classes.cartHeaderText} pl={2}>
                    Products
                  </Grid>
                  <Grid item xs={3} className={classes.cartHeaderText} pl={2}>
                    Quantity
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    className={classes.cartHeaderText}
                    textAlign="end"
                  >
                    Price
                  </Grid>
                </Grid>
                {cartItems.length > 0 &&
                  cartItems.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
              </div>
            )}
            {dialog.type === "orderPlaced" && (
              <div className={classes.orderSuccessContainer}>
                <img
                  src={successImage}
                  alt="success"
                  className={classes.successImage}
                />
                <div className={classes.successMessage}>
                  Order Placed successfully!
                </div>
              </div>
            )}
          </DialogContent>
          {dialog.showActions && (
            <DialogActions>
              <Button
                onClick={() => setDialog({ open: false })}
                color="error"
                variant="contained"
                size="small"
                className={classes.button}
                startIcon={<ClearIcon />}
              >
                Close
              </Button>
            </DialogActions>
          )}
        </Dialog>
      )}
    </Box>
  );
}
