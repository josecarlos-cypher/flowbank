import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar() {
    if (!nome || !email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const usuario = {
      nome,
      email,
      senha,
    };

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuario)
    );

    alert("Conta criada com sucesso");

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[40px] border border-slate-800 bg-slate-900 shadow-2xl">
        {/* ESQUERDA */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-14 text-white">
          <div>
            <div className="mb-8">
              <img
                src="/logo.png"
                alt="FlowBank"
                className="w-28 object-contain"
              />
            </div>

            <h1 className="text-6xl font-black leading-tight mb-6">
              FlowBank
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed max-w-md">
              Crie sua conta digital e
              comece a controlar sua vida
              financeira com segurança.
            </p>
          </div>

          <div className="bg-slate-800 rounded-3xl p-7">
            <p className="font-bold text-lg mb-3">
              Segurança bancária
            </p>

            <p className="text-slate-400 leading-relaxed">
              Proteção avançada e acesso
              rápido ao seu dinheiro.
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
            transition={{
              duration: 0.6,
            }}
          >
            <div className="mb-10">
              <div className="mb-6 lg:hidden">
                <img
                  src="/logo.png"
                  alt="FlowBank"
                  className="w-20 object-contain"
                />
              </div>

              <h2 className="text-5xl font-black text-white mb-3">
                Criar conta
              </h2>

              <p className="text-slate-400 text-lg">
                Abra sua conta digital
              </p>
            </div>

            <div className="space-y-5">
              {/* NOME */}
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) =>
                  setNome(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 text-white outline-none focus:border-emerald-400"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 text-white outline-none focus:border-emerald-400"
              />

              {/* SENHA */}
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 text-white outline-none focus:border-emerald-400"
              />

              <button
                onClick={cadastrar}
                className="w-full bg-gradient-to-r from-emerald-400 to-cyan-400 hover:scale-[1.02] transition-all text-slate-950 font-bold p-5 rounded-2xl text-lg"
              >
                Criar conta
              </button>
            </div>

            <div className="mt-8 text-center text-slate-400">
              Já possui conta?

              <Link
                to="/login"
                className="text-emerald-400 font-semibold ml-2"
              >
                Entrar
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;