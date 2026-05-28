import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Onboarding() {

  const navigate = useNavigate();

  const handleScroll = () => {

    const section =
      document.getElementById("recursos");

    if (section) {

      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });

    }

  };

  return (

    <div
      className="
        bg-[#020617]
        text-white
        relative
        overflow-x-hidden
      "
    >

      {/* EFEITOS */}

      <div
        className="
          absolute
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          bg-emerald-500/20
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[-200px]
          right-[-200px]
          w-[500px]
          h-[500px]
          bg-cyan-500/20
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />

      {/* HERO */}

      <section
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-6
          relative
          z-10
        "
      >

        <div
          className="
            w-full
            max-w-7xl
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >

          {/* ESQUERDA */}

          <motion.div

            initial={{ opacity: 0, x: -40 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.8 }}

          >

            {/* LOGO */}

            <div
              className="
                flex
                items-center
                gap-5
                mb-12
              "
            >

              <img
                src="/logo.png"
                alt="FlowBank"
                className="
                  w-20
                  h-20
                  object-contain
                "
              />

              <div>

                <h1
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  FlowBank
                </h1>

                <p
                  className="
                    text-slate-400
                    text-lg
                  "
                >
                  Banco digital inteligente
                </p>

              </div>

            </div>

            {/* TÍTULO */}

            <h2
              className="
                text-6xl
                lg:text-7xl
                font-black
                leading-tight
                mb-8
              "
            >
              Seu banco digital{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-emerald-400
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                do futuro
              </span>

            </h2>

            {/* TEXTO */}

            <p
              className="
                text-slate-300
                text-xl
                leading-relaxed
                max-w-2xl
                mb-10
              "
            >
              Controle gastos, faça transferências,
              acompanhe investimentos e organize
              sua vida financeira em um aplicativo
              moderno, rápido e seguro.
            </p>

            {/* BOTÕES */}

            <div
              className="
                flex
                flex-wrap
                gap-5
                mb-10
              "
            >

              <button

                onClick={() =>
                  navigate("/login")
                }

                className="
                  bg-gradient-to-r
                  from-emerald-400
                  to-cyan-400
                  text-slate-950
                  font-bold
                  px-8
                  py-4
                  rounded-2xl
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-xl
                  shadow-emerald-500/20
                "
              >
                Entrar no FlowBank
              </button>

              {/* BOTÃO SCROLL */}

              <button

                onClick={handleScroll}

                className="
                  border
                  border-slate-700
                  bg-slate-900/50
                  px-8
                  py-4
                  rounded-2xl
                  hover:bg-slate-800
                  hover:border-cyan-400/50
                  transition-all
                  duration-300
                "
              >
                Conhecer recursos
              </button>

            </div>

            {/* FEATURES */}

            <div
              className="
                flex
                flex-wrap
                gap-8
                text-slate-400
              "
            >

              <span>✓ Pix instantâneo</span>

              <span>✓ Cartão virtual</span>

              <span>✓ Segurança avançada</span>

            </div>

          </motion.div>

          {/* DIREITA */}

          <motion.div

            initial={{ opacity: 0, x: 40 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.8 }}

            className="
              flex
              justify-center
            "
          >

            <div
              className="
                relative
                w-full
                max-w-md
              "
            >

              <div
                className="
                  bg-gradient-to-br
                  from-slate-900
                  to-slate-800
                  border
                  border-slate-700
                  rounded-[40px]
                  p-10
                  shadow-2xl
                "
              >

                <img
                  src="/logo.png"
                  alt="FlowBank"
                  className="
                    w-24
                    h-24
                    object-contain
                    mx-auto
                    mb-10
                  "
                />

                <h3
                  className="
                    text-4xl
                    font-bold
                    text-center
                    mb-6
                  "
                >
                  Flow Bank
                </h3>

                <p
                  className="
                    text-slate-400
                    text-center
                    leading-relaxed
                    mb-10
                  "
                >
                  Experiência premium para quem
                  quer controle financeiro total.
                </p>

                <div className="space-y-5">

                  <div
                    className="
                      bg-slate-800
                      border
                      border-slate-700
                      rounded-2xl
                      p-5
                    "
                  >

                    <h4 className="font-semibold mb-1">
                      Pix instantâneo
                    </h4>

                    <p className="text-slate-400">
                      Transferências rápidas
                    </p>

                  </div>

                  <div
                    className="
                      bg-slate-800
                      border
                      border-slate-700
                      rounded-2xl
                      p-5
                    "
                  >

                    <h4 className="font-semibold mb-1">
                      Cartão virtual
                    </h4>

                    <p className="text-slate-400">
                      Mais segurança online
                    </p>

                  </div>

                  <div
                    className="
                      bg-slate-800
                      border
                      border-slate-700
                      rounded-2xl
                      p-5
                    "
                  >

                    <h4 className="font-semibold mb-1">
                      Investimentos
                    </h4>

                    <p className="text-slate-400">
                      Controle total do dinheiro
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* RECURSOS */}

      <section
        id="recursos"
        className="
          py-32
          px-6
          relative
          z-10
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* TÍTULO */}

          <div className="text-center mb-20">

            <h2
              className="
                text-5xl
                lg:text-6xl
                font-black
                mb-6
              "
            >
              Recursos do{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-emerald-400
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                FlowBank
              </span>

            </h2>

            <p
              className="
                text-slate-400
                text-xl
                max-w-3xl
                mx-auto
                leading-relaxed
              "
            >
              Um banco digital moderno com
              tecnologia inteligente para facilitar
              sua vida financeira todos os dias.
            </p>

          </div>

          {/* CARDS */}

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {[
              {
                icon: "⚡",
                title: "Pix Inteligente",
                desc: "Transferências instantâneas e agendamentos.",
              },
              {
                icon: "💳",
                title: "Cartão Virtual",
                desc: "Mais segurança para compras online.",
              },
              {
                icon: "📈",
                title: "Investimentos",
                desc: "Controle total da sua evolução financeira.",
              },
              {
                icon: "🔒",
                title: "Segurança",
                desc: "Proteção avançada e autenticação segura.",
              },
              {
                icon: "📊",
                title: "Controle Financeiro",
                desc: "Acompanhe despesas e relatórios.",
              },
              {
                icon: "🌎",
                title: "100% Digital",
                desc: "Acesse de qualquer lugar do mundo.",
              },
            ].map((item, index) => (

              <motion.div

                key={index}

                initial={{ opacity: 0, y: 40 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                viewport={{ once: true }}

                className="
                  bg-slate-900/70
                  border
                  border-slate-800
                  rounded-3xl
                  p-8
                  hover:border-cyan-400/40
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-cyan-400/10
                    flex
                    items-center
                    justify-center
                    text-3xl
                    mb-6
                  "
                >
                  {item.icon}
                </div>

                <h3
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </div>

  );
}

export default Onboarding;