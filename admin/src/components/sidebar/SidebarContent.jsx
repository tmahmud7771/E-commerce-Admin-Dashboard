import React, { useContext, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";
import { motion } from "framer-motion";

//internal import
import sidebar from "@/routes/sidebar";
// import SidebarSubMenu from "SidebarSubMenu";
import logoDark from "@/assets/img/logo/logo-color.png";
import logoLight from "@/assets/img/logo/logo-dark.svg";
import { AdminContext } from "@/context/AdminContext";
import SidebarSubMenu from "@/components/sidebar/SidebarSubMenu";

const SidebarContent = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { dispatch } = useContext(AdminContext);

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("adminInfo");
  };

  return (
    <div className="py-4 text-gray-600 dark:text-white h-[950px] overflow-auto">
      <a className=" text-gray-900 dark:text-orange-200" href="/dashboard">
        {mode === "dark" ? (
          <img
            src="https://res.cloudinary.com/ddctd19xo/image/upload/v1704655990/unionit/UNION_nq6xrr.png"
            alt="unionit"
            width="135"
            className="pl-6"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/ddctd19xo/image/upload/v1704655990/unionit/UNION_nq6xrr.png"
            alt="unionit"
            width="135"
            className="pl-6"
          />
        )}
      </a>
      <ul className="mt-8 ">
        {sidebar.map((route) =>
          route.routes ? (
            <SidebarSubMenu route={route} key={route.name} />
          ) : (
            <li className="relative" key={route.name}>
              <NavLink
                exact
                to={route.path}
                target={`${route?.outside ? "_blank" : "_self"}`}
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-orange-400 dark:hover:text-gray-200"
                // activeClassName="text-['#FF914D'] dark:text-gray-100"
                activeStyle={{
                  color: "#FF914D",
                }}
                rel="noreferrer"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 hover:text-orange-400 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <route.icon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-4">{t(`${route.name}`)}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>

      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button
            onClick={handleLogOut}
            size="large"
            className=" flex w-[200px] bg-blue-800 py-3 rounded-md  justify-center shadow-md relative"
          >
            <span className="flex items-center">
              <IoLogOutOutline className="mr-3 text-lg text-white" />
              <span className="text-sm text-white">{t("LogOut")}</span>
            </span>
          </button>
        </motion.button>
      </span>
    </div>
  );
};

export default SidebarContent;
