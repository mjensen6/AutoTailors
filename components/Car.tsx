import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type CarProps = {
  id: number;
  marketPrice: number;
  wholesalePrice: number;
  offerPrice: number;
  make: string;
  model: string;
  year: string;
  vin: string;
  transmission: string;
  website: string;
  available: boolean;
  user: {
      name: string;
      email: string;
  } | null;
};

const Car: React.FC<{ car: CarProps }> = ({ car }) => {
  return (
    <div onClick={() => Router.push("/cars/[id]", `/cars/${car.id}`)}>
      <h2>{car.year} {car.make} {car.model}</h2>
      <ReactMarkdown source={car.vin} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Car;
