import React from "react";
import EditProfile from "../../../components/EditProfile";
import auth from "../../../lib/auth-helper";
import Redirect from "../../../components/Redirect";
import Router, { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { useEffect, useState } from "react";

export default function PrivateRoute() {
  // const [id, setId] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const redirect = async () => {
    if (!auth.isAuthenticated()) {
      return <Redirect path={"/signin"} />;
    }
  };
  useEffect(() => {
    redirect();
  }, []);
  return (
    <div title="Redirecting">
      <EditProfile /* userId={id} */ />
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
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
