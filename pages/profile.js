import React from "react";
import Layout from "../components/Layout";
import { authInitialProps, getUserProfile } from "../lib/auth";

export default class Profile extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    getUserProfile().then((user) => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <Layout title="Profile" {...this.props}>
        <pre>{JSON.stringify(user, null, 2)}</pre>;
      </Layout>
    );
  }
}

Profile.getInitialProps = authInitialProps(true);
