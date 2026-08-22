import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const baseUrl = import.meta.env.BASE_URL;
const assetVersion = '6cef150';
const asset = (file) => `${baseUrl}assets/${file}?v=${assetVersion}`;
const demoUrl = (slug) => `${baseUrl}#/projetos/${slug}`;

const services = [
  ['Criação de sites', 'Sites institucionais completos, claros e preparados para apresentar sua empresa com credibilidade.'],
  ['Landing pages', 'Páginas focadas em uma oferta, com estrutura pensada para transformar interesse em contato.'],
  ['Sites para restaurantes', 'Cardápio, reservas e identidade visual reunidos em uma experiência que abre o apetite.'],
  ['Sites para barbearias', 'Presença digital marcante, serviços bem apresentados e agendamento sempre ao alcance.'],
  ['Design e identidade visual', 'Direção visual consistente para sua marca ser reconhecida em todos os pontos de contato.'],
  ['Otimização e manutenção', 'Melhorias contínuas de desempenho, conteúdo, segurança e experiência de uso.'],
];

const projects = [
  { slug: 'amana', title: 'Amana Restaurante', type: 'Restaurante contemporâneo', desc: 'Uma experiência editorial que transforma ingredientes, ambiente e reservas em desejo.', tech: ['React', 'CSS', 'Vercel'], image: asset('portfolio-amana-real.png'), featured: true },
  { slug: 'bravo', title: 'Bravo Barbearia', type: 'Barbearia premium', desc: 'Identidade digital precisa, com serviços claros e um caminho rápido até o agendamento.', tech: ['Next.js', 'JavaScript', 'Vercel'], image: asset('portfolio-bravo-real.png'), featured: true },
  { slug: 'linha', title: 'Linha Arquitetura', type: 'Estúdio de arquitetura', desc: 'Portfólio autoral que dá protagonismo aos projetos e conduz novas conversas.', tech: ['React', 'CSS', 'SEO'], image: asset('portfolio-linha-real.png'), featured: false },
];

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'GitHub', 'Vercel', 'Design responsivo'];
const process = [
  ['Entendo sua ideia', 'Começamos com uma conversa direta sobre o negócio, o público e o resultado esperado.'],
  ['Planejo o projeto', 'Organizo conteúdo, referências e prioridades antes de transformar ideias em telas.'],
  ['Desenvolvo o site', 'Construo cada detalhe com atenção ao visual, ao desempenho e à experiência.'],
  ['Publico e entrego', 'Coloco o projeto no ar, reviso tudo e deixo você pronto para usar e divulgar.'],
];

function Reveal({ children, className = '' }) {
  const ref = React.useRef(null);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.visible = 'true'; observer.disconnect(); }
    }, { threshold: .12 });
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = React.useRef(null);
  useEffect(() => {
    const close = event => {
      if (event.key === 'Escape') setContactOpen(false);
      if (event.type === 'pointerdown' && contactRef.current && !contactRef.current.contains(event.target)) setContactOpen(false);
    };
    window.addEventListener('keydown', close);
    window.addEventListener('pointerdown', close);
    return () => { window.removeEventListener('keydown', close); window.removeEventListener('pointerdown', close); };
  }, []);
  const links = [['Sobre', '#sobre'], ['Serviços', '#servicos'], ['Projetos', '#projetos'], ['Processo', '#processo']];
  return <header className="header">
    <a className="brand" href="#inicio" aria-label="Página inicial de Mateus Duarte"><img src={asset('mateus-duarte-logo-blue.png')} alt="" /><span>Mateus Duarte</span></a>
    <button className="menu-button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'Fechar' : 'Menu'}</button>
    <nav id="menu" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <div className="contact-menu" ref={contactRef}>
        <button className="nav-cta" type="button" aria-expanded={contactOpen} aria-controls="contact-popover" onClick={() => setContactOpen(value => !value)}>Falar comigo</button>
        <div id="contact-popover" className={`contact-popover ${contactOpen ? 'open' : ''}`} aria-hidden={!contactOpen}>
          <span>Entre em contato</span>
          <a href="https://wa.me/message/4PRSWYXF67WIC1" target="_blank" rel="noreferrer"><strong>WhatsApp</strong><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="" /></a>
          <a href="mailto:mateusduartesouza15@gmail.com"><strong>Gmail</strong><img src="https://cdn.simpleicons.org/gmail/EA4335" alt="" /></a>
        </div>
      </div>
    </nav>
  </header>;
}

