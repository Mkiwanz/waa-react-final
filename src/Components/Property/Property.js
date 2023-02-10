import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import houseImage from "../../Resources/Images/background.jpg";
import StatusDot from "../StatusDot/StatusDot";

function Property(props) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ borderRadius: 15 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            props.house.photos === null ||
            props.house.photos === undefined ||
            props.house.photos.length === 0
              ? houseImage
              : props.house.photos[0]
          }
          alt="Kiwan"
        />
        <CardContent>
          <StatusDot status={props.house.status} />

          <Typography gutterBottom variant="h5" component="div">
            ${props.house.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.house.propertyType
              ? props.house.propertyType.toUpperCase()
              : null}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.house.details}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.house.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Property;
