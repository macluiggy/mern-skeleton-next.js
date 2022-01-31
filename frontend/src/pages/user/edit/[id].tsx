import React from "react";
import EditProfile from "../../../components/EditProfile";
import auth from "../../../lib/auth-helper";
import Redirect from "../../../components/Redirect";
import Router, { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { useEffect, useState } from "react";
import { list } from "../../../lib/api-user";
import Link from "next/link";

export default function PrivateRoute({ userId }) {
  // const [id, setId] = useState("");
  const router = useRouter();
  // const { id } = router.query;

  if (router.isFallback) {
    // router.push("/users");
    return <div>Loading....</div>;
  }
  // if (!router.isFallback && !userId) {
  //   return (
  //     <>
  //       <h1>Please try again</h1>
  //       <Link href="/">
  //         <a>return to homepage</a>
  //       </Link>
  //     </>
  //   );
  // }
  // const redirect = async () => {
  //   if (!auth.isAuthenticated()) {
  //     return <Redirect path={"/signin"} />;
  //   }
  // };
  // useEffect(() => {
  //   redirect();
  // }, []);
  if (router.isReady) {
    if (!auth.isAuthenticated()) {
      return <Redirect path={"/signin"} />;
    }
  }
  return (
    <div title="Redirecting">
      <EditProfile userId={userId} />
    </div>
  );
}

{
  /* <Container title="Redirecting">
  {auth.isAuthenticated() ? (
    <EditProfile userId={id} />
  ) : (
    <Redirect path="/signin" />
  )}
</Container>; */
}

const getUsers = async () => {
  // const abortController = new AbortController();
  // const { signal } = abortController;
  // list(signal).then((data) => {
  //   if (data && data.error) return console.log(data.error);
  // });
  const data = await list();
  if (data && data.error) return console.log(data.error);
  return data; //a array of user objects
};

export async function getStaticPaths() {
  const users = await getUsers();
  // console.log(users, "from getstaticpaths");

  return {
    paths: users.map((user) => {
      return { params: { id: user._id } };
    }),
    fallback: true,
  };
}
// var jwt = auth.isAuthenticated();

export async function getStaticProps({ params }) {
  // const respnse = await fetch(`${path}/api/users/${params.id}`);
  // const user = await respnse.json();
  // console.log(user);
  // console.log(jwt);

  // const t = jwt.token;
  // const user = await read({ userId: params.id }, { t });
  // console.log(user, "from getstaticprops");
  // if (!params.id)
  //   return {
  //     props: { userId: undefined },
  //   };
  return {
    props: {
      userId: params.id,
    },
  };
}

// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   };
// }
