import { useState, useRef, useEffect } from 'react'

const B = import.meta.env.BASE_URL  // e.g. '/pedro-geo/'
const img = (name) => `${B}images/${name}`

// ─── Shared UI ──────────────────────────────────────────────────────────────

const c = {
  intro:      '#06b6d4',
  ibge:       '#a78bfa',
  divisoes:   '#f59e0b',
  norte:      '#22c55e',
  nordeste:   '#f97316',
  centrooeste:'#eab308',
  sudeste:    '#3b82f6',
  sul:        '#e879f9',
  resumao:    '#ef4444',
}

function ImgCard({ src, caption, source, alt }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{ marginBottom: 14, borderRadius: 14, overflow: 'hidden', background: '#1e293b', border: '1px solid #334155' }}>
      {!loaded && (
        <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a2236' }}>
          <span style={{ fontSize: 32, animation: 'pulse 2s infinite' }}>🖼️</span>
        </div>
      )}
      <img
        src={src}
        alt={alt || caption}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ width: '100%', maxHeight: 240, objectFit: 'cover', display: loaded ? 'block' : 'none' }}
      />
      {(caption || source) && (
        <div style={{ padding: '8px 12px', background: '#0f172a' }}>
          {caption && <div style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.4 }}>{caption}</div>}
          {source  && <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>📷 Fonte: {source}</div>}
        </div>
      )}
    </div>
  )
}

function Card({ children, accent, style }) {
  return (
    <div style={{
      background: '#1e293b',
      border: `1.5px solid ${accent ? accent + '55' : '#334155'}`,
      borderRadius: 14,
      padding: '16px',
      marginBottom: 14,
      ...style,
    }}>
      {children}
    </div>
  )
}

function InfoBox({ emoji, title, text, color }) {
  return (
    <div style={{
      background: color + '15',
      border: `1.5px solid ${color}44`,
      borderRadius: 12,
      padding: '14px',
      marginBottom: 14,
    }}>
      <div style={{ color, fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{emoji} {title}</div>
      <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.65 }}>{text}</div>
    </div>
  )
}

function SectionTitle({ emoji, title, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingTop: 4 }}>
      <span style={{ fontSize: 26 }}>{emoji}</span>
      <h2 style={{ color, fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>{title}</h2>
    </div>
  )
}

function Tag({ children, color }) {
  return (
    <span style={{
      background: color + '22',
      border: `1px solid ${color}55`,
      color,
      borderRadius: 6,
      padding: '3px 10px',
      fontSize: 12,
      fontWeight: 700,
      display: 'inline-block',
      marginRight: 6,
      marginBottom: 6,
    }}>
      {children}
    </span>
  )
}

function Li({ children }) {
  return <li style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, marginBottom: 2 }}>{children}</li>
}

function Strong({ children, color }) {
  return <strong style={{ color: color || '#fff', fontWeight: 700 }}>{children}</strong>
}

function HGallery({ images }) {
  return (
    <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: 14, scrollbarWidth: 'none' }}>
      {images.map((im, i) => (
        <div key={i} style={{ flexShrink: 0, width: '75vw', maxWidth: 280, borderRadius: 12, overflow: 'hidden', background: '#1e293b' }}>
          <img
            src={im.src}
            alt={im.caption}
            loading="lazy"
            style={{ width: '100%', height: 170, objectFit: 'cover' }}
          />
          <div style={{ padding: '6px 10px', background: '#0f172a' }}>
            <div style={{ color: '#94a3b8', fontSize: 11, lineHeight: 1.3 }}>{im.caption}</div>
            {im.source && <div style={{ color: '#475569', fontSize: 10, marginTop: 2 }}>📷 {im.source}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── SECTIONS ───────────────────────────────────────────────────────────────

function IntroSection() {
  return (
    <div>
      <SectionTitle emoji="🗺️" title="O que é Regionalização?" color={c.intro} />

      <HGallery images={[
        { src: img('capa_alter_chao_pa.jpg'),    caption: 'Ilha do Amor, Alter do Chão (PA) 🏠',    source: 'Luana/stock.adobe.com' },
        { src: img('capa_rio_amazonas.jpg'),      caption: 'Rio Amazonas',                            source: 'christian vinces/stock.adobe.com' },
        { src: img('capa_bumba_meu_boi.jpg'),     caption: 'Bumba meu Boi, São Luís (MA)',           source: 'ericatarina/stock.adobe.com' },
        { src: img('capa_vila_germanica_sc.jpg'), caption: 'Vila Germânica, Blumenau (SC)',           source: 'MAAD/stock.adobe.com' },
      ]} />

      <Card accent={c.intro}>
        <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.75 }}>
          Imagina que você e seus amigos vão dividir a turma em grupos para um projeto.
          Aí você pensa: <em style={{ color: c.intro }}>"Vou agrupar quem mora no mesmo bairro"</em> ou
          <em style={{ color: c.intro }}> "vou separar por time favorito"</em>. Isso é <Strong>regionalizar</Strong>!
        </p>
      </Card>

      <InfoBox emoji="📌" title="Definição oficial" color={c.intro}
        text="Regionalização é separar um lugar (cidade, estado, país ou continente) em grupos que têm características parecidas — como criar 'clãs' com coisas em comum!" />

      <ImgCard src={img('sala_de_aula.jpg')} caption="Você pode regionalizar até uma sala de aula!" source="dglimages/stock.adobe.com" />

      <Card>
        <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>🏫 Exemplos do dia a dia</div>
        <ul style={{ paddingLeft: 18 }}>
          <Li>Dividir a sala por bairro onde moram</Li>
          <Li>Separar os alunos por times de futebol</Li>
          <Li>Agrupar por mês de aniversário</Li>
          <Li>Área do professor × área dos alunos</Li>
        </ul>
        <div style={{ color: '#64748b', fontSize: 12, marginTop: 10, fontStyle: 'italic' }}>
          Cada critério diferente gera uma divisão diferente!
        </div>
      </Card>

      <InfoBox emoji="🖼️" title="Conceito: Paisagem Cultural" color="#a78bfa"
        text="Paisagem cultural é o resultado da interação do ser humano com a natureza. Mistura o que a natureza criou com o que as pessoas construíram: pontes, museus, estátuas, fazendas de cana... tudo isso é paisagem cultural!" />

      <InfoBox emoji="🤔" title="Por que regionalizar o Brasil?" color={c.intro}
        text="O Brasil é GIGANTE! Tem floresta amazônica, sertão seco, campo gelado no Sul, praias tropicais... São realidades completamente diferentes. O governo precisa entender cada região para criar leis e investimentos que realmente ajudem cada lugar." />

      <Card accent="#22c55e">
        <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 14, marginBottom: 12 }}>✅ Para que serve a regionalização?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['🏥','Construir hospitais certos'],['🚰','Resolver falta de água'],['📚','Planejar escolas'],['💼','Criar empregos'],['🌿','Proteger a natureza'],['💰','Distribuir investimentos']].map(([e, t]) => (
            <div key={t} style={{ background: '#0f2917', borderRadius: 8, padding: '8px', color: '#86efac', fontSize: 12 }}>
              <span style={{ marginRight: 4 }}>{e}</span>{t}
            </div>
          ))}
        </div>
      </Card>

      <InfoBox emoji="💡" title="Exemplo real" color={c.divisoes}
        text="Se uma cidade tem muitos bebês nascendo, precisa de mais creches. Se uma região tem muita seca (como o Sertão), precisa de açudes. Só dá para saber isso com regionalização!" />
    </div>
  )
}

