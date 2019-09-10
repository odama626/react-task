import React, { useState } from "react"
import { graphql } from 'gatsby';

import Layout from "../components/layout"
import SEO from "../components/seo"
import LineChart from '../components/lineChart';
import BarChart from '../components/barChart';
import io from 'socket.io-client';

const IndexPage = (props) => {
  console.log(props);
  const { socketUrl } = props.data.site.siteMetadata;
  const [socket, setSocket ] = useState(io(socketUrl));


  return (
    <Layout>
      <SEO title="Home" />
      <LineChart socket={socket} />
      <BarChart socket={socket} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query ConnectionInfo {
    site {
      siteMetadata {
        socketUrl
      }
    }
  }
`;
