interface ILinks {
  [key: string]: string;
}

export const routerLinks = (name: string) => {
  const links: ILinks = {
    home: "/",
    user: "/user",
    dashboard: "/dashboard",
    login: "/login",
    signup: "/signup",
  };

  return links[name];
};