function IBGESection() {
  return (
    <div>
      <SectionTitle emoji="📊" title='O IBGE: o "detetive" do Brasil' color={c.ibge} />

      <InfoBox emoji="🔍" title="O que é o IBGE?" color={c.ibge}
        text="O Instituto Brasileiro de Geografia e Estatística (IBGE) é o órgão do governo que mapeia, mede e entende o Brasil. Ele realiza censos, pesquisas e cria a divisão regional oficial do país." />

      <ImgCard src={img('ibge_historico.jpg')} caption="Histórico da evolução da divisão regional do Brasil" source="Reprodução / Material Didático" />

      <SectionTitle emoji="⏳" title="Como o IBGE surgiu?" color="#64748b" />

      <div style={{ paddingLeft: 16 }}>
        {[
          { ano: '1871', cor: c.ibge, titulo: 'Diretoria Geral de Estatística', desc: 'Criado no período imperial para coletar dados do Império Brasileiro.' },
          { ano: '1889', cor: c.intro, titulo: 'República → Expansão', desc: 'Com a República, surgiram registros de nascimentos, casamentos e mortes, exigindo mais organização.' },
          { ano: '1934', cor: c.divisoes, titulo: 'Instituto Nacional de Estatística', desc: 'Criado para organizar os dados. O Dep. Nacional de Estatística foi fechado nessa época.' },
          { ano: '1937', cor: '#22c55e', titulo: '🎉 Nasce o IBGE!', desc: 'O Conselho Brasileiro de Geografia se juntou ao INE e surgiu o IBGE — o mesmo que existe até hoje!' },
        ].map((item, i, arr) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.cor, flexShrink: 0, marginTop: 4 }} />
              {i < arr.length - 1 && <div style={{ width: 2, background: '#334155', flex: 1, marginTop: 4 }} />}
            </div>
            <div style={{ background: '#1e293b', border: `1px solid ${item.cor}44`, borderRadius: 10, padding: '10px 12px', flex: 1, marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Tag color={item.cor}>{item.ano}</Tag>
                <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: 13 }}>{item.titulo}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <InfoBox emoji="📋" title="O que é um Censo?" color={c.intro}
        text="O censo é uma pesquisa feita a cada 10 anos onde o IBGE visita TODAS as casas do Brasil para contar quantas pessoas existem, como vivem, qual a renda, escolaridade etc. É como um 'save' do jogo que registra a situação de todo o país!" />

      <InfoBox emoji="📜" title="Conceito: Constituição Federal" color={c.divisoes}
        text="A Constituição Federal é o conjunto de leis mais importantes do país — nenhuma outra lei pode contrariá-la. É como as 'regras do jogo' que todo brasileiro deve seguir. A atual foi promulgada em 5 de outubro de 1988, depois do fim da Ditadura Militar." />

      <Card accent={c.ibge}>
        <div style={{ color: c.ibge, fontWeight: 800, fontSize: 14, marginBottom: 10 }}>🎯 O que o IBGE faz?</div>
        <ul style={{ paddingLeft: 18 }}>
          <Li>Realiza o <Strong>Censo Demográfico</Strong> (a cada 10 anos)</Li>
          <Li>Mapeia o território brasileiro</Li>
          <Li>Faz censos <Strong>industrial</Strong> e <Strong>agropecuário</Strong></Li>
          <Li>Cria a <Strong>divisão regional oficial</Strong> do Brasil</Li>
          <Li>Acompanha a dinâmica econômica do país</Li>
        </ul>
      </Card>
    </div>
  )
}

