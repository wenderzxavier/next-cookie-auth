import Layout from "../components/Layout";
import Link from "next/link";
import { authInitialProps } from "../lib/auth";

const Index = (props) => {
  return (
    <Layout title="Home" {...props}>
      <Link href="/profile">
        <a>Go to profile</a>
      </Link>
    </Layout>
  );
};

export default Index;

Index.getInitialProps = authInitialProps();
