import React from "react";
import GroupManage from "../pages/groupManage/GroupManage";
import UserManage from "../pages/userManage/UserManage";
import { Route, Routes } from "react-router-dom";
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import ReaderProfile from '../pages/readerProfile/readerProfile'
import BrowsingBooks from '../pages/BrowsingBooks/BrowsingBooks';
import BookManagement from '../pages/bookManagement/bookManagement';
import CategoryManagement from '../pages/categoryManagement/categoryManagement';
import BorrowerManage from '../pages/borrowerManage/BorrowerManage';
import ReaderCard from '../pages/readerCard/ReaderCard';

function AppRoutes(prop) {
    // Const
    const routeAndPermission = [
        {
            pers: [],
            route: (<Route key={1} path='/profile' element={<ReaderProfile />} />)
        },
        {
            pers: [1, 2, 3, 4],
            route: (<Route key={2} path='/groupmanage' element={<GroupManage />} />)
        },
        {
            pers: [1, 2, 3, 4],
            route: (<Route key={3} path='/usermanage' element={<UserManage />} />)
        },
        {
            pers: [],
            route: (<Route key={4} path='/books' element={<BrowsingBooks />} />)
        },
        {
            pers: [5, 6, 7, 8, 9, 10, 11],
            route: (<Route key={5} path='/booktitlemanage' element={<BookManagement />} />)
        },
        {
            pers: [5, 6, 7, 8, 9, 10, 11],
            route: (<Route key={6} path='/categorymanage' element={<CategoryManagement />} />)
        },
        {
            pers: [5, 6, 7, 8, 9, 10, 11],
            route: (<Route key={7} path='/borrowermanage' element={<BorrowerManage />} />)
        },
        {
            pers: [],
            route: (<Route key={8} path='/readercard' element={<ReaderCard />} />)
        },
    ]

  //Fuction
  function renderRestrictedRoutes() {
    if (!prop.permissions) {
      return <></>;
    }

    let allowedRoutes = [];
    routeAndPermission.forEach((r) => {
      if (r.pers.some((p) => prop.permissions.includes(p))) {
        allowedRoutes.push(r.route);
      } else if (r.pers.length == 0) {
        allowedRoutes.push(r.route);
      }
    });

    return <>{allowedRoutes}</>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {renderRestrictedRoutes()}
    </Routes>
  );
}

export default AppRoutes;
