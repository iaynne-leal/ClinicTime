import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const CardAppoinment = ({ appoiments }) => {
  const header = (
    <div
      className="relative h-28 bg-contain flex justify-end items-end"
      style={{
        backgroundImage:
          "url('https://primefaces.org/cdn/primereact/images/usercard.png')",
      }}
    >
    </div>
  );

  return (
    <div className="flex justify-content-center">
      {appoiments.map((appoiment, index) => (
        <div key={index} className="m-2">
          <Card
            title="Próxima cita"
            className="md:w-25rem "
            subTitle={
              <p className="capitalize">{appoiment.next_appoinment} </p>
            }
            header={header}
          >
            <div>
              <p className="text-sm">
                Paciente: {appoiment.patients.join(", ")}{" "}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CardAppoinment;
