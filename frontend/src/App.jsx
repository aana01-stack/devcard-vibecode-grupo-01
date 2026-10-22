import { useEffect, useState } from "react";
import "./App.css";

// A API fica na mesma origem do site, entao usamos rotas relativas.
// Funciona tanto no dev (Vite) quanto no deploy (Render).
function App() {
  const [curtidas, setCurtidas] = useState(0);
  const [perfil, setPerfil] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [contato, setContato] = useState(null);
  const [frase, setFrase] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [escuro, setEscuro] = useState(true);
  const [classeFrase, setClasseFrase] = useState("");
  const [classeContador, setClasseContador] = useState("");

  useEffect(() => {
    if (escuro) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  }, [escuro]);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      // /api/devcard devolve perfil, habilidades, projetos e uma frase de uma vez.
      const respostaDevcard = await fetch("/api/devcard");
      const respostaCurtidas = await fetch("/api/curtidas");
      const respostaContato = await fetch("/api/contato");

      const dadosDevcard = await respostaDevcard.json();
      const dadosCurtidas = await respostaCurtidas.json();
      const dadosContato = await respostaContato.json();

      setPerfil(dadosDevcard.perfil);
      setHabilidades(dadosDevcard.habilidades);
      setProjetos(dadosDevcard.projetos);
      setFrase(dadosDevcard.fraseInicial);
      setCurtidas(dadosCurtidas.curtidas);
      setContato(dadosContato);
    } catch (error) {
      setErro("Nao foi possivel conectar com a API. Verifique se o back-end esta rodando.");
    } finally {
      setCarregando(false);
    }
  }

  async function gerarNovaFrase() {
    try {
      setErro("");
      setClasseFrase("frase-saindo");

      setTimeout(async () => {
        try {
          const resposta = await fetch("/api/frase");
          const dados = await resposta.json();

          setFrase(dados.frase);
          setClasseFrase("frase-entrando");

          setTimeout(() => setClasseFrase(""), 400);
        } catch (error) {
          setErro("Erro ao buscar nova frase.");
          setClasseFrase("");
        }
      }, 300);
    } catch (error) {
      setErro("Erro ao buscar nova frase.");
      setClasseFrase("");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <main className="pagina">
      <div className="patrono-cena" aria-hidden="true">

        {/* PARTICULAS MAGICAS */}
        <div className="magic-particles">
          {[...Array(35)].map((_, i) => (
            <div key={i} className={`magic-particle mp-${i % 5}`} style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${6 + Math.random() * 12}s`
            }}/>
          ))}
        </div>
      </div>

      <section className="card">
        <div className="cabecalho">
          <p className="etiqueta">DevCard VibeCode</p>

          <button
            className="botao-tema"
            onClick={() => setEscuro(!escuro)}
            title={escuro ? "Mudar para modo claro" : "Mudar para modo escuro"}
          >
            {escuro ? "☀️" : "🌙"}
          </button>
        </div>

        <h1>{perfil ? perfil.nome : "Carregando perfil..."}</h1>

        {perfil && (
          <>
            <p className="apelido">{perfil.apelido}</p>

            <p className="descricao">
              <strong>Turma:</strong> {perfil.turma}
            </p>

            <p className="descricao">
              <strong>Area:</strong> {perfil.area}
            </p>

            <p className="descricao">
              <strong>Status:</strong> {perfil.status}
            </p>

            <p className="descricao bio">{perfil.bio}</p>
          </>
        )}

        <div className="contador">
          <span>Curtidas no projeto:</span>
          <strong className={classeContador}>{curtidas}</strong>
        </div>

        <button className="botao-curtir" onClick={async () => {
          try {
            setClasseContador("");
            const resposta = await fetch("/api/curtidas", { method: "POST" });
            const dados = await resposta.json();
            setCurtidas(dados.curtidas);
            setClasseContador("pulando");
            setTimeout(() => setClasseContador(""), 400);
          } catch (error) {
            setErro("Erro ao curtir o projeto.");
          }
        }}>
          <span className="coracao">❤️</span>
          Curtir projeto
        </button>

        <div className="bloco">
          <h2>Frase da API</h2>

          {carregando ? (
            <p className="descricao">Buscando dados...</p>
          ) : (
            <p className={`frase ${classeFrase}`}>{frase}</p>
          )}

          <button className="botao-secundario" onClick={gerarNovaFrase}>
            Gerar nova frase
          </button>
        </div>

        <div className="bloco">
          <h2>Habilidades da etapa</h2>

          <ul>
            {habilidades.map((habilidade, index) => (
              <li key={index}>
                <strong>{habilidade.nome}</strong> — {habilidade.nivel}
                <p className="descricao-habilidade">{habilidade.descricao}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bloco">
          <h2>Projetos</h2>

          <ul>
            {projetos.map((projeto, index) => (
              <li key={index}>
                <strong>{projeto.nome}</strong> <span className="tipo-projeto">{projeto.tipo}</span>
                <p className="descricao-projeto">{projeto.descricao}</p>
              </li>
            ))}
          </ul>
        </div>

        {contato && (
          <div className="bloco">
            <h2>Contato</h2>

            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a className="link-contato" href={`mailto:${contato.email}`}>
                  {contato.email}
                </a>
              </li>
              <li>
                <strong>GitHub:</strong>{" "}
                <a className="link-contato" href={contato.github} target="_blank" rel="noreferrer">
                  {contato.github}
                </a>
              </li>
              <li>
                <strong>LinkedIn:</strong>{" "}
                <a className="link-contato" href={contato.linkedin} target="_blank" rel="noreferrer">
                  {contato.linkedin}
                </a>
              </li>
            </ul>
          </div>
        )}

        {erro && <p className="erro">{erro}</p>}
      </section>
    </main>
  );
}

export default App;
