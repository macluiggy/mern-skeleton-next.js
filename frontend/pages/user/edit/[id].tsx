import React from "react";
import EditProfile from "../../../components/EditProfile";
import auth from "../../../lib/auth-helper";
import Redirect from "../../../components/Redirect";
import Router, { useRouter } from "next/router";
import { Container } from "../../../components/Container";

export default function PrivateRoute() {
  const router = useRouter();
  const { id } = router.query;
  if (!auth.isAuthenticated() && window !== undefined) {
    return router.push("/signin");
  }
  return (
    <Container title="Redirecting">
      <EditProfile userId={id} />
    </Container>
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
