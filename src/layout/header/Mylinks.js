import ROUTES from "../../routes/ROUTES";
//object to access diffrent links
//depend on what calling them
const myLinks = {
  alwaysLinks: [{ to: ROUTES.CARDS, children: "cards page" }],
  loggedinLinks: [
    { to: ROUTES.HOME, children: "Home page" },
    {
      to: `${ROUTES.CARDS}/cratecard`,
      children: "crate card",
    },
  ],
  loggedoutLinks: [
    { to: ROUTES.REGISTER, children: "Register page" },
    { to: ROUTES.LOGIN, children: "Login page" },
  ],
  adminType:[
    {to:ROUTES.SANDBOX,children:"SANDBOX"}
  ]
};

export default myLinks;
