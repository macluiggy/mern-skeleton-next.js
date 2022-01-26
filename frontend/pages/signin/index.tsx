import { useState } from "react";
import { signin } from "../../lib/api-auth";
import {
  Card,
  Typography,
  TextField,
  CardContent,
  CardActions,
  Button,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Link from "next/link";
import { iUserSignIn } from "../../lib/types";
import { UseStylesProps } from "./types";
import auth from "../../lib/auth-helper";
import Redirect from "../../components/Redirect";
// import Router from "next/router";

const useStyles = (): UseStylesProps => ({
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "1rem",
    paddingBottom: "1rem",
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: "1rem",
    color: "black",
  },
  textField: {
    marginLeft: "1rem",
    marginRight: "1rem",
    width: 300,
  },
  submit: {
    margin: "auto0",
    marginBottom: "1rem",
  },
});

export default function Signin() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });
  // const router = useRouter;

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      // console.log(data, "from signin");

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) return <Redirect path="/" />;

  return (
    <div>
      <Card sx={classes.card}>
        <CardContent>
          <Typography variant="h6" sx={classes.title}>
            Sign In
          </Typography>
          <TextField
            id="email"
            type="email"
            sx={classes.textField}
            label="Email"
            onChange={handleChange("email")}
            value={values.email}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            sx={classes.textField}
            label="Password"
            onChange={handleChange("password")}
            value={values.password}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" sx={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            sx={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
