import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";

const Signup: React.FC = (props) => {
    return (
      <Layout>
        <div className="page">
          <h1>Sign Up here</h1>
        </div>
        <style jsx>{`
          .post {
            background: white;
            transition: box-shadow 0.1s ease-in;
          }
  
          .post:hover {
            box-shadow: 1px 1px 3px #aaa;
          }
  
          .post + .post {
            margin-top: 2rem;
          }
        `}</style>
      </Layout>
    );
  };
  
  export default Signup;