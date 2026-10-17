# Rastreamento DFL 2026

Pixel Meta: `814178168360082`, identificado na conta de anúncios **Low ticket** (`893719283260410`) e confirmado na integração nativa da Lowify.
Produto Lowify: `63073`; código público do checkout: `dkLHsa`.

## Eventos e responsáveis

| Evento | Disparo | Responsável |
| --- | --- | --- |
| PageView | Primeira exibição da página por carregamento | Site; checkout registra sua própria página |
| ViewContent | Visualização da página do DFL | Site |
| CheckoutClick (personalizado) | Primeiro clique em um dos botões de compra; indica posição do botão | Site |
| InitiateCheckout | Entrada na página de checkout | Lowify |
| AddPaymentInfo | Campos obrigatórios preenchidos e válidos | Lowify |
| Purchase | Compra aprovada; opção de disparo ao gerar PIX desativada | Lowify; validação com pagamento real pendente |

O checkout já envia PageView e InitiateCheckout; não repetimos InitiateCheckout no site. O site nunca envia Purchase, AddToCart ou AddPaymentInfo. Parâmetros `status=paid`, `value` e similares na URL não geram compras. Gerar um Pix não é uma venda aprovada.

O conteúdo usa `content_ids: ['63073']`, alinhado ao ID interno enviado pela Lowify, `currency: 'BRL'` e `value: 6.9`. O valor de Purchase deve ser o valor bruto efetivamente aprovado pela Lowify, incluindo adicional quando comprado; a taxa da plataforma não deve ser descontada do faturamento enviado à Meta.

## Atribuição e privacidade

Os botões preservam apenas `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id` e `fbclid` da URL da página. O produto e o destino permanecem definidos em config.js. Não enviamos formulário, e-mail, telefone, senha ou tokens pela página. Não há token de API no código público.

O Pixel só é habilitado no domínio de produção `jogueagora.vercel.app`; localhost e previews não geram eventos. Sinal Global Privacy Control ativo desabilita o Pixel e o encaminhamento de parâmetros de campanha nesta página. As escolhas e políticas da Lowify são independentes. O texto de Privacidade foi atualizado.

## Configuração conferida na Lowify em 14/10/2026

Em Integrações → Facebook Ads, o Pixel existente **PIXEL FACE** está vinculado a **DFL 2026 ATUALIZADO**. A opção **Purchase no PIX** foi desmarcada, salva e conferida após recarregar. Não foi criado um segundo Pixel. O formulário “Adicionar Pixel” tem uma opção padrão marcada, mas ela não altera o Pixel existente: o que vale é o cartão em “Meus Pixels”.

A página pública do checkout carrega a configuração deste Pixel e inclui PageView, InitiateCheckout e observador de AddPaymentInfo. Não houve pedido ou cobrança de teste. A API de Conversões (CAPI) não foi configurada; não há promessa de envio via servidor caso o navegador seja fechado ou bloqueie o Pixel.

## Validação antes das campanhas

- Testes locais: `node --test tests/tracking.test.mjs`.
- No Gerenciador de Eventos, selecionar este Pixel e usar **Testar eventos**. Acessar a página publicada e clicar no botão: conferir PageView, ViewContent, CheckoutClick e InitiateCheckout, sem Purchase antecipado.
- Concluir um pedido de teste autorizado e verificar um único Purchase com valor bruto e BRL. Um Pix pendente não deve produzir Purchase.
- Comparar o pedido aprovado na Lowify com o evento na Meta, incluindo valor de eventual adicional. Não otimizar as campanhas usando Pix apenas gerados.
- A confirmação de recebimento no Gerenciador de Eventos e o teste com pagamento ficaram para o responsável, que preferiu conferir a Meta depois.

Exemplo de parâmetros para os futuros anúncios (não incluído no link padrão da página):
`utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}`

Referência de implementação Meta: https://developers.facebook.com/docs/meta-pixel/reference/ . Os gatilhos do checkout foram conferidos no HTML público entregue pela própria Lowify.
