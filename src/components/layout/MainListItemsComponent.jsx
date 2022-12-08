import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const MainListItemsComponent = () => {
  return (
    <>
      <Link to={"/"}>
        <ListItemButton>
          <ListItemIcon style={{ marginLeft: 9 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </Link>
    </>
  );
};

export default MainListItemsComponent;
