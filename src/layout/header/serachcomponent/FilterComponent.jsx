import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const FilterComponent = () => {
  const [txt, setTxt] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [disable, setDisable] = useState(true);
  const handleInputChange = (e) => {
    //chane the search input and navigaet to  parmas that can be monitored
    //gives the param filter:some value
    setTxt(e.target.value);
    navigate(`${pathname}?filter=${e.target.value}`);

    //localhost:3000/?filter=asdfasdfasd
  };
  useEffect(() => {
    // check at run if he can search
    //if he is in those route the he can search if not then he dosen able to searcfv
    if (
      pathname == "/cards" ||
      pathname == "/cards/favorite" ||
      pathname == "/home" ||
      pathname == "/sandbox"
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [pathname]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        disabled={disable}
        value={txt}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default FilterComponent;
