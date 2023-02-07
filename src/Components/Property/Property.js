import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Property(props) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.house.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.house.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.house.location}
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
