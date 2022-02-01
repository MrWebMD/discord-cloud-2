import Layout from "./components/layout/Layout";
import Window from "./components/layout/window/Window";
import fetchGuilds from "./api/fetchGuilds";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import FileBrowserPage from "./pages/FileBrowserPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  const dispatch = useDispatch();

  const pages = useSelector(state => state.appSlice.pages);

  useEffect(() => {
    dispatch(fetchGuilds());
  }, [dispatch]);

  const redirectToHome = <Navigate to={pages.homePageURL}/>;
  /*
  Pass guild ids to the route parameters. Then the file browser page can accept it.
  */

  return (
    <Window>
      <Layout>
        <Routes>
          <Route path={pages.homePageURL} element={<HomePage/>} />
          <Route path={pages.settingsPageURL} element={<SettingsPage/>} />
          <Route path={pages.fileBrowserPageURL} element={<HomePage />} />
          <Route path={`${pages.fileBrowserPageURL}/:guildId`} element={<FileBrowserPage />} />
          <Route path={`${pages.fileBrowserPageURL}/:guildId/:channelId`} element={<FileBrowserPage />} />
          <Route path="*" element={redirectToHome} />
        </Routes>
      </Layout>
    </Window>
  );
};

export default App;
