import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemplateCardComponent from "../components/TemplateCardComponent";
import { Typography } from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import useSearchquery from "../hooks/useSearchParams";
import WarningMessage from "../tostifyHandeker/WarningMessage";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((bigPie) => bigPie.authReducer);
  const search = useSearchquery();
  // console.log(search);
  const loggedin = user.loggedin;
  const userData = user.userInfo;
  const userId = user.userData;
  const [cards, SetCards] = useState("");
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  // console.log(userData);

  const memoCard = React.memo(TemplateCardComponent);

  // const [userData, SetUserData] = useState(null);

  // console.log(userId, loggedin);
  useEffect(() => {
    if (userData) {
      const myCard = axios
        .get("/cards/my-cards")
        .then(function (response) {
          if (response.data && response.data.length > 0) {
            console.log("done");
            SetCards(response.data);
            setInitialDataFromServer(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [loggedin]);
  useEffect(() => {
    //check if initial data is populate if not return
    //check the value of the hook in filter key if empty return
    //if filter does contain something the fiter the cards
    if (!initialDataFromServer.length) return;
    const filter = search.filter ? search.filter : "";
    const filteredCards = initialDataFromServer.filter((card) =>
      card.title.startsWith(filter)
    );
    if (filteredCards.length === 0) {
      // Handle empty response here
      WarningMessage("No cards match the filter");
      console.log("No cards match the filter");
    }
    SetCards(filteredCards);
  }, [search, initialDataFromServer]);
  const handleEditCard = useCallback((idToEdit) => {
    navigate(`/cards/${idToEdit}/edit`); // Navigate to the specified path after the delay
  }, []);
  const handeDeleteCard = useCallback((idToDelte) => {
    console.log("the card to del", idToDelte);
    axios
      .delete(`/cards/${idToDelte}`)
      .then(function (response) {
        console.log(response.data);
        // setDataFromServer(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleLikeCard = useCallback((idToLike, like) => {
    // console.log("Card to like:", idToLike);
    axios
      .patch(`/cards/${idToLike}`)
      .then(function (response) {
        // console.log(response.data);
        // setDataFromServer(response.data);
        if (!like) {
          SuccessMessage("liked");
        } else {
          SuccessMessage("unliked");
        }
      })
      .catch(function (error) {
        console.log(error);
        ErrorMessage(error.response.data);
      });

    // navigate(`/cards/${idToEdit}`); // Navigate to the specified path after the delay
  }, []);
  if (userData) {
    return (
      <Typography variant="h1" textAlign="center">
        hello {userData.name.first}
        {initialDataFromServer.length > 0 && cards.length > 0 && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              {cards.map((card) => (
                <Grid xs={12} sm={6} md={3} key={card._id}>
                  <TemplateCardComponent
                    id={card._id}
                    title={card.title}
                    subTitle={card.subtitle}
                    phone={card.phone}
                    description={card.description}
                    url={card.image.url}
                    onEditCard={handleEditCard}
                    onLikedCard={handleLikeCard}
                    onDeleteCard={handeDeleteCard}
                    likeFromData={card.likes.includes(userId) ? true : false}
                    canDelete={card.user_id == userId ? true : false}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Typography>
    );
  } else if (initialDataFromServer.length > 0 && cards.length == 0) {
    return <Typography variant="h1">no cards match</Typography>;
  } else {
    <Typography variant="h1">
      this page is protected so you cant see it unless you log in
    </Typography>;
  }
};

export default HomePage;
