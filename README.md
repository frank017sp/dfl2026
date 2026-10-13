# DFL 2026 — Jogue Agora

Página de apresentação e vendas responsiva em português, com HTML, CSS e JavaScript. Sem dependências de compilação.

- Site: arquivos em `dist/`.
- Copy curta aplicada ao site, baseada nas dúvidas do público: `copy/copy-curta.md`.
- Material inicial, três headlines, roteiro de vídeo e order bump: `copy/copy-completa.md`.
- Preço do produto: R$ 5, pagamento único. A oferta apresenta o preço de referência de R$ 29,90 fornecido pelo responsável e economia de R$ 24,90 (83%, arredondado).
- O jogo acompanha um vídeo de instalação, conforme confirmado pelo responsável. A nova copy da oferta inclui ajuda na instalação e entrega por e-mail; os fluxos precisam ser configurados pelo responsável no checkout.
- Adicional exclusivo do checkout: entrega imediata do acesso pelo WhatsApp, R$ 3. A página apresenta “Receba no WhatsApp” com identificação de adicional opcional no checkout.

## Configurar os dados reais

Editar `dist/config.js`:

| Campo | Conteúdo |
| --- | --- |
| checkoutUrl | URL HTTPS do checkout já configurado para o produto de R$ 5 e adicional opcional de R$ 3 |
| whatsappNumber | Campo legado, não utilizado pela página |
| gameplayVideoUrl | Campo legado; o vídeo atual usa o embed LiteVideo no HTML |
| minimumAndroid | Versão mínima do Android verificada |
| minimumRam | RAM mínima verificada, incluindo unidade |
| requiredStorage | Espaço livre necessário, incluindo unidade |
| standardDelivery | Frase completa explicando o canal e prazo reais da entrega padrão de R$ 5 |
| supportEmail | Reservado para contato, não exibido atualmente |

Sem checkout configurado, o botão informa que as vendas estão em preparação. Nenhuma cobrança ou coleta de pagamento é realizada nesta página. A entrega pelo WhatsApp e o adicional precisam ser configurados no provedor de checkout; esta página não automatiza entrega nem processa pagamentos.

A VSL fornecida pelo responsável usa o player LiteVideo, ID `f68d57f3-cfc0-4a09-93c1-1a9998c371f2`, com proporção quadrada 1:1 e largura responsiva. O embed está em `dist/index.html` e mantém as opções do player fornecidas pelo responsável, com as cores dos controles ajustadas à nova paleta. Não há depoimentos inventados, contador de falsa urgência ou garantia de desempenho universal. Por preferência do responsável, não há requisitos numéricos na página; os campos técnicos antigos da configuração não são usados na interface.

Antes de abrir as vendas, completar os requisitos, a entrega padrão, os contatos do responsável e as condições de reembolso em `dist/index.html` e no checkout. Não ativar a promessa de entrega imediata pelo WhatsApp sem o fluxo correspondente funcionando. Não há política comercial de garantia presumida.

## Publicação na Vercel

O arquivo `vercel.json` define site estático, sem build, com saída em `dist/`. Repositório: `frank017sp/dfl2026`. Projeto Vercel: `dfl2026`. Domínio publicado: https://jogueagora.vercel.app. A produção acompanha a branch `main`.

## Interações e privacidade

Cabeçalho com apenas a logo centralizada. A página apresenta a chamada principal, VSL quadrada, conteúdo incluído, instalação, oferta de R$ 5 e dúvidas frequentes, sem numeração. Dos títulos extras da estrutura, ficam apenas “O que está incluído” e “Dúvidas frequentes”; a chamada principal e “Partiu jogar?” na oferta permanecem. Os títulos ficam centralizados; os benefícios saíram do bloco da oferta para evitar repetição. O botão fica logo abaixo da VSL, sem a antiga linha de bullets. Não há barra fixa inferior. A oferta e a resposta de entrega no FAQ mencionam o WhatsApp como adicional opcional no checkout. Janela de informações com fechamento pelo Escape e botões acessíveis por teclado. Sem formulários, cookies ou analytics próprios. A página usa Google Fonts, o player externo LiteVideo e os registros técnicos normais da hospedagem. O player pode coletar dados técnicos de acesso conforme sua política.

## Identidade visual

Paleta aplicada: azul estádio `#061A35` na base, azul elétrico `#087CF0` na iluminação e detalhes, verde gramado `#078B45` nas marcações e fundos esportivos, verde neon `#B7FF00` nos botões, amarelo torcida `#FFD21F` no título principal, preço e desconto e branco gelo `#F4F7FC` nos títulos e textos principais. A proporção 60/25/10/5 orienta a hierarquia visual, sem controle rígido de área. A VSL concentra as imagens reais do jogo; luzes e gramado são desenhados em CSS, sem novas imagens pesadas.
