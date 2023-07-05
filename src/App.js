import React from "react";
import { useState } from "react";
import AppContext from "./components/AppContext";
import { Application } from "./components/Application";
import Layout from "./components/Layout";

function App() {
  const [selectedComponent, setSelectedComponent] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCartClicked, setEditCartClicked] = useState(false);

  return (
    <AppContext.Provider
      value={{
        selectedComponent,
        setSelectedComponent,
        cartItems,
        setCartItems,
        drawerOpen,
        setDrawerOpen,
        editCartClicked,
        setEditCartClicked,
      }}
    >
      <Layout>
        <Application />
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
