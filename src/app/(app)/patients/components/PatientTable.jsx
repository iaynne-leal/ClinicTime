"use client";
import React from 'react';
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { apiSystem } from "@/api";
import { useRef, useState } from "react";

export default function PatientTable({ patients, onRefetch }) {
  let emptyPatient = {
    pk_patient: null,
    name: "",
    phone: "",
    email: "",
    birthdate: "",
    cod_patient:"",
    dpi:""

  };

  const [patientDialog, setPatientDialog] = useState(false);
  const [deletePatientDialog, setDeletePatientDialog] = useState(false);
  const [name, setPatient] = useState(emptyPatient);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const createPatient = async (data) => {
    await apiSystem
      .post(`/patient`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePatient = async (id, data) => {
    await apiSystem
      .put(`/patient/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const detelePatient = async (id) => {
    await apiSystem
      .delete(`/patient/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNew = () => {
    setPatient(emptyPatient);
    setSubmitted(false);
    setPatientDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setPatientDialog(false);
  };

  const hideDeletePatientDialog = () => {
    setDeletePatientDialog(false);
  };


  const savePatient = async () => {
    setSubmitted(true);

    if (name.name.trim()) {
      console.log("que paso", name);
      if (name.pk_patient) {
        try {
          await updatePatient(name.pk_patient, name);
          toast.current.show({
            severity: "success",
            summary: "Rol actualizado",
            detail: "El paciente se actualizo correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al actualizar al paciente",
            life: 3000,
          });
        }
      } else {
        try {
          await createPatient(name);
          toast.current.show({
            severity: "success",
            summary: "Exito!",
            detail: "El paciente se creo correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al crear al paciente",
            life: 3000,
          });
        }
      }

      setPatientDialog(false);
      setPatient(emptyPatient);
    }
    onRefetch(true);
  };


  const editPatient = (name) => {
    setPatient({ ...name });
    setPatientDialog(true);
  };

  const confirmDeletePatient = (name) => {
    setPatient(name);
    setDeletePatientDialog(true);
  };

  const deletePatients = async () => {
    try {
      await detelePatient(name.pk_patient);
      setDeletePatientDialog(false);
      setPatient(emptyPatient);
      toast.current.show({
        severity: "success",
        summary: "Éxito!",
        detail: "Paciente eliminado correctamente",
        life: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error! ",
        detail: "Hubo un error al eliminar al paciente",
        life: 3000,
      });
    }
    onRefetch(true);
  };


  const onInputChange = (e, nombre) => {
    const val = (e.target && e.target.value) || "";
    let _patient = { ...name };

    _patient[`${nombre}`] = val;

    setPatient(_patient);
  };

  const leftToolbarTemplate = () => {
    return (
      <Button
        label="Crear Paciente"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editPatient(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeletePatient(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between ">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar"
        />
      </span>
    </div>
  );
  const patientDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" onClick={savePatient} />
    </React.Fragment>
  );
  const deletePatientDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeletePatientDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deletePatients}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          end={leftToolbarTemplate}
          start={header}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={patients}
          selection={selectedPatient}
          onSelectionChange={(e) => setSelectedPatient(e.value)}
          dataKey="id"
          paginator
          rows={4}
          tableClassName="border"
          rowsPerPageOptions={[4, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando registros del {first} al {last}, Total {totalRecords} registros"
          globalFilter={globalFilter}
        >
          <Column
            field="name"
            header="Paciente"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column field="phone" header="Teléfono"></Column>
          <Column field="email" header="Correo"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={patientDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Crear Paciente"
        modal
        className="p-fluid"
        footer={patientDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Nombre del paciente
          </label>
          <InputText
            id="name"
            value={name.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !name.name })}
          />
          {submitted && !name.name && (
            <small className="p-error">El nombre es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone" className="font-bold">
            Teléfono
          </label>
          <InputText
            id="phone"
            value={name.phone}
            onChange={(e) => onInputChange(e, "phone")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !name.phone })}
          />
          {submitted && !name.phone && (
            <small className="p-error">El teléfono es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="email" className="font-bold">
            Correo
          </label>
          <InputText
            id="email"
            value={name.email}
            onChange={(e) => onInputChange(e, "email")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !name.email})}
          />
          {submitted && !name.email && (
            <small className="p-error">El correo es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="birthdate" className="font-bold">
            Fecha de nacimiento
          </label>
          <InputText
            id="birthdate"
            value={name.birthdate}
            onChange={(e) => onInputChange(e, "birthdate")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !name.birthdate})}
          />
          {submitted && !name.birthdate && (
            <small className="p-error">La fecha de naciemiento es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="dpi" className="font-bold">
            DPI
          </label>
          <InputText
            id="dpi"
            value={name.dpi}
            onChange={(e) => onInputChange(e, "dpi")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !name.dpi})}
          />
          {submitted && !name.dpi && (
            <small className="p-error">El DPI es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="cod_patient" className="font-bold">
            Código de paciente
          </label>
          <InputText
            id="cod_patient"
            value={name.cod_patient}
            onChange={(e) => onInputChange(e, "cod_patient")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !name.cod_patient})}
          />
          {submitted && !name.cod_patient && (
            <small className="p-error">El código del paciente es requerido.</small>
          )}
        </div>

      </Dialog>

      <Dialog
        visible={deletePatientDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deletePatientDialogFooter}
        onHide={hideDeletePatientDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {name && (
            <span>
              Esta seguro de querer eliminar al paciente <b>{name.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export { PatientTable };
