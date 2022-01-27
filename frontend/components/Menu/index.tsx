import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import Link from "next/link";
import auth from "../../lib/auth-helper";
import { useRouter } from "next/router";

const isActive = (currentPathname: string, pathname: string) => {
  return currentPathname === pathname
    ? { color: "#f50057" }
    : { color: "#ffffff" };
};
export default function Menu() {
  const { pathname, push } = useRouter();
  // console.log(router.pathname);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <Link href="/">
          <IconButton aria-label="Home" style={isActive(pathname, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link href="/users">
          <Button style={isActive(pathname, "/users")}>Users</Button>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link href="/signup">
              <Button style={isActive(pathname, "/signup")}>Sign Up</Button>
            </Link>
            <Link href="/signin">
              <Button style={isActive(pathname, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link href={`/user/${auth.isAuthenticated().user._id}`}>
              <Button
                style={isActive(
                  pathname,
                  `/user/${auth.isAuthenticated().user._id}`
                )}
              >
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                auth.clearJWT(() => push("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}

export async function gesServerSideProps() {
  return {
    props: {},
  };
}
