import { Container } from "../components/Container";
// import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
// import unicornbikeImg from "../public/unicornbike.jpg";
// const unicornbikeImg = require("../public/unicornbike.jpg");

const Index = () => {
  // const { media, card, title } = useStyles;
  return (
    <Container title="Home">
      <Card /**className={card} */>
        <Typography
          variant="h6"
          // className={title}
        >
          Home Page
        </Typography>
        {/* <CardMedia
          // className={media}
          image={`${unicornbikeImg}`}
          title="Unicorn Bicycle"
        /> */}
        <CardMedia>
          <Image
            src={"/unicornbike.jpg"}
            alt="Unicorn Bicycle"
            width="64"
            height="64"
          />
        </CardMedia>
        <CardContent>
          <Typography>Welcome to the MERN Skeleton home page.</Typography>
          {/* <Link to="/users">Users</Link> */}
        </CardContent>
      </Card>
    </Container>
  );
};
export default Index;
