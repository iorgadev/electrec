import Menu from "./Menu";
import Draggable from "./Draggable";

function Layout({ children }) {
  return (
    <div className="layout">
      <Draggable />
      <div className="wrapper">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
