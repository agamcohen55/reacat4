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
import { Navigate, useNavigate } from "react-router-dom";
import SuccessMessage from "../tostifyHandeker/SuccessMessage";
import ErrorMessage from "../tostifyHandeker/ErrorMessage";
import Directing from "./Directing";
import WarningMessage from "../tostifyHandeker/WarningMessage";
import useSearchquery from "../hooks/useSearchParams";
import ROUTES from "../routes/ROUTES";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const FavoriteCards = () => {
  const navigate = useNavigate();

  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const userData = useSelector((bigPie) => bigPie.authReducer.userInfo);
  const userId = useSelector((bigPie) => bigPie.authReducer.userData);
  const [cards, SetCards] = useState("");
  const [done, setDone] = useState(false);
  const search = useSearchquery();
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const [empty, setEmpty] = useState(true);

  const memoCard = React.memo(TemplateCardComponent);

  // const [userData, SetUserData] = useState(null);
  // console.log(userId, loggedin);
  useEffect(() => {
    axios
      .get("/cards")
      .then(function (response) {
        const LikedCards = response.data.filter((card) =>
          card.likes.includes(userId)
        );
        if (LikedCards.length === 0) {
          //check if he has favorite at all
          //if he dosent then render somthing else...
          WarningMessage("you  have no favorite cards...");
          setEmpty(false);
          navigate(ROUTES.HOME);
        }
        SetCards(LikedCards);
        setInitialDataFromServer(LikedCards);
        setDone(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
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
      // Handle if card is empty after filter here
      WarningMessage("No cards match the filter");
    }
    SetCards(filteredCards);
  }, [search.filter, initialDataFromServer]);
  const handleEditCard = useCallback((idToEdit) => {
    // Navigate to the specified path after the delay for edit the card
    navigate(`/cards/${idToEdit}/edit`);
  }, []);
  const handeDeleteCard = useCallback((idToDelte) => {
    console.log("the card to del", idToDelte);
    axios
      .delete(`/cards/${idToDelte}`)
      .then(function (response) {})
      .catch(function (error) {
        //catnt delete card
        ErrorMessage(error.response.data);
      });
  }, []);
  const handleLikeCard = (idToLike, like) => {
    // console.log("Card to like:", idToLike);
    axios
      .patch(`/cards/${idToLike}`)
      .then(function (response) {
        //it does unlike the card so give him maasege
        SuccessMessage("unliked");
        cards.map((card, index) => {
          if (card._id == idToLike) {
            //update the cards to delte it
            const copied = [...cards];
            copied.splice(index, 1);
            SetCards(copied);
            if (copied.length == 0) {
              //if the new cards became empty mange that
              WarningMessage("you  have no favorite cards...");
              navigate(ROUTES.HOME);
            }
          }
        });
      })
      .catch(function (error) {
        //error like or unlike the card faild(server error)
        ErrorMessage(error.response.data);
      });

    // navigate(`/cards/${idToEdit}`); // Navigate to the specified path after the delay
  };

  if (done) {
    if (initialDataFromServer.length > 0 && cards.length > 0) {
      //there is liked card
      return (
        <>
          {cards && (
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
                      likeFromData={true}
                      canDelete={card.user_id == userId ? true : false}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      );
    } else if (initialDataFromServer.length > 0 && cards.length == 0) {
      //no one match after the search
      return <Typography variant="h1">No card match</Typography>;
    } /* else if (cards.length == 0) {
      //there no is liked card
      WarningMessage("you have no liked card");
      return <Directing />;
    } */
  } else {
    //the check for like isn't done yet
    return <Typography variant="h1">Waiting for server...</Typography>;
  }
};

export default FavoriteCards;
