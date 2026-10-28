/* =========================================================
   Engreen — scripts da landing page
   ========================================================= */

/* ---- CONFIGURAÇÃO: troque pelos dados reais ---- */
const CONFIG = {
  // Só números, com DDI 55 + DDD. Ex.: '5541999998888'
  whatsapp: '5500000000000',
  // Usuário do Instagram, sem o @
  instagram: 'SEU_INSTAGRAM',
  // Mensagem padrão ao clicar nos botões de WhatsApp
  mensagemPadrao: 'Olá! Vim pelo site e gostaria de falar sobre a minha obra.',
};

/* ---- Links de WhatsApp e Instagram (definidos num lugar só) ---- */
const linkWhatsApp = (texto) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;

document.querySelectorAll('[data-whatsapp]').forEach((a) => {
  a.href = linkWhatsApp(CONFIG.mensagemPadrao);
  a.target = '_blank';
  a.rel = 'noopener';
});

document.querySelectorAll('[data-instagram]').forEach((a) => {
  a.href = `https://www.instagram.com/${CONFIG.instagram}/`;
});

/* ---- Ano atual no rodapé ---- */
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();

/* ---- Menu mobile ---- */
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu-mobile');

function setMenu(aberto) {
  menu.classList.toggle('hidden', !aberto);
  toggle.setAttribute('aria-expanded', String(aberto));
  toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  toggle.querySelector('.icon-open').classList.toggle('hidden', aberto);
  toggle.querySelector('.icon-close').classList.toggle('hidden', !aberto);
}

if (toggle && menu) {
  toggle.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
  // Fecha ao clicar num link
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  // Fecha com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      setMenu(false);
      toggle.focus();
    }
  });
}

/* ---- Sombra no header ao rolar ---- */
const header = document.getElementById('site-header');
const atualizarHeader = () => header.classList.toggle('shadow-lg', window.scrollY > 10);
window.addEventListener('scroll', atualizarHeader, { passive: true });
atualizarHeader();

/* ---- Animações de entrada (IntersectionObserver) ---- */
const animaveis = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  animaveis.forEach((el) => observer.observe(el));
} else {
  animaveis.forEach((el) => el.classList.add('visible'));
}

/* ---- Link ativo no menu conforme a seção visível ---- */
const navLinks = document.querySelectorAll('.nav-link');
const secoes = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
// Observa também o hero e o contato, para limpar o destaque quando eles estão na tela
['#home', '#contato'].forEach((id) => {
  const el = document.querySelector(id);
  if (el) secoes.push(el);
});

if ('IntersectionObserver' in window && secoes.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const ativo = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('text-lime', ativo);
          link.classList.toggle('text-offwhite', !ativo);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  secoes.forEach((s) => navObserver.observe(s));
}

/* ---- Formulário → abre o WhatsApp com a mensagem montada ---- */
const form = document.getElementById('form-contato');
const erro = document.getElementById('form-erro');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = new FormData(form);
    const nome = (dados.get('nome') || '').trim();
    const whats = (dados.get('whatsapp') || '').trim();

    if (!nome || !whats) {
      erro.classList.remove('hidden');
      (nome ? form.whatsapp : form.nome).focus();
      return;
    }
    erro.classList.add('hidden');

    const texto = [
      `Olá! Meu nome é ${nome}.`,
      `Tenho interesse em: ${dados.get('servico')}.`,
      dados.get('mensagem') ? `\n${dados.get('mensagem').trim()}` : '',
      `\nMeu WhatsApp: ${whats}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(linkWhatsApp(texto), '_blank', 'noopener');
  });
}
