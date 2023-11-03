"use client";
import { apiSystem } from "@/api";
import { Table } from "@/components";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { RoleTable } from "./components";

export const page = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  
  const getRol = async () => {
    await apiSystem
      .get(`/role`)
      .then((response) => {
        setData(response?.data?.roles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRol();
  }, [refetch]);

  return (
    <div className="w-full">
      <RoleTable roles={data} onRefetch={setRefetch}></RoleTable>
    </div>
  );
};

export default page;
