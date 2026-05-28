import {
  Home,
  Wallet,
  CreditCard,
  LogOut,
  Trash2,
  X,
  Plus,
  Wifi,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  if (!usuario) {
    navigate("/login");
  }

  // CHAVES INDIVIDUAIS POR USUÁRIO
  const chaveTransacoes =
    `transacoes_${usuario?.email}`;

  const chaveCartoes =
    `cartoes_${usuario?.email}`;

  const [transacoes, setTransacoes] = useState(() => {
    const dados = localStorage.getItem(chaveTransacoes);
    return dados ? JSON.parse(dados) : [];
  });
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [aba, setAba] = useState("inicio");

  const [cartoes, setCartoes] = useState(() => {
    const dadosCartoes = localStorage.getItem(chaveCartoes);
    return dadosCartoes ? JSON.parse(dadosCartoes) : [];
  });
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [cvv, setCvv] = useState("");

  // COTAÇÕES
  const [usd, setUsd] = useState("");
  const [eur, setEur] = useState("");
  const [btc, setBtc] = useState("");

  // SALVAR TRANSAÇÕES
  useEffect(() => {
    localStorage.setItem(
      chaveTransacoes,
      JSON.stringify(transacoes)
    );
  }, [transacoes, chaveTransacoes]);

  // SALVAR CARTÕES
  useEffect(() => {
    localStorage.setItem(
      chaveCartoes,
      JSON.stringify(cartoes)
    );
  }, [cartoes, chaveCartoes]);

  // BUSCAR COTAÇÕES
  useEffect(() => {
    async function buscarCotacoes() {

      try {

        const response = await fetch(
          "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"
        );

        const data = await response.json();

        setUsd(data.USDBRL.bid);
        setEur(data.EURBRL.bid);
        setBtc(data.BTCBRL.bid);

      } catch (error) {
        console.log(error);
      }
    }

    buscarCotacoes();
  }, []);

  function adicionarTransacao() {

    if (
      nome === "" ||
      valor === ""
    ) {
      alert("Preencha os campos");
      return false;
    }

    const nova = {
      id: Date.now(),
      nome,
      valor: Number(valor),
      data: new Date().toLocaleDateString("pt-BR")
    };

    setTransacoes([
      nova,
      ...transacoes
    ]);

    setNome("");
    setValor("");

    return true;
  }

  function removerTransacao(id) {
    setTransacoes(
      transacoes.filter(
        item =>
          item.id !== id
      )
    );
  }

  function formatarNumero(numero) {
    return numero
      .replace(/\D/g, "")
      .replace(
        /(\d{4})(?=\d)/g,
        "$1 "
      );
  }

  function detectarBandeira(numero) {

    const n =
      numero.replace(/\s/g, "");

    if (/^4/.test(n))
      return "VISA";

    if (/^5[1-5]/.test(n))
      return "MASTERCARD";

    if (/^3[47]/.test(n))
      return "AMEX";

    return "CARD";
  }

  function adicionarCartao() {

    const numeroLimpo =
      numeroCartao.replace(
        /\D/g,
        ""
      );

    if (
      numeroLimpo.length !== 16
    ) {
      alert(
        "O cartão precisa ter 16 dígitos."
      );
      return;
    }

    if (
      vencimento.length !== 5
    ) {
      alert(
        "Digite o vencimento no formato MM/AA."
      );
      return;
    }

    if (
      cvv.length !== 3
    ) {
      alert(
        "O CVV precisa ter 3 dígitos."
      );
      return;
    }

    if (
      nomeCartao === ""
    ) {
      alert(
        "Digite o nome do cartão."
      );
      return;
    }

    const novo = {
      id: Date.now(),

      numero:
        formatarNumero(
          numeroLimpo
        ),

      nome:
        nomeCartao.toUpperCase(),

      vencimento,
      cvv,

      bandeira:
        detectarBandeira(
          numeroLimpo
        ),

      verso: false
    };

    setCartoes([
      novo,
      ...cartoes
    ]);

    setNumeroCartao("");
    setNomeCartao("");
    setVencimento("");
    setCvv("");
  }

  function removerCartao(id) {
    setCartoes(
      cartoes.filter(
        item =>
          item.id !== id
      )
    );
  }

  function virarCartao(id) {
    setCartoes(
      cartoes.map(item =>
        item.id === id
          ? {
            ...item,
            verso:
              !item.verso
          }
          : item
      )
    );
  }

  function sair() {

    localStorage.removeItem(
      "usuario"
    );

    navigate("/login");
  }

  const saldo =
    transacoes.reduce(
      (
        total,
        item
      ) =>
        total +
        item.valor,
      0
    );

  const receitas =
    transacoes
      .filter(
        item =>
          item.valor > 0
      )
      .reduce(
        (
          t,
          item
        ) =>
          t +
          item.valor,
        0
      );

  const gastos =
    transacoes
      .filter(
        item =>
          item.valor < 0
      )
      .reduce(
        (
          t,
          item
        ) =>
          t +
          item.valor,
        0
      );

  return (
    <div className="min-h-[100dvh] overflow-y-auto bg-[#020617] text-white flex flex-col lg:flex-row">

      {/* SIDEBAR */}

      <aside className="w-full lg:w-[280px] bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col justify-between">

        <div>

          <div className="flex items-center gap-4 mb-14">

            <img
              src="/logo.png"
              alt="FlowBank"
              className="w-16 h-16 object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold">
                FlowBank
              </h1>

              <p className="text-slate-400 text-sm">
                Banco digital
              </p>
            </div>
          </div>

          <nav className="space-y-3">

            <button
              onClick={() =>
                setAba("inicio")
              }
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition ${aba === "inicio"
                ? "bg-emerald-400 text-slate-950 font-semibold"
                : "hover:bg-slate-800"
                }`}
            >
              <Home size={22} />
              Início
            </button>

            <button
              onClick={() =>
                setAba("transacoes")
              }
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition ${aba === "transacoes"
                ? "bg-emerald-400 text-slate-950 font-semibold"
                : "hover:bg-slate-800"
                }`}
            >
              <Wallet size={22} />
              Transações
            </button>

            <button
              onClick={() =>
                setAba("cartoes")
              }
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition ${aba === "cartoes"
                ? "bg-emerald-400 text-slate-950 font-semibold"
                : "hover:bg-slate-800"
                }`}
            >
              <CreditCard size={22} />
              Cartões
            </button>

          </nav>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 mt-10">

          <p className="text-slate-400 text-sm">
            Conta conectada
          </p>

          <h3 className="font-semibold text-lg mt-2 break-all">
            {usuario?.nome ||
              "Usuário"}
          </h3>

          <button
            onClick={sair}
            className="mt-5 w-full bg-red-500/20 hover:bg-red-500 transition p-3 rounded-2xl flex items-center justify-center gap-3 text-red-400 hover:text-white font-semibold"
          >
            <LogOut size={18} />
            Sair da conta
          </button>

        </div>
      </aside>

      {/* MAIN */}

      <main className="flex-1 p-6 lg:p-10">

        {aba === "inicio" && (
          <>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

              <div>

                <p className="text-slate-400 mb-2">
                  Painel financeiro
                </p>

                <h2 className="text-4xl font-bold">
                  Dashboard
                </h2>

              </div>

              <button
                onClick={() =>
                  setAbrirModal(true)
                }
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold px-6 py-4 rounded-2xl"
              >
                Nova Transação
              </button>

            </div>

            {/* COTAÇÕES */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

              <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-6">

                <div className="flex items-center gap-3 mb-4">

                  <TrendingUp className="text-emerald-400" />

                  <h3 className="font-bold text-lg">
                    Dólar
                  </h3>

                </div>

                <p className="text-3xl font-black text-emerald-400">
                  R$ {
                    usd
                      ? Number(usd).toFixed(2)
                      : "--"
                  }
                </p>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-6">

                <div className="flex items-center gap-3 mb-4">

                  <TrendingUp className="text-cyan-400" />

                  <h3 className="font-bold text-lg">
                    Euro
                  </h3>

                </div>

                <p className="text-3xl font-black text-cyan-400">
                  R$ {
                    eur
                      ? Number(eur).toFixed(2)
                      : "--"
                  }
                </p>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-6">

                <div className="flex items-center gap-3 mb-4">

                  <TrendingUp className="text-yellow-400" />

                  <h3 className="font-bold text-lg">
                    Bitcoin
                  </h3>

                </div>

                <p className="text-2xl font-black text-yellow-400">
                  R$ {
                    btc
                      ? Number(btc).toLocaleString("pt-BR")
                      : "--"
                  }
                </p>

              </div>

            </div>

            {/* CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

              <div className="bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-[32px] p-8 text-slate-950">

                <p className="font-medium mb-3">
                  Saldo disponível
                </p>

                <h3 className="text-4xl font-black">
                  R$ {saldo.toFixed(2)}
                </h3>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">

                <p className="text-slate-400 mb-4">
                  Receitas
                </p>

                <h3 className="text-3xl font-bold text-emerald-400">
                  + R$ {receitas.toFixed(2)}
                </h3>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">

                <p className="text-slate-400 mb-4">
                  Gastos
                </p>

                <h3 className="text-3xl font-bold text-red-400">
                  R$ {gastos.toFixed(2)}
                </h3>

              </div>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">
              <h3 className="text-2xl font-bold mb-8">
                Últimas transações
              </h3>

              <div className="space-y-5">
                {transacoes
                  .slice(0, 3)
                  .map(
                    item => (
                      <div
                        key={
                          item.id
                        }
                        className="flex justify-between bg-slate-800 rounded-2xl p-5"
                      >
                        <span>
                          {
                            item.nome
                          }
                        </span>

                        <span>
                          R$ {
                            item.valor
                          }
                        </span>
                      </div>
                    )
                  )}
              </div>
            </div>
          </>
        )}

        {aba ===
          "transacoes" && (
            <div className="bg-slate-900 rounded-[32px] p-8">
              <div className="flex justify-between mb-8">
                <h3 className="text-2xl font-bold">
                  Todas as transações
                </h3>

                <button
                  onClick={() =>
                    setAbrirModal(
                      true
                    )
                  }
                  className="bg-emerald-400 text-black px-5 py-3 rounded-2xl flex gap-2 font-semibold"
                >
                  <Plus size={18} />
                  Nova
                </button>
              </div>

              <div className="space-y-4">
                {transacoes.map(
                  item => (
                    <div
                      key={
                        item.id
                      }
                      className="flex justify-between items-center bg-slate-800 rounded-2xl p-5"
                    >
                      <span>
                        {
                          item.nome
                        }
                      </span>

                      <div className="flex items-center gap-4">
                        <span
                          className={
                            item.valor >
                              0
                              ? "text-emerald-400 font-bold"
                              : "text-red-400 font-bold"
                          }
                        >
                          R$ {
                            item.valor
                          }
                        </span>

                        <button
                          onClick={() =>
                            removerTransacao(
                              item.id
                            )
                          }
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2
                            size={18}
                          />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {aba ===
          "cartoes" && (
            <div className="bg-slate-900 rounded-[32px] p-8">
              <h3 className="text-3xl font-bold mb-8">
                Meus cartões
              </h3>

              <div className="grid xl:grid-cols-[1fr_320px] gap-6">
                <div>
                  <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {cartoes.map(
                      item => (
                        <div
                          key={
                            item.id
                          }
                        >
                          {!item.verso ? (
                            <div className="relative overflow-y-auto rounded-[32px] border border-cyan-400/40 bg-gradient-to-br from-[#001b74] via-[#02145e] to-[#020617] p-8 h-[260px] shadow-[0_0_40px_rgba(0,255,255,0.15)]">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.20),transparent_45%)]" />

                              <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h2 className="text-4xl font-bold">
                                      FlowBank
                                    </h2>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-xs tracking-[2px]">
                                      CREDIT CARD
                                    </span>

                                    <Wifi
                                      size={20}
                                      className="rotate-90"
                                    />
                                  </div>
                                </div>

                                <div className="w-20 h-14 rounded-xl bg-gradient-to-br from-yellow-200 to-yellow-600 border border-yellow-500" />

                                <p className="text-3xl tracking-[5px] font-mono font-bold">
                                  {
                                    item.numero
                                  }
                                </p>

                                <div className="flex justify-between items-end">
                                  <div>
                                    <p className="text-xs text-slate-300">
                                      VALID THRU
                                    </p>

                                    <p className="text-2xl tracking-widest">
                                      {
                                        item.vencimento
                                      }
                                    </p>

                                    <p className="mt-2 text-lg tracking-[3px] uppercase">
                                      {
                                        item.nome
                                      }
                                    </p>
                                  </div>

                                  <div>
                                    {item.bandeira ===
                                      "VISA" && (
                                        <p className="text-3xl font-bold italic">
                                          VISA
                                        </p>
                                      )}

                                    {item.bandeira ===
                                      "MASTERCARD" && (
                                        <div className="flex items-center">
                                          <div className="w-12 h-12 rounded-full bg-red-500 opacity-90" />

                                          <div className="w-12 h-12 rounded-full bg-yellow-400 opacity-90 -ml-4" />
                                        </div>
                                      )}

                                    {item.bandeira ===
                                      "AMEX" && (
                                        <p className="text-2xl font-bold text-cyan-300">
                                          AMEX
                                        </p>
                                      )}

                                    {item.bandeira ===
                                      "CARD" && (
                                        <p className="text-2xl font-bold">
                                          CARD
                                        </p>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-[32px] border border-cyan-400/40 bg-gradient-to-br from-[#001b74] via-[#02145e] to-[#020617] h-[260px] overflow-y-auto">
                              <div className="h-14 bg-black mt-8" />

                              <div className="px-8 mt-8">
                                <div className="bg-white rounded-lg h-12 flex items-center justify-end px-4">
                                  <span className="text-black text-2xl italic font-bold tracking-[4px]">
                                    {
                                      item.cvv
                                    }
                                  </span>
                                </div>

                                <p className="text-slate-300 text-sm mt-8 leading-7">
                                  Este cartão é de uso pessoal e intransferível.
                                  <br />
                                  Em caso de perda ou roubo,
                                  entre em contato com o suporte do FlowBank.
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() =>
                                virarCartao(
                                  item.id
                                )
                              }
                              className="flex-1 bg-cyan-500 hover:bg-cyan-400 transition rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
                            >
                              <RotateCcw
                                size={18}
                              />

                              Ver{" "}
                              {item.verso
                                ? "frente"
                                : "verso"}
                            </button>

                            <button
                              onClick={() =>
                                removerCartao(
                                  item.id
                                )
                              }
                              className="bg-red-500 hover:bg-red-400 transition px-5 rounded-2xl"
                            >
                              <Trash2
                                size={18}
                              />
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="bg-slate-800 rounded-[32px] p-8 border border-slate-700">
                    <h3 className="text-2xl font-bold mb-8">
                      Adicionar cartão
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">
                      <input
                        maxLength={19}
                        value={
                          numeroCartao
                        }
                        onChange={e => {
                          const valor =
                            e.target.value
                              .replace(
                                /\D/g,
                                ""
                              )
                              .slice(
                                0,
                                16
                              );

                          setNumeroCartao(
                            formatarNumero(
                              valor
                            )
                          );
                        }}
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-400"
                      />

                      <input
                        value={
                          nomeCartao
                        }
                        onChange={e =>
                          setNomeCartao(
                            e.target
                              .value
                          )
                        }
                        placeholder="Nome no cartão"
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-400"
                      />

                      <input
                        maxLength={5}
                        value={
                          vencimento
                        }
                        onChange={e => {
                          let valor =
                            e.target.value.replace(
                              /\D/g,
                              ""
                            );

                          if (
                            valor.length >
                            2
                          ) {
                            valor = `${valor.slice(
                              0,
                              2
                            )}/${valor.slice(
                              2,
                              4
                            )}`;
                          }

                          setVencimento(
                            valor
                          );
                        }}
                        placeholder="MM/AA"
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-400"
                      />

                      <input
                        maxLength={3}
                        value={cvv}
                        onChange={e =>
                          setCvv(
                            e.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="CVV"
                        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-emerald-400"
                      />
                    </div>

                    <button
                      onClick={
                        adicionarCartao
                      }
                      className="w-full mt-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold p-4 rounded-2xl"
                    >
                      Adicionar cartão
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-[32px] p-8 h-fit">
                  <h3 className="text-2xl font-bold mb-8 text-emerald-400">
                    Como funciona?
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-black flex items-center justify-center">
                        <CheckCircle2 />
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1">
                          Adicione seu cartão
                        </h4>

                        <p className="text-slate-400 text-sm leading-6">
                          O número precisa conter 16 dígitos válidos.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-black flex items-center justify-center">
                        <ShieldCheck />
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1">
                          Dados protegidos
                        </h4>

                        <p className="text-slate-400 text-sm leading-6">
                          Seus dados estão seguros e criptografados.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-400 text-black flex items-center justify-center">
                        <CreditCard />
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1">
                          Visual moderno
                        </h4>

                        <p className="text-slate-400 text-sm leading-6">
                          Veja frente e verso do cartão com animação.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

      </main>

      {abrirModal && (
        <div className="fixed inset-0 overflow-y-auto bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-lg bg-slate-900 rounded-[32px] p-8">
            <div className="flex justify-between mb-8">
              <h3 className="text-3xl font-bold">
                Nova Transação
              </h3>

              <button
                onClick={() =>
                  setAbrirModal(
                    false
                  )
                }
              >
                <X />
              </button>
            </div>

            <div className="space-y-5">
              <input
                value={nome}
                onChange={e =>
                  setNome(
                    e.target
                      .value
                  )
                }
                placeholder="Nome"
                className="w-full bg-slate-800 p-4 rounded-2xl"
              />

              <input
                value={valor}
                onChange={e =>
                  setValor(
                    e.target
                      .value
                  )
                }
                placeholder="Valor"
                className="w-full bg-slate-800 p-4 rounded-2xl"
              />

              <button
                onClick={() => {
                  const ok =
                    adicionarTransacao();

                  if (ok) {
                    setAbrirModal(
                      false
                    );
                  }
                }}
                className="w-full bg-emerald-400 text-black p-4 rounded-2xl"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;