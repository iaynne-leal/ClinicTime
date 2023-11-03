"use client";

import { CardAppoinment } from "@/components";
import { useEffect, useState } from "react";
import { apiSystem } from "@/api";
import CustomChart from "@/components/Chart";

export default function Home() {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const getAppoiment = async () => {
    await apiSystem
      .get(`/appoiment`)
      .then((response) => {
        const data = response?.data?.appoinments.map((a) => ({
          ...a,
          next_appoinment: new Date(a.next_appoinment).toLocaleDateString(
            undefined,
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          patients: a.patients.map((patient) => patient.name),
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

  const datas = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="h-screen overflow-y-auto bg-slate-50 ">
      <CustomChart
        className="m-10"
        config={{ type: "bar", data: datas }}
        id="citasPorPaciente"
      ></CustomChart>
       <div className="m-40"></div>
      <div className="m-10">
      <CardAppoinment appoiments={data} onRefetch={setRefetch}></CardAppoinment>
      </div>
    </div>
  );
}