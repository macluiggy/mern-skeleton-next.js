import { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import auth from "../../lib/auth-helper";
import { read, update } from "../../lib/api-user";
import { signin } from "../../lib/api-auth";
import {
  THandleChange,
  UseStylesProps,
  useStyles,
  PropValues,
} from "../../types/EditProfile";
import Redirect from "../Redirect";
import { Container } from "../Container";

export default function EditProfile({ userId }) {
  const classes = useStyles();
  const [values, setValues] = useState<PropValues>({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    redirectToProfile: false,
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      const { error, email, name } = data;
      if (data && error) {
        setValues({ ...values, error });
      } else {
        setValues({ ...values, name, email });
      }
    });
    //
    return () => {
      abortController.abort();
    };
  }, [userId]);

  const clickSubmit = () => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    update({ userId: userId }, { t: jwt.token }, user).then((data) => {
      const { error, _id: userId } = data;
      if (data && error) {
        // console.log("an error occured");
        setValues({ ...values, error });
      } else {
        // console.log("user updated");
        setValues({
          ...values,
          redirectToProfile: true,
          userId,
        });
      }
    });
  };

  const handleChange: THandleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  if (values.redirectToProfile) return <Redirect path={`/user/${userId}`} />;

  return (
    <Container title="Edit Profile">
      <Card sx={classes.card}>
        <CardContent>
          <Typography variant="h6" sx={classes.title}>
            Edit Profile
          </Typography>
          <TextField
            id="name"
            label="Name"
            sx={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            sx={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            sx={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
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
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
