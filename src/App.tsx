import { useState, useEffect } from "react";

type Item = { nome: string; preco: number; obs?: string };
type Categoria = { titulo: string; emoji: string; subtitulo?: string; itens: Item[] };
type Secao = { id: string; titulo: string; cor: string; categorias: Categoria[] };

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const secoes: Secao[] = [
  {
    id: "do-mar",
    titulo: "Do Mar",
    cor: "from-cyan-600 to-blue-700",
    categorias: [
      {
        titulo: "Peixes & Frutos do Mar",
        emoji: "🐟",
        subtitulo: "Servido com arroz, farofa e vinagrete da casa",
        itens: [
          { nome: "Camarão Empanado (300g)", preco: 48.0 },
          { nome: "Camarão na Moranga", preco: 62.0 },
          { nome: "Lula à Dorê (250g)", preco: 45.0 },
          { nome: "Polvo Grelhado", preco: 69.0 },
          { nome: "Filé de Robalo Grelhado", preco: 52.0 },
          { nome: "Filé de Linguado ao Molho de Maracujá", preco: 49.0 },
          { nome: "Moqueca de Peixe (serve 2)", preco: 89.0 },
          { nome: "Bobó de Camarão (serve 2)", preco: 95.0 },
          { nome: "Casquinha de Siri", preco: 28.0 },
          { nome: "Anéis de Lula Crocantes", preco: 38.0 },
        ],
      },
      {
        titulo: "Petiscos da Praia",
        emoji: "🍤",
        itens: [
          { nome: "Bolinho de Bacalhau (8 un)", preco: 32.0 },
          { nome: "Pastel de Camarão com Catupiry (4 un)", preco: 24.0 },
          { nome: "Iscas de Peixe Empanadas", preco: 35.0 },
          { nome: "Caldinho de Sururu", preco: 14.0 },
          { nome: "Caldinho de Camarão", preco: 16.0 },
        ],
      },
    ],
  },
  {
    id: "da-terra",
    titulo: "Da Terra",
    cor: "from-amber-600 to-orange-700",
    categorias: [
      {
        titulo: "Pratos & Combos",
        emoji: "🍖",
        itens: [
          { nome: "Picanha na Chapa (300g)", preco: 58.0 },
          { nome: "Maminha Acebolada (300g)", preco: 49.0 },
          { nome: "Filé de Frango Grelhado", preco: 32.0 },
          { nome: "Strogonoff de Frango", preco: 36.0 },
          { nome: "Combo Praia: Carne + Frango + Linguiça + Fritas", preco: 78.0, obs: "Serve até 3 pessoas" },
          { nome: "Espetinho Misto (3 un)", preco: 27.0 },
        ],
      },
      {
        titulo: "Acompanhamentos & Porções",
        emoji: "🍟",
        itens: [
          { nome: "Batata Frita Crocante (400g)", preco: 22.0 },
          { nome: "Batata Rústica com Cheddar e Bacon", preco: 32.0 },
          { nome: "Mandioca Frita com Geleia de Pimenta", preco: 20.0 },
          { nome: "Polenta Frita", preco: 18.0 },
          { nome: "Anel de Cebola Empanado", preco: 22.0 },
          { nome: "Calabresa Acebolada", preco: 28.0 },
          { nome: "Queijo Coalho na Brasa (6 un)", preco: 26.0 },
          { nome: "Mix de Salada Tropical", preco: 19.0 },
        ],
      },
    ],
  },
  {
    id: "lanches",
    titulo: "Lanches",
    cor: "from-rose-600 to-red-700",
    categorias: [
      {
        titulo: "Sanduíches da Areia",
        emoji: "🥪",
        itens: [
          { nome: "X-Praia (hambúrguer 150g, queijo, alface, tomate)", preco: 22.0 },
          { nome: "X-Maré (duplo, bacon, cheddar e cebola caramelizada)", preco: 29.0 },
          { nome: "X-Frango Crocante", preco: 24.0 },
          { nome: "Beirute de Filé Mignon", preco: 28.0 },
          { nome: "Hot Dog Tropical", preco: 14.0, obs: "Pão, salsicha, milho, batata palha e molhos" },
          { nome: "Misto Quente Especial", preco: 12.0 },
        ],
      },
      {
        titulo: "Tapiocas & Crepes",
        emoji: "🌯",
        itens: [
          { nome: "Tapioca de Queijo Coalho com Mel", preco: 16.0 },
          { nome: "Tapioca de Frango com Catupiry", preco: 18.0 },
          { nome: "Tapioca de Carne Seca com Queijo", preco: 21.0 },
          { nome: "Crepe Doce de Banana com Nutella", preco: 17.0 },
        ],
      },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    cor: "from-sky-500 to-cyan-600",
    categorias: [
      {
        titulo: "Sem Álcool",
        emoji: "🥤",
        itens: [
          { nome: "Refrigerante Lata 350ml", preco: 6.0, obs: "Coca, Guaraná, Fanta, Sprite" },
          { nome: "Refrigerante 600ml", preco: 9.0 },
          { nome: "Água Mineral 500ml", preco: 4.0 },
          { nome: "Água com Gás", preco: 5.0 },
          { nome: "Água de Coco Gelada", preco: 8.0 },
          { nome: "Energético 250ml", preco: 12.0 },
          { nome: "Chá Gelado de Limão", preco: 7.0 },
        ],
      },
      {
        titulo: "Sucos Naturais",
        emoji: "🧃",
        subtitulo: "Sabores: abacaxi, maracujá, acerola, manga, morango, caju",
        itens: [
          { nome: "Suco com Água (500ml)", preco: 10.0 },
          { nome: "Suco com Leite (500ml)", preco: 12.0 },
          { nome: "Limonada Suíça", preco: 11.0 },
          { nome: "Vitamina de Frutas", preco: 13.0 },
          { nome: "Açaí na Tigela 300ml", preco: 18.0, obs: "Banana, granola e leite condensado" },
        ],
      },
    ],
  },
  {
    id: "cervejas",
    titulo: "Cervejas & Doses",
    cor: "from-yellow-500 to-amber-600",
    categorias: [
      {
        titulo: "Cervejas Geladas",
        emoji: "🍺",
        itens: [
          { nome: "Skol 350ml", preco: 6.0 },
          { nome: "Brahma 350ml", preco: 7.0 },
          { nome: "Antarctica 350ml", preco: 7.0 },
          { nome: "Heineken 350ml", preco: 9.0 },
          { nome: "Stella Artois 330ml", preco: 9.0 },
          { nome: "Corona 330ml", preco: 11.0 },
          { nome: "Eisenbahn 350ml", preco: 10.0 },
          { nome: "Cerveja Sem Álcool", preco: 8.0 },
          { nome: "Long Neck Budweiser", preco: 10.0 },
        ],
      },
      {
        titulo: "Doses & Destilados",
        emoji: "🥃",
        itens: [
          { nome: "Cachaça 51", preco: 5.0 },
          { nome: "Velho Barreiro", preco: 6.0 },
          { nome: "Pitú Gold", preco: 8.0 },
          { nome: "Vodka Smirnoff", preco: 10.0 },
          { nome: "Tequila Ouro", preco: 14.0 },
          { nome: "Whisky Red Label", preco: 18.0 },
          { nome: "Whisky Black Label", preco: 28.0 },
          { nome: "Gin Tanqueray", preco: 22.0 },
          { nome: "Jägermeister", preco: 16.0 },
          { nome: "Licor de Amarula", preco: 15.0 },
        ],
      },
    ],
  },
  {
    id: "drinks",
    titulo: "Drinks",
    cor: "from-pink-500 to-rose-600",
    categorias: [
      {
        titulo: "Caipirinhas (500ml)",
        emoji: "🍹",
        subtitulo: "Frutas: limão, morango, abacaxi, kiwi, maracujá, frutas vermelhas",
        itens: [
          { nome: "Caipirinha de Cachaça", preco: 16.0 },
          { nome: "Caipiroska de Vodka", preco: 19.0 },
          { nome: "Caipisaquê", preco: 18.0 },
          { nome: "Caipirinha Premium (Sagatiba)", preco: 24.0 },
          { nome: "Caipifrutas Mix (3 frutas)", preco: 22.0 },
        ],
      },
      {
        titulo: "Drinks Tropicais (500ml)",
        emoji: "🌴",
        itens: [
          { nome: "Piña Colada", preco: 24.0, obs: "Rum, abacaxi, leite de coco e gelo" },
          { nome: "Sex on the Beach", preco: 26.0 },
          { nome: "Mojito Cubano", preco: 22.0 },
          { nome: "Margarita Clássica", preco: 25.0 },
          { nome: "Aperol Spritz", preco: 28.0 },
          { nome: "Gin Tônica com Frutas Vermelhas", preco: 27.0 },
          { nome: "Coco Maluco", preco: 30.0, obs: "Servido no coco verde com vodka e energético" },
          { nome: "Blue Lagoon", preco: 24.0 },
        ],
      },
      {
        titulo: "Batidas Cremosas (500ml)",
        emoji: "🥥",
        itens: [
          { nome: "Batida de Coco", preco: 18.0 },
          { nome: "Batida de Maracujá", preco: 18.0 },
          { nome: "Batida Pé-de-Moça (amendoim)", preco: 20.0 },
          { nome: "Batida Tropical", preco: 22.0 },
        ],
      },
    ],
  },
  {
    id: "sobremesas",
    titulo: "Sobremesas",
    cor: "from-fuchsia-500 to-purple-600",
    categorias: [
      {
        titulo: "Para Adoçar o Dia",
        emoji: "🍨",
        itens: [
          { nome: "Picolé Artesanal", preco: 7.0, obs: "Sabores variados de frutas" },
          { nome: "Sorvete 2 Bolas com Calda", preco: 14.0 },
          { nome: "Banana Split", preco: 18.0 },
          { nome: "Pudim de Leite", preco: 12.0 },
          { nome: "Petit Gateau com Sorvete", preco: 19.0 },
          { nome: "Espetinho de Frutas com Chocolate", preco: 13.0 },
        ],
      },
    ],
  },
];

function App() {
  const [secaoAtiva, setSecaoAtiva] = useState(secoes[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const secao = secoes.find((s) => s.id === secaoAtiva)!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-8 text-6xl">🌴</div>
          <div className="absolute top-10 right-10 text-5xl">☀️</div>
          <div className="absolute bottom-4 left-1/4 text-4xl">🐚</div>
          <div className="absolute bottom-6 right-1/3 text-4xl">⛱️</div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-10 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3">
            Quiosque na Beira do Mar
          </div>
          <h1 className="text-5xl md:text-6xl font-black drop-shadow-lg mb-2" style={{ fontFamily: "'Pacifico', cursive" }}>
            Maré Cheia
          </h1>
          <p className="text-lg md:text-xl font-light opacity-95">
            Sabores do litoral com o pé na areia 🏖️
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <span className="bg-white/25 px-3 py-1 rounded-full backdrop-blur-sm">⏰ Aberto 9h às 19h</span>
            <span className="bg-white/25 px-3 py-1 rounded-full backdrop-blur-sm">📍 Posto 6 — Praia Grande</span>
          </div>
        </div>
      </header>

      {/* Navegação fixa */}
      <nav
        className={`sticky top-0 z-30 transition-all ${
          scrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-5xl mx-auto px-2 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {secoes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSecaoAtiva(s.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                secaoAtiva === s.id
                  ? `bg-gradient-to-r ${s.cor} text-white shadow-md scale-105`
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {s.titulo}
            </button>
          ))}
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div
          className={`bg-gradient-to-r ${secao.cor} text-white rounded-2xl px-6 py-5 shadow-lg mb-6`}
        >
          <h2 className="text-3xl font-black tracking-tight">{secao.titulo}</h2>
          <p className="opacity-90 text-sm mt-1">Cardápio · valores em Reais (R$)</p>
        </div>

        <div className="grid gap-6">
          {secao.categorias.map((cat) => (
            <section
              key={cat.titulo}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100"
            >
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-5 py-4 border-b border-slate-200">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="text-2xl">{cat.emoji}</span>
                  {cat.titulo}
                </h3>
                {cat.subtitulo && (
                  <p className="text-xs text-slate-600 mt-1 italic">{cat.subtitulo}</p>
                )}
              </div>
              <ul className="divide-y divide-slate-100">
                {cat.itens.map((it) => (
                  <li
                    key={it.nome}
                    className="flex items-start justify-between gap-4 px-5 py-3 hover:bg-amber-50/50 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 leading-snug">{it.nome}</p>
                      {it.obs && (
                        <p className="text-xs text-slate-500 mt-0.5">{it.obs}</p>
                      )}
                    </div>
                    <span className="font-black text-slate-900 whitespace-nowrap bg-amber-100 px-3 py-1 rounded-lg text-sm">
                      {formatBRL(it.preco)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Dicas / observações */}
        <div className="mt-8 bg-gradient-to-br from-amber-100 to-orange-100 border-l-4 border-orange-500 rounded-xl p-5 text-sm text-slate-700">
          <p className="font-bold text-orange-700 mb-1">🌞 Boas-vindas ao Maré Cheia!</p>
          <p>
            Atendimento direto na sua cadeira de praia. Pague em dinheiro, cartão ou PIX.
            Os preços podem variar em datas especiais. Consumir bebidas alcoólicas com moderação.
          </p>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white mt-10">
        <div className="max-w-5xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-bold text-amber-300 mb-2">💳 Formas de Pagamento</h4>
            <p className="opacity-80">Dinheiro · Débito · Crédito · PIX · VR/VA</p>
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-2">📱 PIX & Contato</h4>
            <p className="opacity-80">Chave PIX: (13) 99876-5432</p>
            <p className="opacity-80">WhatsApp: (13) 99876-5432</p>
          </div>
          <div>
            <h4 className="font-bold text-amber-300 mb-2">🌊 Maré Cheia</h4>
            <p className="opacity-80">Quiosque familiar desde 2008.</p>
            <p className="opacity-60 text-xs mt-2">Cardápio meramente ilustrativo.</p>
          </div>
        </div>
        <div className="text-center text-xs opacity-60 pb-5">
          © {new Date().getFullYear()} Maré Cheia · Feito com 💙 à beira-mar
        </div>
      </footer>
    </div>
  );
}

export default App;
