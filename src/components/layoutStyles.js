import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  logo: {
    height: 20,
  },
  abRoot: {
    backgroundColor: "#fff",
    color: "#525252",
  },
  searchBox: {
    backgroundColor: "#EEF1F7",
    width: "100%",
  },
  searchIcon: {
    color: "#f00",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#dcdcdc",
  },
  downArrowContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: 20,
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  userDetailsContainer: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 14,
  },
  email: {
    fontSize: 10,
  },
  layoutContainer: {
    backgroundColor: "#EEF1F7",
    height: "calc(100vh - 50px)",
    overflow: "scroll",
    padding: 20,
  },
  selectedComponentContainer: {
    height: 112,
  },
  contentContainer: {
    height: "calc(100% - 112px)",
  },
  menuLogoContainer: {
    display: "flex",
    padding: 18,
  },
  menuItem: {
    padding: 14,
    fontSize: 12,
    fontWeight: "bold",
  },
  pageHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pageHeader: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
    margin: 20,
  },
  footerItem: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: 5,
    borderRadius: 5,
  },
  footerItemImage: {
    height: 70,
    width: 100,
  },
  footerItemsContainer: {
    display: "-webkit-box",
    overflow: "scroll",
  },
  footerLabel: {
    position: "absolute",
    fontWeight: "bold",
    bottom: 5,
    fontSize: 10,
  },
  homeIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    border: "1px solid #dcdcdc",
    borderRadius: 5,
    margin: 5,
  },
  cartHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F0F3F8",
    margin: "-8px -8px 0 -8px",
    height: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cartHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  emptyCartImage: {
    width: 200,
    marginTop: 100,
  },
  saleDescription: {
    fontSize: 10,
  },
  productName: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
    justifyContent: "flex-end",
  },
  productColumnContainer: {
    display: "flex",
    flexDirection: "row",
  },
  productLabelsContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "initial",
  },
  cartpProductImage: {
    height: 20,
  },
  cartProductImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  cartItemRecord: {
    marginTop: 10,
  },
  seeAllContainter: {
    marginTop: 10,
    borderTop: "1px dashed #DCDCDC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    color: "#f00",
    padding: 10,
    cursor: "pointer",
  },
  otherInstructionContainer: {
    display: "flex",
    fontWeight: "bold",
    color: "#000",
    fontSize: 12,
    backgroundColor: "#EEF1F7",
    marginLeft: -8,
    marginRight: -8,
    padding: 10,
  },
  rightAlighedArrowButton: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    color: "#f00",
    fontSize: 10,
  },
  productLabel: {
    marginTop: 10,
    display: "flex",
    textAlign: "left",
    width: "100%",
    fontWeight: "bold",
    color: "#000",
    fontSize: 12,
  },
  purchaseNumbnerContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#EEF1F7",
    fontSize: 12,
  },
  addressLabelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  cartLabels: {
    display: "flex",
    textAlign: "start",
    fontSize: 12,
  },
  cartLabelRight: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cartCalculationContainer: {
    borderTop: "1px dashed #dcdcdc",
    marginTop: 10,
  },
  calculationRow: {
    margin: "5px 0",
  },
  orderTotalContainer: {
    marginTop: 10,
    borderTop: "1px solid #dcdcdc",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "5px 0",
  },
  clearCartButton: {
    display: "flex",
    border: "1px solid #000",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: "5px 0",
    fontSize: 12,
    fontWeight: "bold",
    cursor: "pointer",
  },
  placeOrderButton: {
    display: "flex",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: "5px 0",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#f00",
    cursor: "pointer",
  },
  orderSuccessContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  successImage: {
    width: 100,
  },
  successMessage: {
    marginTop: 20,
  },
  editIconContainer: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    fontSize: 12,
    color: "#f00",
    cursor: "pointer",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid #dcdcdc",
    borderRadius: 5,
    padding: 3,
  },
}));