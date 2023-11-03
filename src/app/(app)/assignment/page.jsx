"use client";
import { CardAppoinment } from "@/components";
import { useEffect, useState } from "react";
import { apiSystem } from "@/api";


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
    <>
    <CardAppoinment  appoiments={data} onRefetch={setRefetch} ></CardAppoinment>
  </>
  );
};

export default page;
