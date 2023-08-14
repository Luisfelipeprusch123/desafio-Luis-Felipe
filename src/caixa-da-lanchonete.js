class CaixaDaLanchonete {
    // Definição do cardápio com códigos, descrições e valores dos itens
    cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        suco: { descricao: 'Suco Natural', valor: 6.20 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };

    // Formas de pagamento aceitas
    formasDePagamento = ['dinheiro', 'debito', 'credito'];

    // Função para calcular o valor total da compra
    calcularValorDaCompra(formaDePagamento, itens) {
        let valorTotal = 0;
        let mensagemErro = '';

        // Conjunto para armazenar códigos de itens principais já processados
        const itensPrincipais = new Set();

        // Iteração pelos itens da compra
        itens.forEach(item => {
            const [codigo, quantidade] = item.split(',');
            const itemCardapio = this.cardapio[codigo];

            // Verificação se o item é válido
            if (!itemCardapio) {
                mensagemErro = 'Item inválido!';
                return;
            }

            // Cálculo do valor do item
            const valorItem = itemCardapio.valor * parseInt(quantidade);

            // Verificação se a quantidade é válida
            if (quantidade <= 0) {
                mensagemErro = 'Quantidade inválida!';
                return;
            }

            // Lógica para tratamento de itens principais e extras
            if (codigo !== 'chantily' && codigo !== 'queijo') {
                valorTotal += valorItem;
                itensPrincipais.add(codigo);
            } else {
                const itemPrincipal = codigo === 'chantily' ? 'cafe' : 'sanduiche';
                if (itensPrincipais.has(itemPrincipal)) {
                    valorTotal += valorItem;
                } else {
                    mensagemErro = 'Item extra não pode ser pedido sem o principal';
                    return;
                }
            }
        });

        // Verificação de mensagens de erro
        if (mensagemErro) {
            return mensagemErro;
        }

        // Verificação da forma de pagamento
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        // Verificação se há itens no carrinho
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        // Aplicação de descontos e taxas de acordo com a forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        // Formatação do valor total e retorno
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
