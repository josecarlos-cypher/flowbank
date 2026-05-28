import {
  House,
  User,
  LogOut
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Menu() {

  const navigate = useNavigate();

  function sair() {

    localStorage.removeItem(
      "usuario"
    );

    navigate("/");

  }

  return (

    <nav
      className="
        fixed
        bottom-0
        left-0
        w-full
        bg-slate-800/90
        backdrop-blur-lg
        border-t
        border-slate-700
        flex
        justify-around
        items-center
        p-4
      "
    >

      <Link
        to="/dashboard"
        className="
          flex
          flex-col
          items-center
          text-slate-300
        "
      >

        <House size={24} />

        <span className="text-sm">
          Home
        </span>

      </Link>

      <Link
        to="/perfil"
        className="
          flex
          flex-col
          items-center
          text-slate-300
        "
      >

        <User size={24} />

        <span className="text-sm">
          Perfil
        </span>

      </Link>

      <button
        onClick={sair}
        className="
          flex
          flex-col
          items-center
          text-red-400
        "
      >

        <LogOut size={24} />

        <span className="text-sm">
          Sair
        </span>

      </button>

    </nav>

  );

}

export default Menu;