const demoContent = {
  amana: { name: 'AMANA', label: 'Restaurante contemporâneo', title: 'Cozinha que nasce da terra.', text: 'Ingredientes brasileiros, técnica contemporânea e uma experiência criada para ser lembrada.', action: 'Reservar uma mesa', second: 'Conhecer o menu', image: asset('amana.png'), items: [['Origem', 'Ingredientes escolhidos de produtores locais.'], ['Experiência', 'Uma cozinha guiada por tempo, fogo e natureza.'], ['Reservas', 'Seu lugar à mesa em poucos passos.']] },
  bravo: { name: 'BRAVO', label: 'Barbearia premium', title: 'Precisão em cada detalhe.', text: 'Cortes, barba e cuidado pessoal com técnica, identidade e hora marcada.', action: 'Agendar horário', second: 'Ver serviços', image: asset('bravo.png'), items: [['Corte', 'Consultoria de estilo e acabamento preciso.'], ['Barba', 'Ritual completo com toalha quente.'], ['Experiência', 'Seu tempo, seu estilo, nosso padrão.']] },
  linha: { name: 'LINHA', label: 'Estúdio de arquitetura', title: 'Espaços que respiram.', text: 'Arquitetura contemporânea que aproxima matéria, luz, paisagem e vida cotidiana.', action: 'Iniciar um projeto', second: 'Ver projetos', image: asset('linha.png'), items: [['Residencial', 'Casas desenhadas ao redor de quem vive.'], ['Interiores', 'Materialidade, luz e proporção em equilíbrio.'], ['Comercial', 'Espaços que traduzem marcas em experiência.']] },
};

