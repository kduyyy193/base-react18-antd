import classNames from "classnames";
import { routerLinks } from "common/routerLinks";
import { Collapse, Popover } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./index.less";

const Menu = ({ isCollapsed = false }: { isCollapsed: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuActive, setMenuActive] = useState(menus?.[0].name);
  useEffect(() => {
    let linkActive = "";
    menus.forEach((item) => {
      if (!linkActive && location.pathname.includes(routerLinks(item.name))) {
        linkActive = routerLinks(item.name);
      }
    });
    setMenuActive(linkActive);
  }, [location]);

  return (
    <ul className="menu relative h-[calc(100vh-5rem)] bg-blue-100" id={"menu-sidebar"}>
      {!!menuActive &&
        menus.map((item, index) => {
          if (!item.child) {
            return (
              <li
                className={classNames("flex items-center h-11 m-3 px-2", {
                  "bg-white text-blue-500 rounded-2xl":
                    location.pathname === routerLinks(item.name),
                  "justify-center": isCollapsed,
                })}
                onClick={() => navigate(routerLinks(item.name))}
                key={index}
              >
                <i className={classNames("text-3xl", item.icon)} />
                <span
                  className={classNames(
                    "ml-2.5 transition-all duration-300 ease-in-out font-bold capitalize",
                    {
                      "opacity-100": !isCollapsed,
                      "opacity-0 text-[0] ml-0": isCollapsed,
                    }
                  )}
                >
                  {item.name}
                </span>
              </li>
            );
          } else {
            return isCollapsed ? (
              <Fragment key={index}>
                <Popover
                  placement="rightTop"
                  trigger={"hover"}
                  content={
                    <>
                      {item.child.map((subItem, index) => (
                        <li
                          key={index}
                          className={classNames("child-item py-2 cursor-pointer capitalize", {
                            "bg-white text-blue-500":
                              location.pathname.indexOf(routerLinks(subItem.name)) > -1,
                          })}
                          onClick={() => navigate(routerLinks(subItem.name))}
                        >
                          {subItem.name}
                        </li>
                      ))}
                    </>
                  }
                >
                  <li className="flex items-center justify-center h-11 m-3 px-2">
                    <i className={classNames("text-3xl block", item.icon)} />
                  </li>
                </Popover>
              </Fragment>
            ) : (
              <li className="my-3" key={index}>
                <Collapse
                  accordion
                  bordered={false}
                  className="bg-blue-100"
                  defaultActiveKey={menuActive}
                >
                  <Collapse.Panel
                    key={item.name}
                    showArrow={!isCollapsed}
                    header={
                      <div
                        className={classNames("flex items-center text-gray-500", {
                          "justify-center": isCollapsed,
                          "bg-white text-blue-500 rounded-2xl":
                            location.pathname === routerLinks(item.name),
                        })}
                      >
                        <i
                          className={classNames("text-3xl block", item.icon, {
                            "ml-1": !isCollapsed,
                          })}
                        />
                        <span
                          className={classNames(
                            "pl-2.5 transition-all duration-300 ease-in-out font-bold capitalize",
                            {
                              "opacity-100": !isCollapsed,
                              "opacity-0 text-[0]": isCollapsed,
                            }
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                    }
                  >
                    {item.child.map((subItem, index) => (
                      <div
                        key={index}
                        className={classNames("child-item py-2 cursor-pointer capitalize", {
                          "bg-white text-blue-500":
                            location.pathname.indexOf(routerLinks(subItem.name)) > -1,
                        })}
                        onClick={() => navigate(routerLinks(subItem.name))}
                      >
                        {subItem.name}
                      </div>
                    ))}
                  </Collapse.Panel>
                </Collapse>
              </li>
            );
          }
        })}
    </ul>
  );
};

export default Menu;

const menus = [
  {
    icon: "las la-chart-area",
    name: "dashboard",
  },
  {
    icon: "las la-user-circle",
    name: "user",
  },
  {
    icon: "las la-user-plus",
    name: "Users",
    child: [
      {
        icon: "las la-user-plus",
        name: "User 2",
      },
      {
        icon: "las la-user-plus",
        name: "User 3",
      },
      {
        icon: "las la-user-plus",
        name: "User 4",
      },
    ],
  },
];
