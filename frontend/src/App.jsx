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
        <div className="patrono-dog">
          <svg viewBox="0 0 560 440" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="furWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAFAF5"/>
                <stop offset="40%" stopColor="#F5F0E8"/>
                <stop offset="100%" stopColor="#EDE8DC"/>
              </linearGradient>
              <linearGradient id="furBrown" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5E3C"/>
                <stop offset="35%" stopColor="#7A4F30"/>
                <stop offset="70%" stopColor="#6B4226"/>
                <stop offset="100%" stopColor="#5A3620"/>
              </linearGradient>
              <linearGradient id="furBrownDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6B4226"/>
                <stop offset="100%" stopColor="#4A2E18"/>
              </linearGradient>
              <linearGradient id="furTan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A574"/>
                <stop offset="100%" stopColor="#C4956A"/>
              </linearGradient>
              <linearGradient id="bellyFur" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5F0E8"/>
                <stop offset="100%" stopColor="#EDE5D8"/>
              </linearGradient>
              <radialGradient id="noseShine" cx="45%" cy="35%" r="50%">
                <stop offset="0%" stopColor="#4A4A4A"/>
                <stop offset="70%" stopColor="#2A2A2A"/>
                <stop offset="100%" stopColor="#1A1A1A"/>
              </radialGradient>
              <radialGradient id="eyeIris" cx="45%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#5C3A1E"/>
                <stop offset="50%" stopColor="#3E2510"/>
                <stop offset="100%" stopColor="#2A1A0C"/>
              </radialGradient>
              <radialGradient id="earInner" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8C4A0"/>
                <stop offset="100%" stopColor="#D4A574"/>
              </radialGradient>
              <linearGradient id="legShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EDE8DC"/>
                <stop offset="100%" stopColor="#D8D0C4"/>
              </linearGradient>
              <filter id="furTexture">
                <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" result="d"/>
                <feGaussianBlur in="d" stdDeviation="0.3"/>
              </filter>
              <filter id="softShadow">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="noseBlur">
                <feGaussianBlur stdDeviation="0.5"/>
              </filter>
            </defs>

            {/* === SOMBRA NO CHAO === */}
            <ellipse cx="210" cy="405" rx="120" ry="14" fill="rgba(0,0,0,0.08)" filter="url(#softShadow)"/>

            {/* === PATAS TRASEIRAS === */}
            <g className="patrono-legs-back">
              {/* Perna traseira esquerda */}
              <path d="M142 270 Q130 295 124 318 Q120 336 118 354 Q116 370 114 384" fill="none" stroke="url(#furWhite)" strokeWidth="20" strokeLinecap="round" filter="url(#furTexture)"/>
              <path d="M118 354 Q116 368 114 382" fill="none" stroke="url(#legShadow)" strokeWidth="14" strokeLinecap="round"/>
              {/* Pata traseira esquerda */}
              <path d="M114 384 Q108 390 104 388 Q102 384 106 380 Q112 379 116 382" fill="#EDE8DC"/>
              <path d="M106 384 Q108 382 112 382" fill="none" stroke="#D8D0C4" strokeWidth="0.8"/>
              <circle cx="105" cy="386" r="1.2" fill="#C4B8A8"/>
              {/* Perna traseira direita */}
              <path d="M258 268 Q272 295 280 318 Q284 336 286 354 Q288 370 290 384" fill="none" stroke="url(#furWhite)" strokeWidth="20" strokeLinecap="round" filter="url(#furTexture)"/>
              <path d="M286 354 Q288 368 290 382" fill="none" stroke="url(#legShadow)" strokeWidth="14" strokeLinecap="round"/>
              {/* Pata traseira direita */}
              <path d="M290 384 Q296 390 300 388 Q302 384 298 380 Q292 379 288 382" fill="#EDE8DC"/>
              <path d="M296 384 Q294 382 290 382" fill="none" stroke="#D8D0C4" strokeWidth="0.8"/>
              <circle cx="297" cy="386" r="1.2" fill="#C4B8A8"/>
            </g>

            {/* === PATAS DIANTEIRAS === */}
            <g className="patrono-legs-front">
              {/* Perna dianteira esquerda */}
              <path d="M178 248 Q164 276 156 304 Q150 326 146 348 Q144 364 142 380" fill="none" stroke="url(#furWhite)" strokeWidth="21" strokeLinecap="round" filter="url(#furTexture)"/>
              <path d="M146 348 Q144 362 142 378" fill="none" stroke="url(#legShadow)" strokeWidth="15" strokeLinecap="round"/>
              {/* Pata dianteira esquerda */}
              <path d="M142 380 Q136 386 132 384 Q130 380 134 376 Q140 375 144 378" fill="#F0EBE0"/>
              <path d="M134 380 Q136 378 140 378" fill="none" stroke="#D8D0C4" strokeWidth="0.8"/>
              <circle cx="133" cy="382" r="1.2" fill="#C4B8A8"/>
              {/* Perna dianteira direita */}
              <path d="M245 246 Q260 276 268 304 Q274 326 278 348 Q280 364 282 380" fill="none" stroke="url(#furWhite)" strokeWidth="21" strokeLinecap="round" filter="url(#furTexture)"/>
              <path d="M278 348 Q280 362 282 378" fill="none" stroke="url(#legShadow)" strokeWidth="15" strokeLinecap="round"/>
              {/* Pata dianteira direita */}
              <path d="M282 380 Q288 386 292 384 Q294 380 290 376 Q284 375 280 378" fill="#F0EBE0"/>
              <path d="M290 380 Q288 378 284 378" fill="none" stroke="#D8D0C4" strokeWidth="0.8"/>
              <circle cx="291" cy="382" r="1.2" fill="#C4B8A8"/>
            </g>

            {/* === CORPO === */}
            {/* Corpo principal - costas castanhas */}
            <path d="M148 185 Q135 215 132 250 Q130 278 138 300 Q148 318 175 325 L255 325 Q282 318 292 300 Q300 278 298 250 Q295 215 282 185 Z" fill="url(#furBrown)" filter="url(#furTexture)"/>
            {/* Listra dorsal escura */}
            <path d="M175 188 Q210 182 248 188 Q252 200 250 218 Q248 235 245 248" fill="none" stroke="url(#furBrownDark)" strokeWidth="18" strokeLinecap="round" opacity="0.4" filter="url(#furTexture)"/>
            {/* Ventre branco */}
            <path d="M158 230 Q148 255 148 278 Q150 298 160 314 Q172 324 195 328 L235 328 Q258 324 270 314 Q280 298 282 278 Q282 255 272 230 Z" fill="url(#bellyFur)" filter="url(#furTexture)"/>
            {/* Peito branco */}
            <ellipse cx="210" cy="240" rx="34" ry="30" fill="#F5F0E8" filter="url(#furTexture)" opacity="0.7"/>
            {/* Lombar */}
            <path d="M175 195 Q210 188 245 195" fill="none" stroke="url(#furBrownDark)" strokeWidth="6" strokeLinecap="round" opacity="0.2"/>
            {/* Costelas sugestao */}
            <path d="M170 248 Q210 243 250 248" fill="none" stroke="rgba(90,54,32,0.08)" strokeWidth="2.5"/>
            <path d="M168 260 Q210 255 252 260" fill="none" stroke="rgba(90,54,32,0.06)" strokeWidth="2.5"/>

            {/* === CAUDA === */}
            <g className="patrono-tail">
              {/* Cauda alta - curva natural Jack Russell */}
              <path d="M278 195 Q298 178 315 165 Q332 155 345 152 Q355 152 358 158 Q356 165 345 172 Q332 180 318 188" fill="none" stroke="url(#furBrown)" strokeWidth="13" strokeLinecap="round" filter="url(#furTexture)"/>
              {/* Ponta da cauda branca */}
              <path d="M345 154 Q352 150 356 152 Q358 156 354 160" fill="none" stroke="#F5F0E8" strokeWidth="8" strokeLinecap="round" filter="url(#furTexture)"/>
            </g>

            {/* === PESCOCO === */}
            {/* Musculo do pescoco */}
            <path d="M192 185 Q190 158 194 135 Q197 118 202 105" fill="none" stroke="url(#furBrown)" strokeWidth="38" strokeLinecap="round" filter="url(#furTexture)"/>
            <path d="M235 185 Q237 158 233 135 Q230 118 225 105" fill="none" stroke="url(#furBrown)" strokeWidth="38" strokeLinecap="round" filter="url(#furTexture)"/>
            {/* Pele do pescoco - mais clara */}
            <path d="M196 185 Q193 160 197 138 Q200 120 205 108" fill="none" stroke="url(#furWhite)" strokeWidth="28" strokeLinecap="round" filter="url(#furTexture)" opacity="0.5"/>
            {/* Garganta branca */}
            <path d="M212 175 Q210 155 212 138 Q214 125 216 112" fill="none" stroke="#F0EBE0" strokeWidth="14" strokeLinecap="round" filter="url(#furTexture)"/>

            {/* === CABECA === */}
            <g className="patrono-head">
              {/* Cranio - Jack Russell: cranio plano, estreitando pro focinho */}
              <path d="M185 88 Q182 68 190 52 Q198 40 212 36 Q226 34 238 40 Q250 48 255 62 Q258 75 255 88 Q250 102 238 110 Q225 115 212 115 Q198 112 190 105 Q185 98 185 88 Z" fill="url(#furWhite)" filter="url(#furTexture)"/>
              {/* Mancha castanha no topo da cabeca */}
              <path d="M195 50 Q212 42 230 50 Q238 56 240 65 Q238 72 232 75 Q220 78 208 76 Q198 72 194 64 Q192 56 195 50 Z" fill="url(#furBrown)" filter="url(#furTexture)" opacity="0.85"/>
              {/* Lateral cranio */}
              <path d="M190 85 Q188 68 194 55 Q202 44 212 40 Q222 38 232 44 Q240 52 244 64 Q246 75 244 85 Q240 98 230 104 Q220 108 210 106 Q200 102 194 95 Q190 90 190 85 Z" fill="url(#furWhite)" filter="url(#furTexture)" opacity="0.4"/>
              {/* Topo cabeca - crista de pelos */}
              <path d="M200 42 Q212 36 225 42" fill="none" stroke="#D4C8B8" strokeWidth="3" strokeLinecap="round"/>
            </g>

            {/* === FOCINHO === */}
            {/* Focinho - Jack Russell: focinho medio, forte */}
            <path d="M198 102 Q195 112 200 122 Q208 132 218 135 Q228 132 235 122 Q240 112 238 102" fill="#F0EBE0" filter="url(#furTexture)"/>
            {/* Ponte do nariz */}
            <path d="M210 95 Q215 108 218 120" fill="none" stroke="#E8DDD0" strokeWidth="6" strokeLinecap="round"/>
            {/* Nariz - umido, escuro, realista */}
            <path d="M210 118 Q214 114 218 114 Q222 114 226 118 Q228 122 226 126 Q222 130 218 130 Q214 130 210 126 Q208 122 210 118 Z" fill="url(#noseShine)" filter="url(#noseBlur)"/>
            {/* Textura nariz */}
            <path d="M212 118 Q215 116 218 116 Q221 116 224 118" fill="none" stroke="#3A3A3A" strokeWidth="0.5" opacity="0.4"/>
            {/* Narinas */}
            <ellipse cx="214" cy="122" rx="2.5" ry="2" fill="#0A0A0A"/>
            <ellipse cx="222" cy="122" rx="2.5" ry="2" fill="#0A0A0A"/>
            {/* Brilho nariz - umido */}
            <ellipse cx="216" cy="117" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.35)"/>
            <ellipse cx="220" cy="116" rx="1.5" ry="1" fill="rgba(255,255,255,0.2)"/>

            {/* === BOCA === */}
            <path d="M208 130 Q218 138 228 130" fill="none" stroke="#8B6B50" strokeWidth="1.8" strokeLinecap="round"/>
            {/* Queixo */}
            <path d="M205 132 Q218 142 232 132" fill="#EDE5D8" filter="url(#furTexture)"/>

            {/* === OLHOS === */}
            <g className="patrono-eye">
              {/* Olho esquerdo */}
              <ellipse cx="198" cy="78" rx="8" ry="8" fill="#F8F4EE"/>
              <ellipse cx="198" cy="78" rx="6" ry="6.5" fill="url(#eyeIris)"/>
              <circle cx="198" cy="77" r="3.5" fill="#0A0A0A"/>
              {/* Reflexo do olho */}
              <circle cx="196" cy="76" r="2" fill="white" opacity="0.92"/>
              <circle cx="200" cy="79.5" r="0.9" fill="white" opacity="0.5"/>
              {/* Pestana/sobrancelha */}
              <path d="M189 70 Q198 67 207 70" fill="none" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>

              {/* Olho direito */}
              <ellipse cx="238" cy="78" rx="8" ry="8" fill="#F8F4EE"/>
              <ellipse cx="238" cy="78" rx="6" ry="6.5" fill="url(#eyeIris)"/>
              <circle cx="238" cy="77" r="3.5" fill="#0A0A0A"/>
              {/* Reflexo do olho */}
              <circle cx="236" cy="76" r="2" fill="white" opacity="0.92"/>
              <circle cx="240" cy="79.5" r="0.9" fill="white" opacity="0.5"/>
              {/* Pestana/sobrancelha */}
              <path d="M229 70 Q238 67 247 70" fill="none" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </g>

            {/* === ORELHAS === */}
            <g className="patrono-ears">
              {/* Orelha esquerda - V-shape caida castanha */}
              <path d="M192 58 Q178 48 170 52 Q164 60 166 75 Q170 86 178 88 Q186 86 190 78 Q193 68 192 58 Z" fill="url(#furBrown)" filter="url(#furTexture)"/>
              {/* Interior da orelha */}
              <path d="M190 62 Q182 54 176 58 Q172 65 174 75 Q178 82 183 82 Q188 78 190 70" fill="url(#earInner)" filter="url(#furTexture)" opacity="0.6"/>

              {/* Orelha direita */}
              <path d="M240 58 Q254 48 262 52 Q268 60 266 75 Q262 86 254 88 Q246 86 242 78 Q239 68 240 58 Z" fill="url(#furBrown)" filter="url(#furTexture)"/>
              {/* Interior da orelha */}
              <path d="M242 62 Q250 54 256 58 Q260 65 258 75 Q254 82 249 82 Q244 78 242 70" fill="url(#earInner)" filter="url(#furTexture)" opacity="0.6"/>
            </g>

            {/* === PELE SUELTA PESCOCO === */}
            <path d="M195 118 Q188 130 185 145 Q183 155 185 162" fill="none" stroke="#E8DDD0" strokeWidth="5" strokeLinecap="round" opacity="0.5"/>

            {/* === PELOS SOLTOS / DETALHES === */}
            {/* Pelos na peita */}
            <path d="M195 215 Q192 225 194 235" fill="none" stroke="#EDE8DC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <path d="M225 215 Q228 225 226 235" fill="none" stroke="#EDE8DC" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <path d="M210 212 Q210 222 210 232" fill="none" stroke="#EDE8DC" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
            {/* Pelos na testa */}
            <path d="M205 55 Q208 50 212 48" fill="none" stroke="#8B5E3C" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <path d="M220 55 Q218 50 215 48" fill="none" stroke="#8B5E3C" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            {/* Sobrancelha peluda */}
            <path d="M191 68 Q198 65 205 68" fill="none" stroke="#7A4F30" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
            <path d="M231 68 Q238 65 245 68" fill="none" stroke="#7A4F30" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
          </svg>
        </div>

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
