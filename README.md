# DFL 2026 — Jogue Agora

Página de apresentação e vendas responsiva em português, com HTML, CSS e JavaScript. Sem dependências de compilação.

- Site: arquivos em `dist/`.
- Copy completa, três headlines, roteiro de vídeo e order bump: `copy/copy-completa.md`.
- Preço do produto: R$ 5, pagamento único.
- Adicional opcional no checkout: entrega imediata do acesso pelo WhatsApp, R$ 3. Total com adicional: R$ 8.

## Configurar os dados reais

Editar `dist/config.js`:

| Campo | Conteúdo |
| --- | --- |
| checkoutUrl | URL HTTPS do checkout já configurado para o produto de R$ 5 e adicional opcional de R$ 3 |
| whatsappNumber | Número de atendimento no formato 55 + DDD + número, somente dígitos |
| gameplayVideoUrl | URL HTTPS direta de um arquivo de vídeo real da versão vendida, por exemplo MP4 |
| minimumAndroid | Versão mínima do Android verificada |
| minimumRam | RAM mínima verificada, incluindo unidade |
| requiredStorage | Espaço livre necessário, incluindo unidade |
| standardDelivery | Frase completa explicando o canal e prazo reais da entrega padrão de R$ 5 |
| supportEmail | Reservado para contato, não exibido atualmente |

Sem checkout configurado, o botão informa que as vendas estão em preparação. Nenhuma cobrança ou coleta de pagamento é realizada nesta página. A entrega pelo WhatsApp e o adicional precisam ser configurados no provedor de checkout; esta página não automatiza entrega nem processa pagamentos.

A ilustração do campo e da camisa é original e está identificada como arte, não gameplay. Ao adicionar um vídeo válido em `gameplayVideoUrl`, o vídeo substitui a ilustração principal. Não há depoimentos inventados, contador de falsa urgência ou garantia de desempenho universal.

Antes de abrir as vendas, completar os requisitos, a entrega padrão, os contatos do responsável e as condições de reembolso em `dist/index.html` e no checkout. Não ativar a promessa de entrega imediata pelo WhatsApp sem o fluxo correspondente funcionando. Não há política comercial de garantia presumida.

## Publicação na Vercel

Importar este repositório. O arquivo `vercel.json` define site estático, sem build, com saída em `dist/`. Projeto pretendido: `jogueagora`. Domínio pretendido: `jogueagora.vercel.app`, sujeito à disponibilidade.

## Interações e privacidade

Abas de modos de jogo com navegação por teclado, FAQ expansível, janela de informações com fechamento pelo Escape, botões de oferta e navegação móvel fixa. Sem analytics, formulários ou cookies próprios. A página usa Google Fonts e os registros técnicos normais da hospedagem.