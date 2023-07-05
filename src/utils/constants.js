import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalMallIcon from "@mui/icons-material/LocalMall";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    disabled: true,
  },
  {
    key: "allProducts",
    label: "All Products",
    icon: InventoryIcon,
    disabled: false,
    link: "/all-products",
  },
  {
    key: "orders",
    label: "Orders",
    icon: LocalMallIcon,
    disabled: true,
  },
  {
    key: "favorites",
    label: "Favorites",
    icon: FavoriteIcon,
    disabled: true,
  },
  {
    key: "newArrival",
    label: "New Arrival",
    icon: FiberManualRecordIcon,
    disabled: true,
  },
];
