# DFL 2026 — Jogue Agora

Página de apresentação e vendas responsiva em português, com HTML, CSS e JavaScript. Sem dependências de compilação.

- Site: arquivos em `dist/`.
- Copy curta aplicada ao site, baseada nas dúvidas do público: `copy/copy-curta.md`.
- Material inicial, três headlines, roteiro de vídeo e order bump: `copy/copy-completa.md`.
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

A ilustração do campo é original e está identificada como arte, não gameplay. Ao adicionar um vídeo válido em `gameplayVideoUrl`, o vídeo substitui a ilustração principal. Não há depoimentos inventados, contador de falsa urgência ou garantia de desempenho universal. Por preferência do responsável, não há requisitos numéricos na página; os campos técnicos antigos da configuração não são usados na interface.

Antes de abrir as vendas, completar os requisitos, a entrega padrão, os contatos do responsável e as condições de reembolso em `dist/index.html` e no checkout. Não ativar a promessa de entrega imediata pelo WhatsApp sem o fluxo correspondente funcionando. Não há política comercial de garantia presumida.

## Publicação na Vercel

O arquivo `vercel.json` define site estático, sem build, com saída em `dist/`. Repositório: `frank017sp/dfl2026`. Projeto Vercel: `dfl2026`. Domínio publicado: https://jogueagora.vercel.app. A produção acompanha a branch `main`.

## Interações e privacidade

Cabeçalho com apenas a logo centralizada, títulos centralizados, espaço de vídeo, três respostas principais, FAQ expansível e oferta. Não há barra fixa inferior. Janela de informações com fechamento pelo Escape e botões acessíveis por teclado. Sem analytics, formulários ou cookies próprios. A página usa Google Fonts e os registros técnicos normais da hospedagem.
