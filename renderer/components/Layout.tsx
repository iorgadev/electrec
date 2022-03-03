import Menu from "./Menu";

function Layout({ children }) {
  return (
    <div className="wrapper">
      <Menu />
      <div className="container">{children}</div>
    </div>
  );
}

export default Layout;
