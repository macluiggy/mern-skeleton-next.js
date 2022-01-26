import { useState } from "react";
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
import { Error } from "@mui/icons-material";
import Link from "next/link";
import { UseStylesProps, UserProps } from "./types";
import { create } from "../../lib/api-user";

const useStyles = (): UseStylesProps => ({
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    paddingBottom: "1rem",
  },
  error: {},
  title: {},
  textField: {},
  submit: {},
});

export default function Signup() {
  const classes = useStyles();
  const [values, setValues] = useState<UserProps>({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      password: values.password || undefined,
      email: values.email || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };
  return (
    <div>
      <Card sx={classes.card}>
        <CardContent>
          <Typography variant="h6" sx={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            sx={classes.textField}
            label="Name"
            onChange={handleChange("name")}
            value={values.name}
            margin="normal"
          />
          <br />
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
                <Error />
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
      <Dialog open={values.open} /**disableBackdropClick={true} */>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link href={"/signin"}>
            <Button color="primary" autoFocus variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
