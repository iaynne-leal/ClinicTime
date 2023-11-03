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
import { CalendarTime, InputOptionPatient, InputOptionUser } from '@/components';

export default function AppoimentTable({ appoiments, onRefetch }) {
  let emptyAppoiment = {
    pk_appoinment: null,
    next_appoinment: "",
    pk_patient: "",
    pk_user: "",
  };

  const [appoimentDialog, setAppoimentDialog] = useState(false);
  const [deleteAppoimentDialog, setDeleteAppoimentDialog] = useState(false);
  const [next_appoinment, setAppoiment] = useState(emptyAppoiment);
  const [selectedAppoiment, setSelectedAppoiment] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const createAppoiment = async (data) => {
    await apiSystem
      .post(`/appoiment`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAppoiment = async (id, data) => {
    await apiSystem
      .put(`/appoiment/${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deteleAppoiment = async (id) => {
    await apiSystem
      .delete(`/appoiment/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNew = () => {
    setAppoiment(emptyAppoiment);
    setSubmitted(false);
    setAppoimentDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setAppoimentDialog(false);
  };

  const hideDeleteAppoimentDialog = () => {
    setDeleteAppoimentDialog(false);
  };


  const saveAppoiment = async () => {
    setSubmitted(true);

    if (next_appoinment) {
      if (next_appoinment.pk_appoinment) {
        try {
          await updateAppoiment(next_appoinment.pk_appoinment, next_appoinment);
          toast.current.show({
            severity: "success",
            summary: "Cita actualizada",
            detail: "La cita se actualizo correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al actualizar la cita",
            life: 3000,
          });
        }
      } else {
        try {
          await createAppoiment(next_appoinment);
          toast.current.show({
            severity: "success",
            summary: "Exito!",
            detail: "La cita se creo correctamente",
            life: 3000,
          });
        } catch (error) {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Error! ",
            detail: "Hubo un error al crear la cita",
            life: 3000,
          });
        }
      }

      setAppoimentDialog(false);
      setAppoiment(emptyAppoiment);
    }
    onRefetch(true);
  };


  const editAppoiment = (next_appoinment) => {
    setAppoiment({ ...next_appoinment });
    setAppoimentDialog(true);
  };

  const confirmDeleteAppoiment = (next_appoinment) => {
    setAppoiment(next_appoinment);
    setDeleteAppoimentDialog(true);
  };

  const deleteAppoiment = async () => {
    try {
      await deteleAppoiment(next_appoinment.pk_appoinment);
      setDeleteAppoimentDialog(false);
      setAppoiment(emptyAppoiment);
      toast.current.show({
        severity: "success",
        summary: "Éxito!",
        detail: "Cita eliminada correctamente",
        life: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.current.show({
        severity: "error",
        summary: "Error! ",
        detail: "Hubo un error al eliminar la cita",
        life: 3000,
      });
    }
    onRefetch(true);
  };


  const onInputChange = (e, nombre) => {
    const val = (e.target && e.target.value) || "";
    let _appoiment = { ...next_appoinment };

    _appoiment[`${nombre}`] = val;

    setAppoiment(_appoiment);
  };

  const leftToolbarTemplate = () => {
    return (
      <Button
        label="Crear cita"
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
          onClick={() => editAppoiment(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteAppoiment(rowData)}
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
  const appoimentDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" onClick={saveAppoiment} />
    </React.Fragment>
  );
  const deleteAppoimentDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAppoimentDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAppoiment}
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
          value={appoiments}
          selection={selectedAppoiment}
          onSelectionChange={(e) => setSelectedAppoiment(e.value)}
          dataKey="id"
          paginator
          rows={4}
          tableClassName="border"
          rowsPerPageOptions={[4, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando registros del {first} al {last}, Total {totalRecords} registros"
          glalFilter={globalFilter}
        >
          <Column
            field="patients"
            header="Paciente"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column field="next_appoinment" header="Cita"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={appoimentDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Crear cita"
        modal
        className="p-fluid"
        footer={appoimentDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="next_appoinment" className="font-bold">
            Próxima cita
          </label>
         <CalendarTime
         id="next_appoinment"
         onChange={(e) => onInputChange(e, "next_appoinment")}
         required
         autoFocus
         showTime 
         hourFormat="24"
         className={classNames({ "p-invalid": submitted && !next_appoinment.next_appoinment })}
         />
          {submitted && !next_appoinment.next_appoinment && (
            <small className="p-error">El fecha es requerida.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="pk_patient" className="font-bold">
            Paciente
          </label>
          <InputOptionPatient
            role={next_appoinment.pk_patient}
            onSelect={(optionId) => (next_appoinment.pk_patient = optionId)}
            required
          />
          {submitted && !next_appoinment.pk_patient && (
            <small className="p-error">El paciente es requerido.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="pk_user" className="font-bold">
            Usuario
          </label>
          <InputOptionUser
            role={next_appoinment.pk_user}
            onSelect={(optionId) => (next_appoinment.pk_user = optionId)}
            required
          />
          {submitted && !next_appoinment.pk_user && (
            <small className="p-error">El usuario es requerido.</small>
          )}
        </div>

      </Dialog>

      <Dialog
        visible={deleteAppoimentDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteAppoimentDialogFooter}
        onHide={hideDeleteAppoimentDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {next_appoinment && (
            <span>
              Esta seguro de querer eliminar la cita <b>{next_appoinment.next_appoinment}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export { AppoimentTable };
