import React from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/CarLayout";
import Car, { CarProps } from "../../components/Car"
import prisma from '../../lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.marketCar.findMany({
    where: {
      available: true,
    },
    include: {
      users: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: CarProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Car Feed</h1>
        <main>
          {props.feed.map((car) => (
            <div key={car.id} className="car">
              <Car car={car} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .car {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .car:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .car + .car {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
