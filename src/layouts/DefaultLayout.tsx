import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

import logo from "assets/svg/logo.svg";

const DefaultLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1025);
  const [isDesktop, setIsDektop] = useState(window.innerWidth > 767);

  useEffect(() => {
    if (window.innerWidth < 1025 && !isCollapsed) {
      setTimeout(() => {
        setIsCollapsed(true);
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    function handleResize() {
      if (window.innerWidth < 1025 && !isCollapsed) {
        setIsCollapsed(true);
      }
      setIsDektop(window.innerWidth > 767);
    }
    window.addEventListener("resize", handleResize, true);

    return () => window.removeEventListener("resize", handleResize, true);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1025 && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [location]);

  return (
    <div id="defaultLayout">
      <main>
        <div className="leading-10" />
        <Header isCollapsed={isCollapsed} isDesktop={isDesktop} />
        <div
          className={classNames(
            "flex items-center justify-between text-gray-800 hover:text-gray-500 h-20 fixed top-0 left-0 px-5 font-bold transition-all duration-300 ease-in-out z-10",
            {
              "w-52": !isCollapsed && isDesktop,
              "w-20": isCollapsed,
              "bg-blue-100": isDesktop,
              "bg-blue-50": !isDesktop,
            }
          )}
        >
          <div>
            <a href="/" className="flex items-center">
              <img className="w-10" src={logo} alt="" />
              <div
                id={"name-application"}
                className={classNames(
                  "transition-all duration-300 ease-in-out absolute left-16 w-48 overflow-ellipsis overflow-hidden ml-2",
                  {
                    "opacity-100 text-lg": !isCollapsed && !!isDesktop,
                    "opacity-0 text-[0px] invisible": !!isCollapsed || !isDesktop,
                  }
                )}
              >
                Admin
              </div>
            </a>
          </div>

          <div
            className={classNames("hamburger", {
              "is-active": (isCollapsed && isDesktop) || (!isCollapsed && !isDesktop),
            })}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </div>
        <div
          onMouseEnter={() => {
            const offsetWidth = document.body.offsetWidth;
            document.body.style.overflowY = "hidden";
            document.body.style.paddingRight = document.body.offsetWidth - offsetWidth + "px";
          }}
          onMouseLeave={() => {
            document.body.style.overflowY = "auto";
            document.body.style.paddingRight = "";
          }}
          className={classNames(
            "fixed z-20 top-20 left-0 h-screen bg-blue-100 transition-all duration-300 ease-in-out",
            {
              "w-52": !isCollapsed,
              "w-20": isCollapsed,
              "-left-20": isCollapsed && !isDesktop,
            }
          )}
        >
          <Menu isCollapsed={isCollapsed} />
        </div>
        {!isCollapsed && !isDesktop && (
          <div
            className={"w-full h-full fixed bg-black opacity-50 z-[1]"}
            onClick={() => setIsCollapsed(true)}
          />
        )}
        <section
          id="main"
          className={classNames(
            "flex flex-col px-5 transition-all duration-300 ease-in-out z-10 h-[calc(100vh-5rem)] relative",
            {
              "ml-52": !isCollapsed && isDesktop,
              "ml-20": isCollapsed && isDesktop,
            }
          )}
        >
          <Outlet />
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default DefaultLayout;
