import {
  Paper,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Person, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { SxProps } from "@mui/material";
// import { path } from "../../config";
import { list } from "../../lib/api-user";
import { Container } from "../../components/Container";
import { Fragment, useState, useEffect } from "react";

type UseStylesProps = {
  root: SxProps;
  title: SxProps;
};
const useStyles = (): UseStylesProps => ({
  root: {
    padding: "1rem",
    margin: "1rem",
  },
  title: {
    margin: "4px 0 2px",
    color: "black",
  },
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) return console.log(data.error);
      // console.log(data);

      setUsers(data);
      setLoading(false);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <Container title="Users">
      <Paper sx={classes.root}>
        <Typography variant="h6" sx={classes.title}>
          All Users
        </Typography>
        <List dense>
          {loading ? (
            <div>loading</div>
          ) : (
            users.map(({ _id, name }, i) => {
              return (
                <Fragment key={_id}>
                  <Link href="/user/[id]" as={`/user/${_id}`}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={name} />
                      <ListItemSecondaryAction>
                        <IconButton>
                          <ArrowForward />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                </Fragment>
              );
            })
          )}
        </List>
      </Paper>
    </Container>
  );
};

// const getUsers = async () => {
//   const abortController = new AbortController();
//   const { signal } = abortController;
//   // list(signal).then((data) => {
//   //   if (data && data.error) return console.log(data.error);
//   // });
//   const data = await list(signal);
//   if (data && data.error) return console.log(data.error);
//   return data;
// };
// export async function getStaticProps() {
//   const users = await getUsers();
//   return {
//     props: {
//       users,
//     },
//   };
// }
export async function getServerSideProps() {
  return {
    props: {},
  };
}
export default Users;
