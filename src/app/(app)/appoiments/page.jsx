"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppoimentTable from "./components/AppoimentTable";

export const page = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const getAppoiment = async () => {
    await apiSystem
      .get(`/appoiment`)
      .then((response) => {
        const data = response?.data?.appoinments.map((a) => ({
          ...a,
          next_appoinment: new Date(a.next_appoinment).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          patients: a.patients.map((patient) => patient.name) 
        }));
        console.log("holi", data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAppoiment();
  }, [refetch]);

 
  return (
    <div className="w-full">
      <AppoimentTable appoiments={data} onRefetch={setRefetch}></AppoimentTable>
    </div>
  );
};

export default page;
