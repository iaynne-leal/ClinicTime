"use client";
import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOption = (props) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [patients, setPatients] = useState([]); // Estado para almacenar los patients

  const getPatient = async () => {
    try {
      const response = await apiSystem.get(`/patient`);
      const rolesData = response.data?.patients;
      // Mapeamos los datos para obtener solo los nombres de los patients
      const patientNames = rolesData.map((r) => ({
        key: r.pk_patient,
        label: r.name, // Aquí accedemos al campo "rol"
      }));
      setPatients(patientNames);
    } catch (error) {}
  };

  useEffect(() => {
    getPatient();
  }, []);

  const handleChange = async (e) => {
    setSelectedNodeKey(e?.value || null);
    props?.onSelect(e?.value);
  };

  return (
    <div className="card flex justify-content-center">
      <TreeSelect
        value={selectedNodeKey || props?.name}
        onChange={handleChange}
        options={patients}
        selectionMode="single"
        className="md:w-20rem w-full"
        placeholder="Seleccione al paciente"
      />
    </div>
  );
};

export default InputOption;
