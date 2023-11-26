import {
  Typography,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Tooltip,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const TemplateCardComponent = ({
  title,
  subTitle,
  phone,
  description,
  id,
  url,
  onEditCard,
  onLikedCard,
  onDeleteCard,
  likeFromData,
  canDelete,
}) => {
  // console.log(canDelete);
  const [like, setlike] = useState(likeFromData);
  const [deleteCard, setdeletedCard] = useState(false);
  const loggedin = useSelector((bigPie) => bigPie.authReducer.loggedIn);
  const handleDeleteCardClick = () => {
    //send the father the id of the card
    //set delete to true which will stop it from rendering
    setdeletedCard(true);
    onDeleteCard(id);
  };
  const handleEditCardClick = () => {
    //send the father id of the card

    onEditCard(id);
  };
  const handlelikeCardClick = () => {
    //send the father the like state and the id of the card
    //set liek to opposite which will chacnge the render
    onLikedCard(id, like);
    setlike(!like);
  };
  if (!deleteCard) {
    return (
      <Card
        sx={
          {
            // boxShadow: "2px 2px 5px",
            // border: "3px solid grey",
            // borderRadius: "8px",
          }
        }
      >
        <CardActionArea>
          <CardMedia
            sx={{ width: "100%", height: "auto" }}
            component="img"
            image={url}
          ></CardMedia>
          <CardHeader
            title={title}
            subheader={subTitle}
            sx={{ backgroundColor: "grey", color: "black" }}
            // onClick={handleEditCardClick}
          />
          <CardContent sx={{ backgroundColor: "lightgrey" }}>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Phone: </span>
              {phone}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>description: </span>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {!like && loggedin && (
          <Tooltip title="Like card">
            <IconButton onClick={handlelikeCardClick} aria-label="do staff">
              <ThumbUpOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        {like && loggedin && (
          <Tooltip title="Unlike card">
            <IconButton onClick={handlelikeCardClick} aria-label="do staff">
              <ThumbUpIcon />
            </IconButton>
          </Tooltip>
        )}
        {loggedin && (
          <Tooltip title="Edit card">
            <IconButton onClick={handleEditCardClick} aria-label="do staff">
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {canDelete && loggedin && (
          <Tooltip title="Delete card">
            <IconButton onClick={handleDeleteCardClick} aria-label="do staff">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Card>
    );
  }
};

TemplateCardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onLikedCard: PropTypes.func.isRequired,
};
export default memo(TemplateCardComponent);
