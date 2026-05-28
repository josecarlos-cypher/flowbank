import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";

function Perfil() {

  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  if (!usuario) {
    navigate("/");
  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-950
        text-white
        p-6
        pb-28
      "
    >

      <h1
        className="
          text-3xl
          font-bold
          text-emerald-400
          mb-8
        "
      >
        Meu Perfil
      </h1>

      <section
        className="
          bg-slate-800
          rounded-3xl
          p-6
          flex
          flex-col
          items-center
          text-center
          shadow-2xl
          mb-6
        "
      >

        <div
          className="
            w-28
            h-28
            rounded-full
            bg-emerald-400
            flex
            items-center
            justify-center
            text-slate-900
            text-4xl
            font-bold
            mb-4
          "
        >
          {
            usuario?.email
              ?.charAt(0)
              ?.toUpperCase()
          }
        </div>

        <h2
          className="
            text-2xl
            font-bold
            mb-2
          "
        >
          Usuário FlowBank
        </h2>

        <p className="text-slate-400">
          {usuario?.email}
        </p>

      </section>

      <section
        className="
          bg-slate-800
          rounded-3xl
          p-5
          flex
          flex-col
          gap-4
        "
      >

        <div
          className="
            bg-slate-700
            p-4
            rounded-2xl
          "
        >
          Segurança da Conta
        </div>

        <div
          className="
            bg-slate-700
            p-4
            rounded-2xl
          "
        >
          Cartões e Pagamentos
        </div>

        <div
          className="
            bg-slate-700
            p-4
            rounded-2xl
          "
        >
          Configurações
        </div>

        <div
          className="
            bg-slate-700
            p-4
            rounded-2xl
          "
        >
          Ajuda e Suporte
        </div>

      </section>

      <Menu />

    </div>

  );

}

export default Perfil;