export default interface MovimentacaoDTO {
    id_movimentacao: number;
    id_produto: number;
    id_movimentacao_origem: number | null;
    tipo: string;
    motivo: string;
    quantidade: number;
    preco_unitario_pratico: number;
    observacao: string;
    data_movimentacao: Date;
    produto: {
        id_produto: number;
        nome: string;
    };
}