function ProjectDemo({ project }) {
  const [dialog, setDialog] = useState(null);
  const [sent, setSent] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('Todos');
  useEffect(() => {
    const close = e => e.key === 'Escape' && setDialog(null);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const isAmana = project.name === 'AMANA';
  const isBravo = project.name === 'BRAVO';
  const isLinha = project.name === 'LINHA';
  const featureCopy = {
    reservation:{ title: isBravo ? 'Agendamento online' : 'Reserve sua mesa', how: isBravo ? 'O cliente escolhe serviço, profissional, data e horário em poucos passos.' : 'O cliente seleciona data, horário e número de pessoas diretamente no site.', benefit: isBravo ? 'Reduz mensagens manuais e mantém a agenda organizada 24 horas por dia.' : 'Reduz atritos e transforma visitantes interessados em reservas.' },
    menu:{ title:'Cardápio digital', how:'Pratos, ingredientes e categorias aparecem em uma leitura elegante e fácil de atualizar.', benefit:'O cliente conhece a proposta antes da visita e chega mais decidido.' },
    story:{ title: isBravo ? 'Sobre a BRAVO' : 'Nossa essência', how:'Uma narrativa apresenta história, conceito, ambiente e diferenciais da marca.', benefit:'Aumenta credibilidade e percepção de valor.' },
    experiences:{ title:'Experiências', how:'Apresenta ofertas especiais, eventos e serviços de maior valor.', benefit:'Ajuda a vender experiências além do serviço principal.' },
    journey:{ title:'Da origem à mesa', how:'Uma sequência visual conecta produtor, ingrediente, cozinha e experiência.', benefit:'Comunica valores e diferenciais que tornam o restaurante único.' },
    contact:{ title:'Contato inteligente', how:'Reúne WhatsApp, telefone, Instagram, endereço e localização.', benefit:'Transforma interesse em conversa em poucos segundos.' },
    services:{ title:'Serviços e valores', how:'Exibe opções, descrições e preços com clareza.', benefit:'O cliente escolhe antes de iniciar o agendamento.' },
    barbers:{ title:'Escolha seu barbeiro', how:'Perfis mostram especialidades, experiência e disponibilidade.', benefit:'Cria confiança e personaliza o agendamento.' },
    gallery:{ title:'Galeria premium', how:'Fotos podem ser filtradas e abertas em tela ampliada.', benefit:'Mostra a qualidade do trabalho e do ambiente.' },
    products:{ title:'Produtos BRAVO', how:'Apresenta cuidados, benefícios e preços de cada produto.', benefit:'Cria uma nova oportunidade de venda no atendimento e no pós-corte.' },
    sales:{ title: isBravo ? 'Um site para sua barbearia' : 'Um site para seu restaurante', how:'Identidade, conteúdo, WhatsApp, localização, SEO e funcionalidades adaptadas ao negócio.', benefit:'Uma presença digital profissional gera confiança, contatos e novas vendas.' },
    understand:{ title:'Você está em uma demonstração', how:'Todos os recursos foram criados para mostrar como seria a experiência em um site real.', benefit:'Você pode testar menus, formulários e chamadas antes de contratar seu projeto.' }
  };
  const open = key => { setSent(false); setDialog({ key, ...featureCopy[key] }); };
  const nav = isAmana ? [['Restaurante','story'],['Cardápio','menu'],['Experiências','experiences'],['Jornada','journey'],['Contato','contact']] : isBravo ? [['Serviços','services'],['Barbeiros','barbers'],['Galeria','gallery'],['Produtos','products'],['Sobre','story'],['Contato','contact']] : [['Sobre','story'],['Serviços','services'],['Contato','contact']];
  const serviceItems = isBravo ? [['Corte','R$ 45'],['Barba','R$ 35'],['Corte + Barba','R$ 70'],['Acabamento','R$ 25']] : project.items;
  const linhaImages = ['linha-residencial.png','linha-interiores.png','linha-comercial.png'].map(asset);
  return <main className={`demo demo-${project.name.toLowerCase()}`}>
    {isAmana && <div className="amana-strip">Cozinha brasileira contemporânea • Ingredientes nativos • Fogo, terra e tempo</div>}
    <header className="demo-nav"><a href="#topo" className="demo-logo">{project.name}</a><nav>{nav.map(([label,key]) => <button key={key} onClick={() => open(key)}>{label}</button>)}</nav><button className="demo-nav-action" onClick={() => open('reservation')}>{isBravo ? 'Agendar' : isAmana ? 'Reservar' : project.action}</button></header>
    <section className="demo-hero" id="topo"><div className="demo-hero-copy">{isLinha ? <h1>{project.title}</h1> : <><p>{project.label}</p><h1>{project.title}</h1><span>{project.text}</span><div className="actions"><button className="button primary" onClick={() => open('reservation')}>{project.action} <b>↗</b></button><a className="button secondary" href="#servicos">{project.second}</a></div>{isBravo && <small>Desde 2017 · Disciplina na técnica. Excelência no resultado.</small>}</>}</div>{isBravo ? <div className="bravo-hero-photo"><img src={asset('bravo-hero-barber.png')} alt="Barbeiro da BRAVO realizando um corte" /><span>Ofício, técnica e presença.</span></div> : <div className="demo-visual"><img src={asset(isAmana ? 'amana-hero-tropical.png' : 'linha-residencial.png')} alt={isAmana ? 'Prato brasileiro contemporâneo entre folhagens tropicais' : 'Residência contemporânea integrada à paisagem tropical'} /></div>}</section>
    <section className="demo-intro" id="conceito"><p>{isAmana ? 'Nossa cozinha' : isBravo ? 'Nossa experiência' : 'Nossa abordagem'}</p><h2>{isAmana ? 'Brasil como ingrediente.' : isBravo ? 'Um espaço pensado para você.' : 'Forma e função trabalhando juntas para criar uma experiência marcante.'}</h2><span>{isAmana ? 'Ingredientes brasileiros encontram técnicas contemporâneas em uma cozinha conectada à origem.' : isBravo ? 'Ambiente, atendimento e técnica para transformar o cuidado masculino em uma experiência.' : project.text}</span></section>
    <section className="demo-items" id="servicos">{serviceItems.map(([title,text], i) => <article key={title} role="button" tabIndex="0" onClick={() => open(isBravo ? 'services' : 'experiences')} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && open(isBravo ? 'services' : 'experiences')}>{!isAmana && !isBravo && <img className="linha-service-image" src={linhaImages[i]} alt={`${title}, projeto demonstrativo da Linha`} />}<span>0{i+1}</span><h3>{title}</h3><p>{text}</p><span className="service-open">Ver detalhes ↗</span></article>)}</section>
    {isLinha && <>
      <section className="linha-manifesto">
        <div className="linha-manifesto-image"><img src={asset('linha-comercial.png')} alt="Arquitetura comercial integrada a jardins tropicais" /></div>
        <div className="linha-manifesto-copy"><span>Arquitetura viva</span><h2>Concreto, luz e natureza em equilíbrio.</h2><p>Criamos espaços que envelhecem bem, acolhem a rotina e fazem a paisagem participar de cada ambiente.</p><button onClick={() => open('story')}>Conheça nossa abordagem <b>↗</b></button></div>
        <div className="linha-stamp" aria-hidden="true">L</div>
      </section>
      <section className="linha-materials">
        <div className="linha-materials-title"><span>Matéria e atmosfera</span><h2>Projetar também é escolher o que se sente.</h2></div>
        <div className="linha-material-list">
          <button onClick={() => open('experiences')}><i>01</i><strong>Luz natural</strong><span>Sombras que mudam ao longo do dia</span></button>
          <button onClick={() => open('experiences')}><i>02</i><strong>Vegetação</strong><span>Natureza como parte da arquitetura</span></button>
          <button onClick={() => open('experiences')}><i>03</i><strong>Materialidade</strong><span>Texturas honestas e permanentes</span></button>
        </div>
      </section>
    </>}
    {isAmana && <><section className="demo-feature"><div><p>Pratos em destaque</p><h2>Terra, mar e fogo.</h2><span>Três caminhos para contar ingredientes, técnicas e histórias do Brasil.</span></div><div className="demo-feature-actions"><button onClick={() => open('menu')}>Terra</button><button onClick={() => open('menu')}>Mar</button><button onClick={() => open('menu')}>Fogo</button></div></section><section className="demo-sell"><p>Demonstração comercial</p><h2>Imagine o seu restaurante aqui.</h2><span>Uma presença digital profissional pode apresentar sua essência, facilitar reservas e transformar visitantes em clientes.</span><div className="demo-benefits"><b>Mais credibilidade</b><b>Mais reservas</b><b>Cardápio acessível</b><b>WhatsApp integrado</b></div><button className="button primary" onClick={() => open('sales')}>Quero um site para meu restaurante ↗</button></section></>}
    {isBravo && <><section className="demo-team"><p>Especialistas</p><h2>Escolha quem cuida do seu estilo.</h2><div>{[['Rafael Costa · Clássicos',asset('bravo-rafael.png')],['Lucas Mendes · Degradês',asset('bravo-lucas.png')],['Caio Martins · Barba',asset('bravo-caio.png')]].map(([name,image]) => <article key={name}><img className="barber-photo" src={image} alt={`Retrato de ${name.split(' · ')[0]}`} /><h3>{name}</h3><span>Mais de 6 anos de experiência</span><button onClick={() => open('barbers')}>Ver perfil ↗</button></article>)}</div></section><section className="demo-gallery gallery-minimal"><p>Galeria</p><h2>Trabalho, ambiente e detalhes.</h2><div className="gallery-filters">{['Todos','Cortes','Barba','Ambiente'].map(f => <button className={galleryFilter===f?'active':''} onClick={() => { setGalleryFilter(f); open('gallery'); }} key={f}>{f}</button>)}</div></section><section className="demo-sell"><p>Produtos</p><h2>Cuidado que continua em casa.</h2><div className="demo-benefits"><button onClick={() => open('products')}>Pomada matte · R$ 59</button><button onClick={() => open('products')}>Óleo para barba · R$ 49</button><button onClick={() => open('products')}>Shampoo BRAVO · R$ 42</button></div></section></>}
    <section className="demo-contact" id="contato"><p>{isBravo ? 'Seu próximo corte começa aqui' : isAmana ? 'Sua experiência começa aqui' : 'Vamos conversar'}</p><h2>{project.action}.</h2><button className="button primary" onClick={() => open('reservation')}>Abrir demonstração ↗</button></section>
    <footer className="demo-footer"><strong>{project.name}</strong><div>{nav.slice(0,4).map(([label,key]) => <button key={key} onClick={() => open(key)}>{label}</button>)}</div><a href={baseUrl}>Voltar ao portfólio de Mateus Duarte</a></footer>
    {isAmana && <button className="demo-help" onClick={() => open('understand')}>ⓘ Entenda este site</button>}
    {dialog && <div className="demo-overlay" role="presentation" onMouseDown={e => e.target === e.currentTarget && setDialog(null)}><section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <button className="dialog-close" onClick={() => setDialog(null)} aria-label="Fechar">Fechar</button>
      {sent ? <div className="demo-success"><p>Demonstração concluída</p><h2 id="dialog-title">Solicitação registrada.</h2><span>Nenhum dado foi enviado. Em um site publicado, o negócio receberia esta solicitação.</span><button className="button primary" onClick={() => setDialog(null)}>Continuar navegando</button></div> : dialog.key === 'reservation' ? <form onSubmit={e => { e.preventDefault(); setSent(true); }}><p>Ambiente de demonstração</p><h2 id="dialog-title">{dialog.title}</h2>{isBravo && <><label>Serviço<select required><option>Corte</option><option>Barba</option><option>Corte + Barba</option></select></label><label>Barbeiro<select required><option>Rafael</option><option>Lucas</option><option>Caio</option></select></label></>}<label>Data<input required type="date" /></label><label>Horário<select required><option>10:00</option><option>14:30</option><option>17:00</option></select></label>{isAmana && <label>Número de pessoas<select required><option>2 pessoas</option><option>3 pessoas</option><option>4 pessoas</option><option>5+ pessoas</option></select></label>}<button className="button primary" type="submit">{isBravo ? 'Simular agendamento' : 'Ver disponibilidade'}</button><div className="modal-benefit"><b>Como isso ajuda?</b><span>{dialog.benefit}</span></div></form> : <><p>Recurso do site</p><h2 id="dialog-title">{dialog.title}</h2>{dialog.key === 'menu' && <div className="menu-sample"><b>Entradas</b><span>Carpaccio de pupunha, castanhas e vinagrete cítrico</span><b>Principais</b><span>Peixe do dia, purê de raízes e molho da casa</span><b>Sobremesas</b><span>Cacau & Café, chocolate brasileiro e castanhas</span></div>}{dialog.key === 'journey' && <div className="journey-sample"><b>01 Produtor</b><b>02 Ingrediente</b><b>03 Cozinha</b><b>04 Experiência</b></div>}{dialog.key === 'contact' && <div className="contact-sample"><b>WhatsApp</b><span>“Olá! Conheci pelo site e gostaria de saber mais.”</span><b>Instagram · Telefone · Endereço · Maps</b></div>}<h3>Como funciona</h3><span>{dialog.how}</span><h3>Benefício para o negócio</h3><span>{dialog.benefit}</span><button className="button primary" onClick={() => dialog.key === 'sales' ? setDialog({key:'reservation',...featureCopy.reservation}) : setDialog(null)}>{dialog.key === 'sales' ? 'Solicitar uma apresentação' : 'Entendi'}</button></>}
    </section></div>}
  </main>;
}

function App() {
  const [activeProject, setActiveProject] = useState(0);
  const selectedProject = projects[activeProject];
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Desenvolvedor & Web Designer</p>
          <h1>Eu transformo ideias em <em>experiências digitais.</em></h1>
          <p className="hero-sub">Sites modernos e profissionais para empresas que querem se destacar e conquistar mais clientes.</p>
          <div className="actions"><a className="button primary" href="#projetos">Ver meus projetos <span>↘</span></a><a className="button secondary" href="#contato">Falar comigo</a></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-project hero-project-main"><img src={asset('portfolio-amana-real.png')} alt="" /></div>
          <div className="hero-project hero-project-side"><img src={asset('portfolio-linha-real.png')} alt="" /></div>
          <div className="logo-stage"><img src={asset('mateus-duarte-logo-blue.png')} alt="" /></div>
          <div className="orb"></div><p>Design com intenção.<br/>Código com precisão.</p>
        </div>
      </section>

      <section className="trust-strip" aria-label="Princípios de trabalho"><span>Estratégia antes da estética</span><span>Design responsivo</span><span>Performance e SEO</span><span>Contato direto com Mateus</span></section>

      <section className="section about" id="sobre">
        <Reveal className="about-title"><p className="section-kicker">Sobre mim</p><h2>Uma presença digital forte começa com decisões bem feitas.</h2></Reveal>
        <Reveal className="about-copy"><p>Sou desenvolvedor e web designer freelancer, focado em criar experiências digitais que unem estética, clareza e resultado.</p><p>Mesmo no início da minha trajetória profissional, trabalho com método, comunicação transparente e atenção aos detalhes. Cada projeto é construído de forma próxima, entendendo primeiro o negócio para depois escolher a melhor solução.</p><a className="text-link" href="#contato">Vamos conversar <span>↗</span></a></Reveal>
      </section>

      <section className="section services" id="servicos">
        <Reveal><h2>O que posso criar<br/>para o seu negócio.</h2></Reveal>
        <div className="service-grid">{services.map((s, i) => <Reveal className={`service service-${i+1}`} key={s[0]}><span className="service-index">0{i+1}</span><h3>{s[0]}</h3><p>{s[1]}</p></Reveal>)}</div>
      </section>

      <section className="section projects" id="projetos">
        <Reveal><p className="section-kicker">Projetos selecionados</p><h2>Trabalhos que transformam presença em percepção.</h2></Reveal>
        <div className="project-selector" role="tablist" aria-label="Selecionar projeto">{projects.map((p, i) => <button role="tab" aria-selected={activeProject === i} className={activeProject === i ? 'active' : ''} onClick={() => setActiveProject(i)} key={p.slug}><span>0{i + 1}</span><strong>{p.title}</strong><small>{p.type}</small></button>)}</div>
        <div className={`project-stage project-stage-${selectedProject.slug}`} key={selectedProject.slug}>
          <a className="project-stage-image" href={demoUrl(selectedProject.slug)} target="_blank" rel="noreferrer" aria-label={`Abrir site ${selectedProject.title} em nova aba`}><img src={selectedProject.image} alt={`Preview do site ${selectedProject.title}`} width="1294" height="912" /></a>
          <div className="project-stage-info"><span>{selectedProject.type}</span><h3>{selectedProject.title}</h3><p>{selectedProject.desc}</p><ul aria-label="Tecnologias">{selectedProject.tech.map(t => <li key={t}>{t}</li>)}</ul><a className="button primary" href={demoUrl(selectedProject.slug)} target="_blank" rel="noreferrer">Explorar projeto <span>↗</span></a></div>
        </div>
      </section>

      <section className="section skill-section">
        <Reveal><h2>Ferramentas que uso para tirar projetos do papel.</h2></Reveal>
        <div className="skills">{skills.map((skill, i) => <Reveal className="skill" key={skill}><span>{String(i+1).padStart(2,'0')}</span><strong>{skill}</strong></Reveal>)}</div>
      </section>

      <section className="section process" id="processo">
        <Reveal><h2>Um processo simples.<br/>Do primeiro papo ao site no ar.</h2></Reveal>
        <div className="process-grid">{process.map((p, i) => <Reveal className="process-item" key={p[0]}><span>{String(i+1).padStart(2,'0')}</span><h3>{p[0]}</h3><p>{p[1]}</p></Reveal>)}</div>
      </section>

      <section className="cta" id="contato">
        <Reveal><p>Seu próximo projeto pode começar aqui.</p><h2>Tem uma ideia?<br/><em>Vamos transformar em realidade.</em></h2><a className="button primary large" href="https://wa.me/message/4PRSWYXF67WIC1" target="_blank" rel="noreferrer">Entrar em contato <span>↗</span></a></Reveal>
      </section>
    </main>
    <footer>
      <div><a className="brand" href="#inicio"><img src={asset('mateus-duarte-logo-blue.png')} alt="" /><span>Mateus Duarte</span></a><p>Desenvolvimento web e design para marcas que querem ser lembradas.</p></div>
      <div className="contact-links"><a href="https://wa.me/message/4PRSWYXF67WIC1" target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a><a href="mailto:mateusduartesouza15@gmail.com">mateusduartesouza15@gmail.com <span>↗</span></a></div>
      <p className="footer-note">© 2026 Mateus Duarte. Feito com cuidado.</p>
    </footer>
  </>;
}

const demoSlug = window.location.hash.match(/^#\/projetos\/([^/]+)/)?.[1]
  ?? window.location.pathname.match(/^\/projetos\/([^/]+)/)?.[1];
createRoot(document.getElementById('root')).render(demoSlug && demoContent[demoSlug] ? <ProjectDemo project={demoContent[demoSlug]} /> : <App />);