function DivicoesSection() {
  return (
    <div>
      <SectionTitle emoji="🔀" title="As 3 Formas de Dividir o Brasil" color={c.divisoes} />

      <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
        Não existe só UMA forma de dividir o Brasil. Dependendo do <Strong color={c.divisoes}>critério</Strong> que você usa, o resultado é diferente!
      </p>

      {/* Divisão 1 - IBGE */}
      <Card accent="#3b82f6" style={{ background: '#0f1a2e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🏛️</span>
          <div>
            <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: 15 }}>1ª Divisão: 5 Macrorregiões do IBGE</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Divisão oficial — desde 1970 / Constituição de 1988</div>
          </div>
        </div>
        <ImgCard src={img('mapa_5_regioes.jpg')} caption="As 5 macrorregiões oficiais do Brasil" source="IBGE" />
        <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
          É a divisão <Strong>oficial</Strong> do governo. Estabelecida em 1970 e ajustada pela Constituição de 1988 (quando criaram o Tocantins).
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[['🌿','Norte','#22c55e'],['☀️','Nordeste','#f97316'],['🌾','Centro-Oeste','#eab308'],['🏙️','Sudeste','#3b82f6'],['❄️','Sul','#e879f9']].map(([e,r,cor]) => (
            <div key={r} style={{ background: cor+'20', border:`1px solid ${cor}55`, borderRadius: 8, padding:'6px 10px', textAlign:'center', flex:'1', minWidth: 56 }}>
              <div style={{ fontSize: 18 }}>{e}</div>
              <div style={{ color: cor, fontSize: 11, fontWeight: 800, lineHeight: 1.3 }}>{r}</div>
            </div>
          ))}
        </div>
        <div style={{ color: '#64748b', fontSize: 12, marginTop: 10 }}>📌 Critério: limites dos estados + características naturais e históricas</div>
      </Card>

      {/* Divisão 2 - Geiger */}
      <Card accent={c.ibge} style={{ background: '#1a1130' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🧑‍🔬</span>
          <div>
            <div style={{ color: c.ibge, fontWeight: 900, fontSize: 15 }}>2ª Divisão: 3 Complexos Geoeconômicos</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Pedro Pinchas Geiger — 1967</div>
          </div>
        </div>
        <ImgCard src={img('mapa_complexos_geoecon.jpg')} caption="Os 3 complexos geoeconômicos de Pedro Geiger" source="IBGE" />
        <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
          Geógrafo <Strong>Pedro Pinchas Geiger</Strong> criou essa divisão. Usou critérios de economia, história e cultura. <Strong color={c.ibge}>Não respeita os limites dos estados!</Strong>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Amazônia','#22c55e','Área da Floresta Amazônica. Mais da metade do Brasil. Extrativismo e agropecuária.'],['Nordeste','#f97316','Onde o Brasil começou. Hoje tem os menores índices de desenvolvimento do país.'],['Centro-Sul','#3b82f6','"Coração econômico" do Brasil. SP, RJ, BH. Maior indústria e população.']].map(([n,cor,d]) => (
            <div key={n} style={{ background:cor+'15', border:`1px solid ${cor}44`, borderRadius:10, padding:'10px 12px' }}>
              <div style={{ color:cor, fontWeight:800, fontSize:14, marginBottom:4 }}>{n}</div>
              <div style={{ color:'#94a3b8', fontSize:12, lineHeight:1.5 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ color: '#64748b', fontSize: 12, marginTop: 10 }}>📌 Critério: formação histórica + econômica + cultural. Ignora fronteiras dos estados.</div>
      </Card>

      {/* Divisão 3 - Milton Santos */}
      <Card accent={c.divisoes} style={{ background: '#1a1500' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>💻</span>
          <div>
            <div style={{ color: c.divisoes, fontWeight: 900, fontSize: 15 }}>3ª Divisão: Os 4 Brasis</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Milton Santos e Maria Laura Silveira — 2001</div>
          </div>
        </div>
        <ImgCard src={img('mapa_4_brasis.jpg')} caption="Os 4 Brasis de Milton Santos e Maria Laura Silveira" source="IBGE" />
        <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
          Criada em 2001. O critério é o acesso à <Strong color={c.divisoes}>tecnologia e informação</Strong>. Respeita os limites dos municípios.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['Amazônia','#22c55e','Baixa densidade. Pouco acesso à tecnologia.'],['Nordeste','#f97316','Climas tropical e semiárido. Parte sem acesso às necessidades básicas.'],['Centro-Oeste','#eab308','Agronegócio hi-tech! Soja e carne para o mundo.'],['Concentrada','#3b82f6','= Sul + Sudeste. Mais industrializada e moderna.']].map(([n,cor,d]) => (
            <div key={n} style={{ background:cor+'15', border:`1px solid ${cor}44`, borderRadius:10, padding:'10px' }}>
              <div style={{ color:cor, fontWeight:800, fontSize:13, marginBottom:4 }}>{n}</div>
              <div style={{ color:'#94a3b8', fontSize:11, lineHeight:1.5 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ color: '#64748b', fontSize: 12, marginTop: 10 }}>📌 Critério: tecnologia + ciência + informação. Respeita limites dos municípios.</div>
      </Card>

      <InfoBox emoji="🎯" title="Como diferenciar na prova?" color="#ef4444"
        text="IBGE = 5 regiões + oficial | Geiger = 3 complexos + sem fronteiras dos estados | Milton Santos = 4 Brasis + tecnologia como critério. Memorize quem criou e quantas divisões tem!" />
    </div>
  )
}

function NorteSection() {
  return (
    <div>
      <SectionTitle emoji="🌿" title="Região Norte" color={c.norte} />
      <div style={{ marginBottom: 14 }}>
        {['7 estados','Maior região do Brasil','Floresta Amazônica','Rio Amazonas'].map(t => <Tag key={t} color={c.norte}>{t}</Tag>)}
      </div>

      <ImgCard src={img('norte_mapa.jpg')} caption="Mapa da Região Norte do Brasil" source="IBGE" />

      <Card accent={c.norte}>
        <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>🗺️ Os 7 Estados</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Acre (AC)','Amapá (AP)','Amazonas (AM)','Pará (PA) 🏠','Rondônia (RO)','Roraima (RR)','Tocantins (TO)'].map(s => (
            <div key={s} style={{ background:'#22c55e15', border:'1px solid #22c55e44', borderRadius:8, padding:'6px 10px', color:'#86efac', fontSize:12, fontWeight:600 }}>{s}</div>
          ))}
        </div>
        <div style={{ color:'#64748b', fontSize:12, marginTop:10 }}>🏠 Você mora no Pará! Belém é uma das maiores cidades da Região Norte.</div>
      </Card>

      <ImgCard src={img('norte_belem_pa.jpg')} caption="Vista parcial de Belém (PA) — sua cidade! 🏠" source="Pedro Magrod/stock.adobe.com" />

      <InfoBox emoji="📏" title="Curiosidade de tamanho!" color={c.norte}
        text="O estado do Amazonas é o MAIOR do Brasil — cerca de 36 vezes maior que o Rio de Janeiro! E o Tocantins é o mais novo, criado pela Constituição de 1988 (antes era parte de Goiás)." />

      <Card>
        <div style={{ color: c.norte, fontWeight: 800, fontSize: 14, marginBottom: 10 }}>🌊 Clima e Vegetação</div>
        <ul style={{ paddingLeft: 18 }}>
          <Li><Strong>Clima equatorial</Strong>: quente e úmido o ano todo</Li>
          <Li>Vegetação: <Strong color={c.norte}>Floresta Amazônica</Strong> — maior reserva de biodiversidade do planeta!</Li>
          <Li>Em Roraima: Campos e Cerrado</Li>
          <Li>No litoral (Amapá e Pará 🏠): Manguezais</Li>
          <Li>Vegetação <Strong>higrófila</Strong> = plantas que adoram muita água</Li>
        </ul>
      </Card>

      <ImgCard src={img('norte_transporte_rio.jpg')} caption="Transporte escolar navegando no Rio Amazonas, Manaus (AM), 2022" source="Luis Salvatore/Pulsar Imagens" />

      <InfoBox emoji="🚢" title="Transporte: de barco!" color="#06b6d4"
        text="Na Região Norte, o transporte HIDROVIÁRIO (de barco) é mais importante que o rodoviário (de caminhão)! Os rios são as 'estradas' da Amazônia. Inclusive tem ônibus escolar de barco no Rio Amazonas!" />

      <InfoBox emoji="🏗️" title="A SUDAM: como o governo ocupou o Norte" color={c.ibge}
        text="Nos anos 1960, o governo militar criou a SUDAM (Superintendência para o Desenvolvimento da Amazônia) para incentivar empresas a investirem na região. Em 1967, criou também a SUFRAMA (Superintendência da Zona Franca de Manaus)." />

      <ImgCard src={img('norte_aldeia_indigena.jpg')} caption="Vista de drone da aldeia indígena Terra Preta (AM), 2023. Etnias Baré, Baniwa, Tucano e Curipaco." source="Marcos Amend/Pulsar Imagens" />

      <Card>
        <div style={{ color: c.norte, fontWeight: 800, fontSize: 14, marginBottom: 12 }}>💰 Economia da Região Norte</div>

        {[
          { e:'🪨', t:'Extrativismo Mineral', d:'Minério de ferro, ouro, bauxita, manganês, estanho. Destaque para a Serra dos Carajás e Vale do Rio Tapajós — ambos no Pará! 🏠', img_src: img('norte_carajas_pa.jpg'), cap:'Vista de satélite das minas da Serra dos Carajás (PA) 🏠', src:'Wikimedia Commons' },
          { e:'🌳', t:'Extrativismo Vegetal', d:'Madeira, látex, castanha-do-pará, açaí e buriti. Atenção: o extrativismo predatório causa desmatamento!', img_src: img('norte_acai.jpg'), cap:'Coleta de açaí na Floresta Amazônica', src:'Imago Photo/stock.adobe.com' },
          { e:'🌱', t:'Agropecuária', d:'Soja (Rondônia e Tocantins lideram), pecuária bovina extensiva, búfalos (maior rebanho do Brasil, na Ilha de Marajó — no Pará! 🏠). Cultivos tradicionais: pimenta-do-reino e juta, introduzidos por imigrantes japoneses por volta de 1933.', img_src: img('norte_bufalos_pa.jpg'), cap:'Criação de búfalos no nordeste do Pará 🏠', src:'Tarcisio Schnaider/Shutterstock' },
          { e:'🏭', t:'Zona Franca de Manaus', d:'Criada em 1967: polo industrial com isenção de impostos. Produz eletrônicos e eletrodomésticos. Principal indústria da região!', img_src: img('norte_zona_franca.jpg'), cap:'Zona Franca de Manaus (AM)', src:'Pulsar Imagens/stock.adobe.com' },
        ].map(({ e, t, d, img_src, cap, src }) => (
          <div key={t} style={{ background:'#0f2917', borderRadius:10, padding:'12px', marginBottom:10 }}>
            <div style={{ color:'#86efac', fontWeight:700, fontSize:13, marginBottom:6 }}>{e} {t}</div>
            <div style={{ color:'#94a3b8', fontSize:13, lineHeight:1.5, marginBottom:10 }}>{d}</div>
            <ImgCard src={img_src} caption={cap} source={src} />
          </div>
        ))}
      </Card>

      <Card accent="#ef4444">
        <div style={{ color:'#f87171', fontWeight:800, fontSize:14, marginBottom:10 }}>⚠️ Problemas Ambientais</div>
        <ul style={{ paddingLeft:18 }}>
          <Li><Strong>Desmatamento</Strong>: agropecuária e madeireiros ilegais destroem a floresta</Li>
          <Li><Strong>Queimadas</Strong>: contribuem para o aquecimento global</Li>
          <Li><Strong>Usinas hidrelétricas</Strong>: alagam áreas de floresta e deslocam populações</Li>
        </ul>
        <ImgCard src={img('norte_belo_monte_pa.jpg')} caption="Usina de Belo Monte em Altamira (PA) 🏠 — exemplo de impacto ambiental" source="Wikimedia Commons" />
        <Li><Strong>Biopirataria</Strong>: roubo de plantas medicinais únicas da floresta</Li>
      </Card>

      <InfoBox emoji="🌍" title="Amazônia Legal" color={c.ibge}
        text="A 'Amazônia Legal' foi criada pelo governo e é maior que a Região Norte oficial. Inclui todos os estados do Norte + Mato Grosso + parte do Maranhão." />
    </div>
  )
}

function NordesteSection() {
  const [sub, setSub] = useState(null)
  const subs = [
    { n:'🌊 Zona da Mata', c:'#06b6d4', items:[
        'Faixa litorânea do Rio Grande do Norte ao sul da Bahia',
        'Clima: tropical litorâneo úmido — chuvas regulares',
        'Solo: massapê (muito fértil!) — ótimo para cana-de-açúcar',
        'Cultivos: cana-de-açúcar, tabaco (desde o séc. XVI no Recôncavo Baiano), cacau',
        'SUB-REGIÃO MAIS DESENVOLVIDA do Nordeste',
        'Concentra a maioria das capitais nordestinas, portos e indústrias',
        'Bahia = maior produtor de cacau do Brasil',
      ], img_src: img('sala_de_aula.jpg'),
    },
    { n:'🌄 Agreste', c:'#a78bfa', items:[
        'Zona de TRANSIÇÃO entre Zona da Mata (úmida) e Sertão (seco)',
        'Tem tanto Mata Atlântica (leste) quanto Caatinga (oeste)',
        'Relevo elevado → barragem das massas de ar úmidas → chuva orográfica',
        'Temperatura mais amena por causa da altitude',
        'Produzia alimentos para a Zona da Mata açucareira no período colonial',
        'Produtos: laranja, fumo, verduras, café, milho, feijão',
        'Sisal: fibra vegetal usada para fazer cordas e sacos — cultivada nas partes mais secas',
        'Tropeiros: condutores de gado que passavam pelo Agreste entre o litoral e o Sertão',
        'Rio São Francisco = "rio dos currais" porque o gado avançou até suas margens',
        'Feiras famosas: Caruaru (PE), Campina Grande (PB)',
      ], img_src: img('nordeste_agreste.jpg'),
    },
    { n:'🌵 Sertão', c:'#f97316', items:[
        'MAIOR sub-região em extensão territorial',
        'Clima: Semiárido — chuvas escassas (<800mm/ano) e irregulares',
        'Vegetação: CAATINGA — aspecto cinza na seca, plantas xerófilas (cactos!)',
        'Rios INTERMITENTES: ficam secos em certos meses. Exceção: Rio São Francisco (perene)',
        'Solução: AÇUDES para guardar água',
        'Transposição do Rio São Francisco: 2 canais com 477km para levar água ao sertão',
        'Fruticultura irrigada: manga, abacaxi, melão, uva no Vale do São Francisco',
      ], img_src: img('nordeste_caatinga.jpg'),
    },
    { n:'🌴 Meio-Norte', c:'#22c55e', items:[
        'Segunda maior sub-região em extensão',
        'Estados: Maranhão + parte do Piauí',
        'TRANSIÇÃO entre Sertão semiárido e Amazônia úmida',
        'Vegetação: Mata dos Cocais (babaçu e carnaúba)',
        'Babaçu: produz óleo para margarina, sabão',
        'Carnaúba: usada em ceras, vernizes e cosméticos',
        'Nas últimas décadas: soja, algodão e arroz mecanizados chegando do Centro-Oeste',
        'Cidades importantes: Teresina (PI) e Imperatriz (MA)',
      ], img_src: img('nordeste_babacu_ma.jpg'),
    },
  ]

  return (
    <div>
      <SectionTitle emoji="☀️" title="Região Nordeste" color={c.nordeste} />
      <div style={{ marginBottom: 14 }}>
        {['9 estados','18% do território','Onde o Brasil começou','4 sub-regiões'].map(t => <Tag key={t} color={c.nordeste}>{t}</Tag>)}
      </div>

      <ImgCard src={img('nordeste_mapa.jpg')} caption="Mapa da Região Nordeste do Brasil" source="IBGE" />

      <Card accent={c.nordeste}>
        <div style={{ color:'#94a3b8', fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>🗺️ Os 9 Estados</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {['Alagoas','Bahia','Ceará','Maranhão','Paraíba','Pernambuco','Piauí','Rio Grande do Norte','Sergipe'].map(s => (
            <div key={s} style={{ background:'#f9731615', border:'1px solid #f9731644', borderRadius:8, padding:'5px 10px', color:'#fdba74', fontSize:12, fontWeight:600 }}>{s}</div>
          ))}
        </div>
      </Card>

      <InfoBox emoji="⏳" title="Onde o Brasil começou!" color={c.nordeste}
        text="Foi no Nordeste que os portugueses chegaram primeiro! Extraíram pau-brasil, cultivaram cana-de-açúcar e criaram gado. No período colonial, era a região MAIS RICA do Brasil. Hoje, é uma das que mais precisa de políticas públicas." />

      <Card>
        <div style={{ color:c.nordeste, fontWeight:800, fontSize:14, marginBottom:10 }}>🌡️ Climas do Nordeste</div>
        <ul style={{ paddingLeft:18 }}>
          <Li><Strong>Tropical Brasil Central</Strong>: chuvas no verão, seca no inverno (mai-set)</Li>
          <Li><Strong>Tropical Nordeste Oriental</Strong> (litoral): seca no verão! Ao contrário do típico.</Li>
          <Li><Strong>Semiárido</Strong>: pouca chuva, irregular, seca pode durar 6+ meses</Li>
        </ul>
      </Card>

      {/* Sub-regiões */}
      <div style={{ color:c.nordeste, fontWeight:900, fontSize:17, marginBottom:8 }}>🗺️ As 4 Sub-regiões</div>
      <ImgCard src={img('nordeste_subregioes.jpg')} caption="Mapa das sub-regiões do Nordeste" source="IBGE" />

      <p style={{ color:'#64748b', fontSize:13, marginBottom:12 }}>Toque em cada sub-região para ver os detalhes 👇</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14 }}>
        {subs.map(s => (
          <button key={s.n} onClick={() => setSub(sub === s.n ? null : s.n)} style={{
            background: sub===s.n ? s.c+'25' : '#1e293b',
            border:`2px solid ${sub===s.n ? s.c : s.c+'44'}`,
            borderRadius:12, padding:'12px 10px', textAlign:'left', transition:'all 0.2s',
          }}>
            <div style={{ color:s.c, fontWeight:800, fontSize:13 }}>{s.n}</div>
          </button>
        ))}
      </div>

      {sub && (() => {
        const s = subs.find(x => x.n === sub)
        return (
          <Card accent={s.c} style={{ background: s.c+'10' }}>
            <div style={{ color:s.c, fontWeight:800, fontSize:15, marginBottom:10 }}>{s.n}</div>
            {s.img_src && <ImgCard src={s.img_src} caption={s.n.replace(/^\S+ /,'')} source="Material Didático" />}
            <ul style={{ paddingLeft:18 }}>
              {s.items.map((item,i) => <Li key={i}>{item}</Li>)}
            </ul>
          </Card>
        )
      })()}

      <ImgCard src={img('nordeste_feira_caruaru.jpg')} caption="Feira de Caruaru (PE) — famosa feira do Agreste" source="Reprodução / Material Didático" />

      <ImgCard src={img('nordeste_uva_sao_francisco.jpg')} caption="Cultivo de uva irrigado no Vale do São Francisco" source="Reprodução / Material Didático" />

      <Card accent={c.nordeste}>
        <div style={{ color:c.nordeste, fontWeight:800, fontSize:14, marginBottom:12 }}>💰 Economia do Nordeste</div>
        {[['🌿','Cana-de-açúcar','Desde o período colonial. O Sertão sofre com as secas.'],['🍇','Fruticultura irrigada','Vale do São Francisco: manga, uva, abacaxi, melão — para exportação.'],['🧂','Sal marinho','Rio Grande do Norte é o MAIOR produtor de sal do Brasil.'],['🐐','Caprinocultura','Maior rebanho de caprinos (cabras) do país. BA, PE, PI e CE se destacam.'],['🦐','Carcinicultura','99,3% do camarão nacional vem do Nordeste! (IBGE 2013)'],['🍷','Vinicultura','8 milhões de litros de vinho/ano no Vale do São Francisco. 15% do mercado interno!'],['🏖️','Turismo','Praias exuberantes e centros históricos atraem brasileiros e estrangeiros.'],['🏭','Indústria','Desde os anos 1990, indústrias migraram do Sudeste para o Nordeste.']].map(([e,t,d]) => (
          <div key={t} style={{ display:'flex', gap:10, background:'#1e1008', borderRadius:8, padding:'8px 10px', marginBottom:8 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{e}</span>
            <div>
              <div style={{ color:'#fdba74', fontWeight:700, fontSize:13 }}>{t}</div>
              <div style={{ color:'#94a3b8', fontSize:12, lineHeight:1.5 }}>{d}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

function CentroOesteSection() {
  return (
    <div>
      <SectionTitle emoji="🌾" title="Região Centro-Oeste" color={c.centrooeste} />
      <div style={{ marginBottom:14 }}>
        {['3 estados + DF','Sem litoral','Capital do Brasil','Maior produtora agropecuária'].map(t => <Tag key={t} color={c.centrooeste}>{t}</Tag>)}
      </div>

      <ImgCard src={img('centrooeste_mapa.jpg')} caption="Mapa da Região Centro-Oeste do Brasil" source="IBGE" />

      <Card accent={c.centrooeste}>
        <div style={{ color:'#94a3b8', fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>🗺️ Os Estados</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {['Goiás (GO)','Mato Grosso (MT)','Mato Grosso do Sul (MS)','Distrito Federal (Brasília) ⭐'].map(s => (
            <div key={s} style={{ background:'#eab30815', border:'1px solid #eab30844', borderRadius:8, padding:'6px 10px', color:'#fde047', fontSize:12, fontWeight:600 }}>{s}</div>
          ))}
        </div>
        <div style={{ color:'#64748b', fontSize:12, marginTop:10 }}>⭐ Brasília é a capital federal — sede do governo brasileiro!</div>
      </Card>

      <InfoBox emoji="🏙️" title="A criação de Brasília" color={c.centrooeste}
        text="A ocupação do Centro-Oeste ganhou força com a construção de Brasília, inaugurada em 1960. Antes disso, a capital era o Rio de Janeiro! O governo decidiu criar uma capital nova no centro do país para desenvolver o interior." />

      <Card>
        <div style={{ color:c.centrooeste, fontWeight:800, fontSize:14, marginBottom:10 }}>🌡️ Clima e Vegetação</div>
        <ul style={{ paddingLeft:18 }}>
          <Li><Strong>Clima tropical continental</Strong> (semiúmido): verão quente e chuvoso, inverno SECO</Li>
          <Li>Temperatura média acima de 22°C</Li>
          <Li>Vegetação principal: <Strong color={c.centrooeste}>CERRADO</Strong> — árvores retorcidas, galhos e troncos grossos</Li>
          <Li>Norte de MT: <Strong color="#22c55e">Floresta Amazônica</Strong></Li>
          <Li>Sul de MS: <Strong color={c.ibge}>Campos</Strong> (gramíneas, ótimos para pecuária)</Li>
          <Li><Strong color="#06b6d4">Pantanal</Strong>: sudoeste do MT e oeste do MS — mistura de vegetações</Li>
          <Li><Strong>Matas de Galeria</Strong>: nas margens dos rios — estão sendo destruídas pelo agronegócio</Li>
        </ul>
      </Card>

      <ImgCard src={img('centrooeste_chapada.jpg')} caption="Parque Nacional da Chapada dos Veadeiros, Alto Paraíso de Goiás (GO)" source="cassiobraga/stock.adobe.com" />
      <ImgCard src={img('centrooeste_pantanal.jpg')} caption="Paisagem do Pantanal (MT) com diferentes tipos de vegetação" source="Uwe Bergwitz/stock.adobe.com" />

      <InfoBox emoji="🌊" title="Rios em 3 destinos" color="#06b6d4"
        text="Os rios do Centro-Oeste vão para 3 lugares: alguns alimentam a Bacia Amazônica, outros vão para a Bacia Platina (rios Paraguai e Paraná) e outros ainda alimentam a Bacia Tocantins-Araguaia." />

      <Card accent="#22c55e">
        <div style={{ color:'#22c55e', fontWeight:800, fontSize:14, marginBottom:10 }}>🌱 Agropecuária: o gigante do Brasil</div>
        <ul style={{ paddingLeft:18 }}>
          <Li>Maior produtora de agropecuária do Brasil</Li>
          <Li><Strong>Mato Grosso</Strong>: estado que mais produz na região!</Li>
          <Li>Principal produto: <Strong color={c.centrooeste}>soja</Strong> — exportada para o mundo todo</Li>
          <Li>Pecuária bovina extensiva — muita tecnologia (vacinas, rações especiais)</Li>
        </ul>
        <ImgCard src={img('centrooeste_soja.jpg')} caption="Plantação de soja em área de proteção da Floresta Amazônica (MT)" source="Marcus Mesquita/Shutterstock" />
        <ImgCard src={img('centrooeste_pecuaria.jpg')} caption="Pecuária extensiva em Mato Grosso do Sul" source="EPasqualli/stock.adobe.com" />
      </Card>

      <ImgCard src={img('centrooeste_bonito_ms.jpg')} caption="Rio Sucuri em Bonito (MS) — turismo é atividade importante na região" source="Paulo H. Pigozzi/stock.adobe.com" />

      <Card accent="#ef4444">
        <div style={{ color:'#f87171', fontWeight:800, fontSize:14, marginBottom:10 }}>⚠️ Crise Ambiental do Cerrado</div>
        <ul style={{ paddingLeft:18 }}>
          <Li>~50% da vegetação do <Strong>Cerrado</Strong> já foi destruída (INPE)</Li>
          <Li>O Cerrado é um <Strong color="#ef4444">hotspot mundial</Strong> de biodiversidade: tem pelo menos <Strong>1.500 espécies endêmicas</Strong> de plantas e já perdeu mais de ¾ da vegetação original</Li>
          <Li>Só ~10% do Cerrado é área protegida — muito vulnerável!</Li>
          <Li>Pantanal: garimpos de ouro contaminam rios com <Strong>mercúrio</Strong></Li>
        </ul>
      </Card>
    </div>
  )
}

function SudesteSection() {
  return (
    <div>
      <SectionTitle emoji="🏙️" title="Região Sudeste" color={c.sudeste} />
      <div style={{ marginBottom:14 }}>
        {['4 estados','Mais populosa','54% da indústria','Maior PIB'].map(t => <Tag key={t} color={c.sudeste}>{t}</Tag>)}
      </div>

      <ImgCard src={img('sudeste_mapa.jpg')} caption="Mapa da Região Sudeste do Brasil" source="IBGE" />

      <Card accent={c.sudeste}>
        <div style={{ color:'#94a3b8', fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>🗺️ Os 4 Estados</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {['São Paulo (SP) ⭐','Rio de Janeiro (RJ)','Minas Gerais (MG)','Espírito Santo (ES)'].map(s => (
            <div key={s} style={{ background:'#3b82f615', border:'1px solid #3b82f644', borderRadius:8, padding:'6px 10px', color:'#93c5fd', fontSize:12, fontWeight:600 }}>{s}</div>
          ))}
        </div>
        <div style={{ color:'#64748b', fontSize:12, marginTop:10 }}>⭐ SP é a maior cidade do Brasil e uma das maiores do mundo!</div>
      </Card>

      <Card>
        <div style={{ color:c.sudeste, fontWeight:800, fontSize:14, marginBottom:10 }}>⛰️ Relevo</div>
        <ul style={{ paddingLeft:18 }}>
          <Li>Predominam <Strong>planaltos</Strong> — ótimos para usinas hidrelétricas!</Li>
          <Li>Serra da Mantiqueira, Serra do Espinhaço, Serra da Canastra (MG)</Li>
          <Li>Serra do Mar (SP até o Sul)</Li>
          <Li>Rios de planalto → quedas d'água → energia elétrica</Li>
        </ul>
      </Card>

      <InfoBox emoji="🌿" title="Vegetação original" color="#22c55e"
        text="A vegetação original é a Mata Atlântica (muito devastada hoje). Mas tem também: Cerrado (centro de SP e MG), Caatinga (extremo norte de MG), Mata dos Pinhais (partes de SP e MG) e Restinga/Manguezais no litoral." />

      <Card accent={c.divisoes}>
        <div style={{ color:c.divisoes, fontWeight:800, fontSize:14, marginBottom:12 }}>💰 Economia</div>

        <div style={{ color:'#93c5fd', fontWeight:700, fontSize:13, marginBottom:6 }}>🌾 Agropecuária</div>
        <ul style={{ paddingLeft:18, marginBottom:10 }}>
          <Li>Soja, milho, <Strong>café</Strong> (MG e ES são os maiores produtores nacionais!)</Li>
          <Li><Strong>Laranja</Strong>: SP é o maior exportador mundial de suco de laranja!</Li>
          <Li><Strong>Leite</Strong>: MG é o maior produtor nacional</Li>
          <Li><Strong>Etanol</Strong>: cana-de-açúcar → combustível (Proálcool, anos 1970)</Li>
        </ul>
        <ImgCard src={img('sudeste_laranja_sp.jpg')} caption="Plantação de laranjas em Araraquara (SP)" source="Alf Ribeiro/Shutterstock" />

        <div style={{ color:'#93c5fd', fontWeight:700, fontSize:13, marginBottom:6 }}>⛏️ Mineração</div>
        <ul style={{ paddingLeft:18, marginBottom:10 }}>
          <Li>MG responde por mais de 1/3 da mineração metálica do Brasil</Li>
          <Li><Strong>Quadrilátero Ferrífero</Strong>: região em MG que produz ~50% do minério de ferro do país</Li>
          <Li><Strong>Pré-sal</Strong>: petróleo descoberto em 2005 nas Bacias de Santos e Campos, exploração desde 2012</Li>
        </ul>
        <ImgCard src={img('sudeste_mineracao_mg.jpg')} caption="Mina de minério de ferro em Ouro Preto (MG)" source="Revista Mineração" />

        <div style={{ color:'#93c5fd', fontWeight:700, fontSize:13, marginBottom:6 }}>🏭 Indústria</div>
        <ul style={{ paddingLeft:18, marginBottom:10 }}>
          <Li><Strong>54% do PIB industrial do Brasil</Strong></Li>
          <Li>Siderúrgicas, metalúrgicas, automóveis, informática, aeroespacial</Li>
          <Li>Concentração em SP, RJ e BH</Li>
        </ul>
      </Card>

      <ImgCard src={img('sudeste_usina_furnas.jpg')} caption="Usina hidrelétrica de Furnas no Rio Grande (MG)" source="Reprodução / Material Didático" />

      <Card accent="#ef4444">
        <div style={{ color:'#f87171', fontWeight:800, fontSize:14, marginBottom:10 }}>⚠️ Problemas Ambientais</div>
        <ul style={{ paddingLeft:18 }}>
          <Li><Strong>Lixo</Strong>: lixões proibidos em 1998, aterros sanitários obrigatórios desde 2014</Li>
          <Li><Strong>Poluição dos rios</Strong>: esgoto sem tratamento lançado nos rios</Li>
        </ul>
        <ImgCard src={img('sudeste_tiete_sp.jpg')} caption="Rio Tietê em São Paulo (SP) — exemplo de poluição urbana" source="ByDroneVideos/stock.adobe.com" />
      </Card>
    </div>
  )
}

function SulSection() {
  return (
    <div>
      <SectionTitle emoji="❄️" title="Região Sul" color={c.sul} />
      <div style={{ marginBottom:14 }}>
        {['3 estados','Menor região','Clima subtropical','Itaipu','Melhor qualidade de vida'].map(t => <Tag key={t} color={c.sul}>{t}</Tag>)}
      </div>

      <ImgCard src={img('sul_mapa.jpg')} caption="Mapa da Região Sul do Brasil" source="IBGE" />

      <Card accent={c.sul}>
        <div style={{ color:'#94a3b8', fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>🗺️ Os 3 Estados</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {['Paraná (PR)','Santa Catarina (SC)','Rio Grande do Sul (RS)'].map(s => (
            <div key={s} style={{ background:'#e879f915', border:'1px solid #e879f944', borderRadius:8, padding:'6px 10px', color:'#f0abfc', fontSize:12, fontWeight:600 }}>{s}</div>
          ))}
        </div>
      </Card>

      <InfoBox emoji="🌡️" title="O clima mais diferente do Brasil!" color={c.sul}
        text="O Sul tem clima SUBTROPICAL — o único do Brasil com as 4 estações bem definidas! Fica entre 22°S e 33°S (bem ao sul), então é muito mais frio. Neva no inverno! A Massa Polar Atlântica chega com força e derruba as temperaturas." />

      <Card>
        <div style={{ color:c.sul, fontWeight:800, fontSize:14, marginBottom:10 }}>⛰️ Relevo e Vegetação</div>
        <ul style={{ paddingLeft:18 }}>
          <Li>Relevo mais alto no litoral → diminui em direção ao interior</Li>
          <Li>Rochas basálticas → formadas por lava vulcânica → viram <Strong color="#ef4444">terra roxa</Strong> (solo mais fértil do Brasil!)</Li>
          <Li>Vegetação: <Strong color="#22c55e">Mata de Araucária</Strong> (pinhais) — típica do frio subtropical</Li>
          <Li><Strong color={c.divisoes}>Pampas / Campos Limpos</Strong>: gramíneas no sul do RS — perfeito para pecuária</Li>
          <Li>Hidrografia: Lagoa dos Patos, Lagoa Mirim (as maiores lagunas do Brasil!)</Li>
        </ul>
      </Card>

      <ImgCard src={img('sul_araucaria.jpg')} caption="Mata de araucária (pinhais) — vegetação típica do clima subtropical" source="Valerio Pillar/Wikimedia Commons" />
      <ImgCard src={img('sul_pampas.jpg')} caption="Bioma de Pampas na Estação Ecológica do Taim, extremo sul do RS" source="FeBozza/Wikimedia Commons" />

      <Card accent={c.divisoes}>
        <div style={{ color:c.divisoes, fontWeight:800, fontSize:14, marginBottom:10 }}>⚡ Usina de Itaipu</div>
        <ul style={{ paddingLeft:18, marginBottom:10 }}>
          <Li>Localizada no Rio Paraná — uma das maiores do <Strong>mundo</Strong>!</Li>
          <Li>É <Strong>binacional</Strong>: Brasil + Paraguai (cada um tem metade)</Li>
          <Li>O Paraguai revende a maior parte da sua cota para o Brasil</Li>
          <Li>Abastece os grandes centros industriais do Sul e Sudeste do Brasil</Li>
        </ul>
        <ImgCard src={img('sul_itaipu.jpg')} caption="Usina hidrelétrica de Itaipu — uma das maiores do mundo" source="Jonas de Carvalho/Wikimedia Commons" />
      </Card>

      <Card accent="#22c55e">
        <div style={{ color:'#22c55e', fontWeight:800, fontSize:14, marginBottom:10 }}>💰 Economia</div>
        {[['🌱','Agricultura','Terra roxa + clima úmido = agricultura muito produtiva. Soja, milho, trigo, arroz e tabaco.'],['🐄','Pecuária','Tradição secular! Campanha Gaúcha (RS) tem os melhores pastos. Frango e suíno em SC — exporta para o mundo.'],['🍷','Vinicultura','A Serra Gaúcha (RS) produz os melhores vinhos do Brasil.'],['🏭','Indústria','Metal-mecânica, têxtil, alimentos. Colonização alemã e italiana trouxe tradição industrial.']].map(([e,t,d]) => (
          <div key={t} style={{ background:'#0f1a10', borderRadius:8, padding:'10px 12px', marginBottom:8 }}>
            <div style={{ color:'#86efac', fontWeight:700, fontSize:13, marginBottom:4 }}>{e} {t}</div>
            <div style={{ color:'#94a3b8', fontSize:13, lineHeight:1.5 }}>{d}</div>
          </div>
        ))}
      </Card>

      <ImgCard src={img('sul_gado_rs.jpg')} caption="Fazenda de gado no Rio Grande do Sul — tradição secular na Campanha Gaúcha" source="Lisandro Luis Trarbach/Shutterstock" />

      <InfoBox emoji="🏆" title="Melhor qualidade de vida do Brasil!" color={c.sul}
        text="A Região Sul tem o maior índice de alfabetização do país (~93%), baixa mortalidade infantil, maior expectativa de vida, maiores gastos com saúde e educação e menor proporção de pobreza." />
    </div>
  )
}

function ResumoSection() {
  const [quiz, setQuiz] = useState({})
  const qs = [
    { q:'Quem criou o IBGE?',                                          ops:['Pedro Geiger','O governo brasileiro em 1937','Milton Santos','Juscelino Kubitschek'], a:1 },
    { q:'Qual região tem a Zona Franca de Manaus?',                    ops:['Nordeste','Centro-Oeste','Norte','Sudeste'],                                         a:2 },
    { q:'Quantas divisões Pedro Geiger criou?',                        ops:['5','4','3','2'],                                                                     a:2 },
    { q:'Qual sub-região do Nordeste tem semiárido e Caatinga?',       ops:['Zona da Mata','Agreste','Meio-Norte','Sertão'],                                      a:3 },
    { q:'Qual usina hidrelétrica é binacional (Brasil + Paraguai)?',   ops:['Belo Monte','Tucuruí','Itaipu','Furnas'],                                            a:2 },
    { q:'O critério dos "4 Brasis" de Milton Santos foi:',             ops:['Clima e vegetação','Tecnologia e informação','Limites dos estados','Produção agrícola'], a:1 },
    { q:'Qual estado tem o maior rebanho de búfalos do Brasil?',       ops:['Amazonas','Pará 🏠','Mato Grosso','Bahia'],                                          a:1 },
    { q:'O que é um Hotspot de biodiversidade?',                       ops:['Bioma com muita seca','Bioma com 1.500+ espécies endêmicas e 75%+ da vegetação destruída','Cidade muito quente','Rio com muita água'], a:1 },
  ]
  const score = qs.filter((q,i) => quiz[i] === q.a).length
  const all = Object.keys(quiz).length === qs.length

  return (
    <div>
      <SectionTitle emoji="⚡" title="Resumão para a Prova!" color={c.resumao} />

      {/* Tabela comparativa das 3 divisões */}
      <Card accent={c.resumao} style={{ background:'#1a0000' }}>
        <div style={{ color:'#f87171', fontWeight:900, fontSize:15, marginBottom:12 }}>🗺️ As 3 Formas de Dividir o Brasil</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <thead>
              <tr style={{ background:'#2d0000' }}>
                {['Divisão','Criador','Critério','N°'].map(h => (
                  <th key={h} style={{ color:'#f87171', padding:'8px 8px', textAlign:'left', borderBottom:'1px solid #ef444444', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['5 Macrorregiões','IBGE','Natural + histórico','5'],
                ['Complexos Geoecon.','Pedro Geiger (1967)','Economia + cultura, sem fronteiras','3'],
                ['4 Brasis','Milton Santos (2001)','Tecnologia + informação','4'],
              ].map((r,i) => (
                <tr key={i} style={{ borderBottom:'1px solid #33415544' }}>
                  {r.map((cel,j) => (
                    <td key={j} style={{ color:j===0?'#fca5a5':'#94a3b8', padding:'8px 8px', fontWeight:j===0?700:400, fontSize:12 }}>{cel}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* As 5 regiões */}
      <Card>
        <div style={{ color:'#e2e8f0', fontWeight:900, fontSize:15, marginBottom:12 }}>🇧🇷 As 5 Regiões em um relance</div>
        {[
          { r:'Norte',        cor:c.norte,        e:'🌿', f:'7 estados | Maior região | Floresta Amazônica | Zona Franca | Extrativismo e agro' },
          { r:'Nordeste',     cor:c.nordeste,     e:'☀️', f:'9 estados | Onde o Brasil começou | 4 sub-regiões | Semiárido + Caatinga' },
          { r:'Centro-Oeste', cor:c.centrooeste,  e:'🌾', f:'3 estados + DF | Brasília | Cerrado | Maior produtora agropecuária' },
          { r:'Sudeste',      cor:c.sudeste,      e:'🏙️', f:'4 estados | Mais populosa | 54% da indústria | Pré-sal | SP, RJ, BH' },
          { r:'Sul',          cor:c.sul,          e:'❄️', f:'3 estados | Menor | Subtropical | Neve | Itaipu | Melhor qualidade de vida' },
        ].map(({ r, cor, e, f }) => (
          <div key={r} style={{ display:'flex', gap:10, background:cor+'10', border:`1px solid ${cor}33`, borderRadius:10, padding:'10px', marginBottom:8 }}>
            <span style={{ fontSize:20, flexShrink:0 }}>{e}</span>
            <div>
              <div style={{ color:cor, fontWeight:800, fontSize:13 }}>{r}</div>
              <div style={{ color:'#94a3b8', fontSize:11, lineHeight:1.5 }}>{f}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* Glossário */}
      <div style={{ color:c.ibge, fontWeight:900, fontSize:16, marginBottom:12 }}>📖 Glossário — Definições que podem cair!</div>
      <Card accent={c.ibge} style={{ background:'#120d1f' }}>
        {[
          ['Regionalização','Divisão de um lugar em grupos com características semelhantes, usando critérios específicos.'],
          ['Paisagem Cultural','Resultado da interação humana com a natureza — mistura o que a natureza criou com o que o ser humano construiu.'],
          ['Censo','Pesquisa realizada a cada 10 anos pelo IBGE sobre todos os habitantes do Brasil.'],
          ['Constituição Federal','Conjunto de leis máximas do país. Nenhuma outra lei pode contrariá-la. A atual é de 5 de outubro de 1988.'],
          ['Fronteira','Área definida por pontos específicos para separar duas ou mais regiões ou países.'],
          ['Hotspot','Bioma com pelo menos 1.500 espécies endêmicas de plantas e que já perdeu mais de ¾ da vegetação original.'],
          ['Higrófilo','Organismo adaptado ao excesso de água (plantas da Floresta Amazônica).'],
          ['Xerófilo','Organismo adaptado ao clima seco, que sobrevive com pouca água. Ex: cactos da Caatinga.'],
          ['SUDAM','Superintendência para o Desenvolvimento da Amazônia — criada nos anos 1960 para desenvolver a Região Norte.'],
          ['Sisal','Fibra vegetal cultivada no Agreste Nordestino, usada na fabricação de cordas e sacos.'],
          ['Tropeiros','Condutores de gado que transportavam animais entre o litoral e o Sertão. O Agreste era ponto de parada.'],
          ['Rio dos Currais','Apelido histórico do Rio São Francisco: o gado do Agreste avançou até suas margens.'],
          ['Zona Franca de Manaus','Distrito industrial em Manaus com isenção de impostos, criado em 1967. Principal polo industrial do Norte.'],
          ['Amazônia Legal','Área do governo maior que a Região Norte: inclui MT e parte do MA.'],
          ['Rio Intermitente','Rio que fica sem água em determinados meses. Muito comum no Sertão Nordestino.'],
        ].map(([t,d],i) => (
          <div key={i} style={{ borderBottom:'1px solid #1e1a3a', paddingBottom:10, marginBottom:10 }}>
            <div style={{ color:'#c4b5fd', fontWeight:800, fontSize:13 }}>{t}</div>
            <div style={{ color:'#94a3b8', fontSize:13, lineHeight:1.5, marginTop:2 }}>{d}</div>
          </div>
        ))}
      </Card>

      {/* Quiz */}
      <div style={{ color:c.divisoes, fontWeight:900, fontSize:16, marginBottom:8 }}>🧠 Mini-Quiz — Testa aí!</div>
      <div style={{ color:'#64748b', fontSize:13, marginBottom:14 }}>Toque na resposta que você acha certa:</div>

      {qs.map((q, qi) => {
        const ans = quiz[qi]
        const answered = ans !== undefined
        return (
          <Card key={qi} accent={answered ? (ans===q.a ? '#22c55e' : '#ef4444') : '#334155'} style={{ background: answered ? (ans===q.a ? '#0f2917' : '#1a0000') : '#1e293b' }}>
            <div style={{ color:'#e2e8f0', fontWeight:700, fontSize:14, marginBottom:12 }}>
              {qi+1}. {q.q}
              {answered && <span style={{ marginLeft:8, fontSize:18 }}>{ans===q.a ? '✅' : '❌'}</span>}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {q.ops.map((op,oi) => {
                let bg='#0f172a', border='#334155', col='#94a3b8'
                if (answered) {
                  if (oi===q.a)  { bg='#0f2917'; border='#22c55e'; col='#86efac' }
                  if (oi===ans && oi!==q.a) { bg='#1a0000'; border='#ef4444'; col='#f87171' }
                }
                return (
                  <button key={oi} disabled={answered}
                    onClick={() => setQuiz(p => ({...p, [qi]:oi}))}
                    style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:8, padding:'10px 8px', color:col, fontSize:13, fontWeight:500, textAlign:'left', transition:'all 0.2s', cursor:answered?'default':'pointer' }}>
                    {op}
                  </button>
                )
              })}
            </div>
          </Card>
        )
      })}

      {all && (
        <Card accent="#22c55e" style={{ background:'#0f2917', textAlign:'center' }}>
          <div style={{ fontSize:40, marginBottom:8 }}>{score >= 7 ? '🎉' : score >= 5 ? '💪' : '📚'}</div>
          <div style={{ color:'#22c55e', fontWeight:900, fontSize:20 }}>
            {score} de {qs.length} acertos!
          </div>
          <div style={{ color:'#94a3b8', fontSize:14, marginTop:6, marginBottom:16 }}>
            {score >= 7 ? 'Arrasou! Você tá bem preparado pra prova! 🔥' : score >= 5 ? 'Bom! Revisa as seções que erraste e vai bombar!' : 'Relê as seções e tenta de novo — você consegue!'}
          </div>
          <button onClick={() => setQuiz({})}
            style={{ background:'#22c55e', color:'#fff', border:'none', borderRadius:10, padding:'10px 24px', fontWeight:800, fontSize:15, cursor:'pointer' }}>
            🔄 Tentar de novo
          </button>
        </Card>
      )}
    </div>
  )
}

// ─── NAVIGATION & APP ───────────────────────────────────────────────────────

const TABS = [
  { id:'intro',       emoji:'🗺️', label:'O que é?',    color:c.intro },
  { id:'ibge',        emoji:'📊', label:'IBGE',         color:c.ibge },
  { id:'divisoes',    emoji:'🔀', label:'Divisões',     color:c.divisoes },
  { id:'norte',       emoji:'🌿', label:'Norte',        color:c.norte },
  { id:'nordeste',    emoji:'☀️', label:'Nordeste',     color:c.nordeste },
  { id:'centrooeste', emoji:'🌾', label:'Centro-Oeste', color:c.centrooeste },
  { id:'sudeste',     emoji:'🏙️', label:'Sudeste',      color:c.sudeste },
  { id:'sul',         emoji:'❄️', label:'Sul',          color:c.sul },
  { id:'resumao',     emoji:'⚡', label:'Resumão',      color:c.resumao },
]

const SECTIONS = {
  intro:       <IntroSection />,
  ibge:        <IBGESection />,
  divisoes:    <DivicoesSection />,
  norte:       <NorteSection />,
  nordeste:    <NordesteSection />,
  centrooeste: <CentroOesteSection />,
  sudeste:     <SudesteSection />,
  sul:         <SulSection />,
  resumao:     <ResumoSection />,
}

export default function App() {
  const [active, setActive] = useState('intro')
  const contentRef = useRef(null)
  const prevTab = useRef('intro')

  const handleTab = (id) => {
    if (id === active) return
    prevTab.current = active
    setActive(id)
    if (contentRef.current) contentRef.current.scrollTop = 0
  }

  const tab = TABS.find(t => t.id === active)

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh', background:'#0a0f1e' }}>

      {/* Header */}
      <div style={{
        background:'linear-gradient(135deg, #0f172a 0%, #1e1a4f 100%)',
        borderBottom:'1px solid #1e293b',
        padding:'12px 16px 8px',
        flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
          <span style={{ fontSize:26 }}>🇧🇷</span>
          <div>
            <div style={{ color:'#fff', fontWeight:900, fontSize:16, lineHeight:1.2 }}>Geo do Pedro</div>
            <div style={{ color:'#64748b', fontSize:11 }}>Regionalização do Brasil · 7º ano</div>
          </div>
          <div style={{ marginLeft:'auto', background: tab.color+'20', border:`1px solid ${tab.color}55`, borderRadius:8, padding:'4px 10px' }}>
            <span style={{ color:tab.color, fontSize:12, fontWeight:700 }}>{tab.emoji} {tab.label}</span>
          </div>
        </div>

        {/* Tab strip */}
        <div style={{ display:'flex', gap:4, overflowX:'auto', scrollbarWidth:'none', paddingBottom:2 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => handleTab(t.id)} style={{
              flexShrink:0,
              background: active===t.id ? t.color+'25' : 'transparent',
              border:'none',
              borderBottom: active===t.id ? `3px solid ${t.color}` : '3px solid transparent',
              color: active===t.id ? t.color : '#475569',
              padding:'6px 10px',
              fontWeight: active===t.id ? 800 : 500,
              fontSize:12,
              borderRadius:'6px 6px 0 0',
              transition:'all 0.2s',
              whiteSpace:'nowrap',
            }}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={contentRef} key={active} style={{
        flex:1,
        overflowY:'auto',
        padding:'16px 14px 24px',
        animation:'fadeUp 0.3s ease forwards',
      }}>
        {SECTIONS[active]}
      </div>

      {/* Bottom nav — thumb-friendly */}
      <div style={{
        display:'flex',
        background:'#0f172a',
        borderTop:'1px solid #1e293b',
        flexShrink:0,
      }}>
        {[
          { id:'intro',    e:'🗺️' },
          { id:'ibge',     e:'📊' },
          { id:'divisoes', e:'🔀' },
          { id:'norte',    e:'🌿' },
          { id:'nordeste', e:'☀️' },
          { id:'centrooeste', e:'🌾' },
          { id:'sudeste',  e:'🏙️' },
          { id:'sul',      e:'❄️' },
          { id:'resumao',  e:'⚡' },
        ].map(t => {
          const tab = TABS.find(x => x.id === t.id)
          const isActive = active === t.id
          return (
            <button key={t.id} onClick={() => handleTab(t.id)} style={{
              flex:1,
              padding:'10px 0 8px',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              gap:2,
              background: isActive ? tab.color+'15' : 'transparent',
              borderTop: isActive ? `2px solid ${tab.color}` : '2px solid transparent',
              border:'none',
              transition:'all 0.2s',
            }}>
              <span style={{ fontSize:16 }}>{t.e}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
