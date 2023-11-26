import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavLinkComponent from "../header/NavLinkComponent";
import { useNavigate } from "react-router-dom";

const FooterComponent = () => {
  const navigate=useNavigate()
  const NavigateToFavorite=()=>{
    navigate("/cards/favorite")
}
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={NavigateToFavorite}/>{" "}
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};

export default FooterComponent;
