
import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";

const Row = card => (
    <Card
        raised={true}
        key={card.id}
        className="card"
    >
        <img
            src={`images/${card.url}`}
            alt={card.name}
            className="card-image"
            onClick={card.handleClick}
            id={card.id}
        />
        <CardContent>
            <Typography gutterBottom variant="h6" component="h3">
                {card.name}
            </Typography>
        </CardContent>
    </Card>
)

export default Row;