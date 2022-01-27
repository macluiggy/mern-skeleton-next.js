import React from "react";
import { list, read } from "../../lib/api-user";
import { UserProps } from "../../types/user";
import { path } from "../../config";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { Edit, Person } from "@mui/icons-material";
import Link from "next/link";
import Redirect from "../../components/Redirect";
import auth from "../../lib/auth-helper";
import { useState, useEffect } from "react";
import { UseStylesProps } from "../../types/user";
import { useRouter } from "next/router";
import DeleteUser from "../../components/DeleteUser";
import { Container } from "../../components/Container";

const useStyles = (): UseStylesProps => ({
  root: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "1rem",
    marginTop: "1rem",
  },
  title: {
    marginTop: "1rem",
    color: "black",
  },
});
export default function Profile() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
    created: "",
    _id: "",
  });
  // const [userId, setUserId] = useState<string>("");
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  // const loadUser = async () => {
  //   if (router && router.query) {
  //     console.log(router.query);
  //     setUserId(router.query.id.toString());
  //   }
  //   return await userId;
  // };
  useEffect(() => {
    // localStorage.setItem("id", `${id}`);
    // let id = loadUser();
    const abortController = new AbortController();
    const signal = abortController.signal;
    // console.log(jwt);
    // console.log(userId);

    const t = typeof jwt === "boolean" ? jwt : jwt.token;
    read({ userId: id.toString() }, { t }, signal).then((data) => {
      // console.log(data);
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  if (redirectToSignin) return <Redirect path={"/signin"} />;
  return (
    <Container title="Profile">
      <Paper sx={classes.root}>
        <Typography variant="h6" sx={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />{" "}
            {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == user._id && (
                <ListItemSecondaryAction>
                  <Link href="/user/edit/[id]" as={`/user/edit/${user._id}`}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={user._id} />
                </ListItemSecondaryAction>
              )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={`Joined: ${new Date(user.created || "").toDateString()}`}
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

// const getUsers = async () => {
//   const abortController = new AbortController();
//   const { signal } = abortController;
//   // list(signal).then((data) => {
//   //   if (data && data.error) return console.log(data.error);
//   // });
//   const data = await list(signal);
//   if (data && data.error) return console.log(data.error);
//   return data; //a array of user objects
// };

// export async function getStaticPaths() {
//   const users = await getUsers();
//   // console.log(users);

//   return {
//     paths: users.map((user: UserProps) => {
//       return { params: { id: user._id } };
//     }),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const respnse = await fetch(`${path}/api/users/${params.id}`);
//   const user = await respnse.json();
//   console.log(user);

//   return {
//     props: {
//       user,
//     },
//   };
// }

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
