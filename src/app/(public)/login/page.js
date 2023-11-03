"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useAuthSlice } from "@/hooks";
import { Password } from "primereact/password";
import { useRouter } from "next/navigation";
import { store } from "@/store";

export default function Home() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { token, rol, inicioSesion, loading } = useAuthSlice();
  const login = async (username, password) => {
    inicioSesion({ user: username, password });
  };

  useEffect(() => {
    if (token && !loading) {
      console.log("aaaa", store.getState().auth);
      router.push("/");
    } else {
    }
  }, [token]);

  return (
    <div className="w-full">
      <div className="flex h-screen">
        <div
          style={{
            backgroundImage:
              "url('https://img.freepik.com/vector-premium/pacientes-que-esperan-hospital-clinica-al-medico-enfermera-frente-habitacion-ilustracion-personaje-dibujos-animados-plana_77116-465.jpg')",
          }}
          className=" bg-[length:150vh_100vh] flex-1"
        >
          <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          </div>
        </div>

        <div className="flex justify-between pt-26 self-center z-10 sm:mx-10 m-auto w-96 mx-20">
          <div className=" bg-white w-full px-8">
            <div className="mb-4">
              <center>
                <h3 className="font-semibold text-2xl text-gray-800 justify-center">
                  CLINICTIME{" "}
                </h3>
                <p className="text-gray-500 justify-center">
                  Por favor inicie sesión en su cuenta.
                </p>
              </center>
            </div>
            <form
              method="POST"
              onSubmit={(e) => {
                e?.preventDefault();
                login(value, password);
              }}
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="card flex justify-content-center">
                    <label className=" py-2" htmlFor="username">
                      Nombre de usuario
                    </label>
                    <InputText
                      className="px-2 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
                      id="username"
                      htmlFor="username"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Ingrese su usuario"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="card flex justify-content-center">
                    <label className="py-2" htmlFor="password">
                      Contraseña
                    </label>
                    <div className="card flex justify-content-center">
                      <Password
                        className="px-2 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        feedback={false}
                        placeholder="Ingrese su contraseña"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    label="Sign In"
                    type="submit"
                    className="w-full flex justify-center bg-indigo-400  hover:bg-indigo-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  ></Button>
                </div>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © CLINICTIME-2023
                <a
                  href="https://codepen.io/uidesignhub"
                  rel=""
                  target="_blank"
                  title="Ajimon"
                  className="text-green hover:text-indigo-500 "
                ></a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
