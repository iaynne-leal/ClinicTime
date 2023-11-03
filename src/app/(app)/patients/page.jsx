"use client";
import { apiSystem } from "@/api";
import { Table } from "@/components";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { PatientTable } from "./components";

export const page = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  
  const getPatient = async () => {
    await apiSystem
      .get(`/patient`)
      .then((response) => {
        setData(response?.data?.patients);
      
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPatient();
  }, [refetch]);

  console.log("que me traes", data)

  return (
    <div className="w-full">
      <PatientTable patients={data} onRefetch={setRefetch}></PatientTable>
    </div>
  );
};

export default page;