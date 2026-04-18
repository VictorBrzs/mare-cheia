import { useEffect, useState } from "react";
import {
  Beer,
  CreditCard,
  Fish,
  GlassWater,
  MapPin,
  Martini,
  Phone,
  Sandwich,
  Shell,
  Shrimp,
  Sunrise,
  Waves,
} from "lucide-react";

type Item = { nome: string; preco: number; obs?: string };
type Categoria = { titulo: string; emoji: string; subtitulo?: string; itens: Item[] };
type Secao = { id: string; titulo: string; destaque: string; icon: typeof Fish; categorias: Categoria[] };

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const secoes: Secao[] = [
  {
    id: "do-mar",
    titulo: "Do Mar",
    destaque: "Receitas frescas com sabor de litoral",
    icon: Fish,
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
    destaque: "Pratos quentes e porções para dividir",
    icon: Shell,
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
    destaque: "Pedidos rápidos com cara de verão",
    icon: Sandwich,
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
    destaque: "Sucos, refrigerantes e refrescos gelados",
    icon: GlassWater,
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
        subtitulo: "Sabores: abacaxi, maracujá, acerola, manga, morango e caju",
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
    destaque: "Clássicos para brindar à beira-mar",
    icon: Beer,
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
    destaque: "Misturas tropicais para fechar o dia",
    icon: Martini,
    categorias: [
      {
        titulo: "Caipirinhas (500ml)",
        emoji: "🍹",
        subtitulo: "Frutas: limão, morango, abacaxi, kiwi, maracujá e frutas vermelhas",
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
    destaque: "Final doce com clima de férias",
    icon: Sunrise,
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

const destaques = [
  { label: "Atendimento", value: "na areia" },
  { label: "Pedido médio", value: "10 min" },
  { label: "Pagamento", value: "PIX e cartão" },
];

function App() {
  const [secaoAtiva, setSecaoAtiva] = useState(secoes[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const secao = secoes.find((s) => s.id === secaoAtiva)!;
  const IconeSecao = secao.icon;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(186,230,253,0.85),transparent_35%),linear-gradient(180deg,#fff9ef_0%,#e0f2fe_35%,#fff4de_100%)] text-slate-900">
      <header className="relative overflow-hidden border-b border-white/40 bg-[linear-gradient(135deg,#0f766e_0%,#0891b2_42%,#f59e0b_100%)] text-white shadow-[0_20px_60px_rgba(8,47,73,0.25)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(253,224,71,0.35),transparent_18%),linear-gradient(180deg,transparent,rgba(255,255,255,0.04))]" />
        <div className="absolute -bottom-16 left-0 right-0 h-40 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.25),transparent_36%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.16),transparent_28%)]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 backdrop-blur-md">
              <Waves className="h-4 w-4" />
              <span>Quiosque na beira do mar</span>
            </div>
            <div className="flex flex-wrap gap-2 text-white/90">
              <span className="rounded-full border border-white/15 bg-slate-950/15 px-3 py-1.5">Aberto das 9h às 19h</span>
              <span className="rounded-full border border-white/15 bg-slate-950/15 px-3 py-1.5">Praia Grande, Posto 6</span>
            </div>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-100/90">
                Cardápio tropical
              </p>
              <h1
                className="text-5xl leading-none sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Maré Cheia
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-cyan-50 sm:text-lg">
                Um cardápio feito para dias de sol: frutos do mar, porções generosas,
                drinks gelados e um visual mais limpo para o cliente encontrar tudo rápido.
              </p>
            </div>

            <div className="grid gap-3 rounded-[2rem] border border-white/15 bg-slate-950/15 p-5 backdrop-blur-md">
              {destaques.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3"
                >
                  <span className="text-sm text-cyan-50/80">{item.label}</span>
                  <strong className="text-sm font-semibold text-white">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <nav
        className={`sticky top-0 z-30 border-b border-slate-200/70 transition-all ${
          scrolled
            ? "bg-white/88 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl"
            : "bg-white/72 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          {secoes.map((s) => {
            const Icone = s.icon;
            const ativo = secaoAtiva === s.id;

            return (
              <button
                key={s.id}
                onClick={() => setSecaoAtiva(s.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  ativo
                    ? "border-teal-600 bg-teal-700 text-white shadow-lg shadow-teal-900/15"
                    : "border-slate-200 bg-white/90 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
                }`}
              >
                <Icone className="h-4 w-4" />
                <span>{s.titulo}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-cyan-200/50 bg-[linear-gradient(135deg,#0f766e_0%,#155e75_45%,#082f49_100%)] p-6 text-white shadow-[0_20px_50px_rgba(8,47,73,0.18)] sm:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-cyan-50">
              <IconeSecao className="h-4 w-4" />
              <span>{secao.titulo}</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{secao.titulo}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-cyan-50/90 sm:text-base">
              {secao.destaque}. Valores em reais e seleção pensada para servir rápido sem perder presença.
            </p>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-amber-200 bg-white/80 p-5 shadow-[0_14px_35px_rgba(148,163,184,0.14)] backdrop-blur-md">
            <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-amber-900">
              <Shrimp className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Pedido com cara de verão</p>
                <p className="text-xs text-amber-800/80">Porções, pratos e bebidas organizados por seção</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Categorias</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{secao.categorias.length}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Itens na seção</p>
                <p className="mt-2 text-2xl font-black text-slate-900">
                  {secao.categorias.reduce((acc, categoria) => acc + categoria.itens.length, 0)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6">
          {secao.categorias.map((cat) => (
            <section
              key={cat.titulo}
              className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 shadow-[0_16px_40px_rgba(148,163,184,0.14)] backdrop-blur-md"
            >
              <div className="border-b border-slate-200/70 bg-[linear-gradient(180deg,#f8fafc_0%,#eefcf9_100%)] px-5 py-5 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="flex items-center gap-3 text-xl font-black text-slate-900 sm:text-2xl">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                        {cat.emoji}
                      </span>
                      <span>{cat.titulo}</span>
                    </h3>
                    {cat.subtitulo && (
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{cat.subtitulo}</p>
                    )}
                  </div>
                </div>
              </div>

              <ul className="grid gap-3 p-4 sm:p-5">
                {cat.itens.map((it) => (
                  <li
                    key={it.nome}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50/40 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold leading-6 text-slate-900">{it.nome}</p>
                      {it.obs && <p className="mt-1 text-sm leading-5 text-slate-500">{it.obs}</p>}
                    </div>
                    <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white">
                      {formatBRL(it.preco)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-[2rem] border border-amber-200/80 bg-[linear-gradient(135deg,#fff7db_0%,#ffedd5_100%)] p-6 shadow-[0_16px_40px_rgba(251,191,36,0.14)]">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-700">Boas-vindas ao Maré Cheia</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Atendimento direto na cadeira de praia. Aceitamos dinheiro, cartão e PIX.
            Os preços podem variar em datas especiais, e bebidas alcoólicas devem ser consumidas com moderação.
          </p>
        </section>
      </main>

      <footer className="mt-10 bg-[linear-gradient(180deg,#082f49_0%,#0f172a_100%)] text-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-300">
              <CreditCard className="h-4 w-4" />
              <h4 className="text-sm font-bold uppercase tracking-[0.2em]">Pagamento</h4>
            </div>
            <p className="text-sm text-slate-200">Dinheiro, débito, crédito, PIX e VR/VA.</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-300">
              <Phone className="h-4 w-4" />
              <h4 className="text-sm font-bold uppercase tracking-[0.2em]">PIX & Contato</h4>
            </div>
            <p className="text-sm text-slate-200">Chave PIX: (13) 99876-5432</p>
            <p className="mt-1 text-sm text-slate-300">WhatsApp: (13) 99876-5432</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-300">
              <MapPin className="h-4 w-4" />
              <h4 className="text-sm font-bold uppercase tracking-[0.2em]">Endereço</h4>
            </div>
            <p className="text-sm text-slate-200">Quiosque familiar desde 2008, no Posto 6 da Praia Grande.</p>
            <p className="mt-1 text-xs text-slate-400">Cardápio meramente ilustrativo.</p>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Maré Cheia. Feito para atender rápido e continuar bonito em qualquer tela.
        </div>
      </footer>
    </div>
  );
}

export default App;
