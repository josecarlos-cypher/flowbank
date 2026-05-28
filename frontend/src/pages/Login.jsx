import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  async function entrar() {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response =
        await api.post(
          "/auth/login",
          {
            email,
            senha,
          }
        );

      /*
        SALVAR USUÁRIO
      */
      localStorage.setItem(
        "usuario",
        JSON.stringify(
          response.data.usuario
        )
      );

      /*
        SALVAR TOKEN
      */
      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.msg ||
          "Erro ao entrar"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[40px] border border-slate-800 bg-slate-900 shadow-2xl">
        {/* ESQUERDA */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-14 text-white">
          <div>
            <img
              src="/logo.png"
              alt="FlowBank"
              className="w-28 mb-8"
            />

            <h1 className="text-6xl font-black mb-6">
              FlowBank
            </h1>

            <p className="text-xl text-slate-300 max-w-md">
              Entre na sua conta e
              acompanhe tudo em tempo
              real.
            </p>
          </div>
        </div>

        {/* DIREITA */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h2 className="text-5xl font-black text-white mb-3">
              Entrar
            </h2>

            <p className="text-slate-400 mb-8">
              Acesse sua conta
            </p>

            <div className="space-y-5">
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 text-white"
              />

              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 text-white"
              />

              <button
                onClick={entrar}
                className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold p-5 rounded-2xl"
              >
                Entrar
              </button>
            </div>

            <div className="mt-8 text-center text-slate-400">
              Não possui conta?

              <Link
                to="/cadastro"
                className="text-emerald-400 font-semibold ml-2"
              >
                Criar conta
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;