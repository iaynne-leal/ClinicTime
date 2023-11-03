"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = (props) => {
  const [show, setShow] = useState(true);
  const handleShow = (e) => {
    setShow(!show);
    props?.onShow(show);
    return;
  };

  const router = useRouter();
  const logout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 px-5 flex justify-between">
      <div className="btn btn-ghost cursor-pointer" onClick={handleShow}>
        <a className="normal-case text-xl">CLINICTIME</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pinimg.com/originals/12/ed/03/12ed03a7b8fcd3d46cb384b41ff44135.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Perfil</a>
            </li>
            <li>
              <a onClick={logout}>Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
