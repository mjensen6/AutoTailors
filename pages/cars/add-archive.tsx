import React from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import { GetStaticProps } from "next";
import prisma from '../../lib/prisma'
import SingleSelect from "../../components/SingleSelect"


export const getStaticProps: GetStaticProps = async () => {
    const makesJson = await prisma.mMTLite.findMany({
        where: {},
        distinct: ['make'],
        select:{
            make: true
        }
      });


      
      var makesArray = makesJson.map(function(item){
        var makeFormatted = {
            "value": item.make,
            "label": item.make
        }
        return makeFormatted;

      });

      
      
      return {
          props: {makesArray},
      };
  };

  type Props = {
      makesArray: [];
  }

const NewCar: React.FC<Props> = (props) => {
  const submitData = async (e: React.SyntheticEvent) => {
    //e.preventDefault();
    try {
      const body = "";
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Layout>
      <div>
          <h1>New Draft</h1>
          <SingleSelect 
          options = {props.makesArray}
          name = ""
          />
      </div>
      
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
    
  );
};

export default NewCar;
