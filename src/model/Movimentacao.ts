import type MovimentacaoDTO from "../dto/MovimentacaoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Movimentacao {

    private id_movimentacao: number = 0;

    private id_produto: number;

    private id_movimentacao_origem: number | null;

    private tipo: string;

    private motivo: string;

    private quantidade: number;

    private preco_unitario_pratico: number;

    private observacao: string;

    private data_movimentacao: Date;

    constructor(
        _id_produto: number,

        _tipo: string,

        _motivo: string,

        _quantidade: number,

        _preco_unitario_pratico: number,

        _observacao: string,

        _id_movimentacao_origem?: number | null,

        _data_movimentacao?: Date

    ) {
        this.id_produto = _id_produto;

        this.tipo = _tipo;

        this.motivo = _motivo;

        this.quantidade = _quantidade;

        this.preco_unitario_pratico = _preco_unitario_pratico;

        this.observacao = _observacao;

        this.id_movimentacao_origem = _id_movimentacao_origem ?? null;

        this.data_movimentacao = _data_movimentacao ?? new Date();
    }



    public getIdMovimentacao(): number {
        return this.id_movimentacao;
    }

    public setIdMovimentacao(value: number): void {
        this.id_movimentacao = value;
    }

    public getIdProduto(): number {
        return this.id_produto;
    }

    public setIdProduto(value: number): void {
        this.id_produto = value;
    }

    public getIdMovimentacaoOrigem(): number | null {
        return this.id_movimentacao_origem;
    }

    public setIdMovimentacaoOrigem(value: number | null): void {
        this.id_movimentacao_origem = value;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public setTipo(value: string): void {
        this.tipo = value;
    }

    public getMotivo(): string {
        return this.motivo;
    }

    public setMotivo(value: string): void {
        this.motivo = value;
    }

    public getQuantidade(): number {
        return this.quantidade;
    }

    public setQuantidade(value: number): void {
        this.quantidade = value;
    }

    public getPrecoUnitarioPratico(): number {
        return this.preco_unitario_pratico;
    }

    public setPrecoUnitarioPratico(value: number): void {
        this.preco_unitario_pratico = value;
    }

    public getObservacao(): string {
        return this.observacao;
    }

    public setObservacao(value: string): void {
        this.observacao = value;
    }

    public getDataMovimentacao(): Date {
        return this.data_movimentacao;
    }

    public setDataMovimentacao(value: Date): void {
        this.data_movimentacao = value;
    }



    private static toDTO(linha: any): MovimentacaoDTO {
        return {
            id_movimentacao: linha.id_movimentacao,
            id_produto: linha.id_produto,
            id_movimentacao_origem: linha.id_movimentacao_origem,
            tipo: linha.tipo,
            motivo: linha.motivo,
            quantidade: linha.quantidade,
            preco_unitario_pratico: linha.preco_unitario_pratico,
            observacao: linha.observacao,
            data_movimentacao: linha.data_movimentacao,

            produto: {
                id_produto: linha.id_produto,
                nome: linha.nome_produto
            }
        };
    }


    static async listarMovimentacoes(): Promise<MovimentacaoDTO[]> {
        try {

            const querySelectMovimentacao = `
                SELECT
                    m.id_movimentacao,
                    m.id_produto,
                    m.id_movimentacao_origem,
                    m.tipo,
                    m.motivo,
                    m.quantidade,
                    m.preco_unitario_pratico,
                    m.observacao,
                    m.data_movimentacao,

                    p.nome AS nome_produto

                FROM Movimentacao m

                JOIN Produto p
                    ON m.id_produto = p.id_produto

                ORDER BY m.data_movimentacao DESC;
            `;

            const respostaBD = await database.query(querySelectMovimentacao);

            return respostaBD.rows.map(Movimentacao.toDTO);

        } catch (error) {

            console.error(
                `Erro ao listar movimentações:`,
                error
            );

            throw error;
        }
    }


    static async listarMovimentacao(id_movimentacao: number): Promise<MovimentacaoDTO> {
        try {

            const querySelectMovimentacao = `
                SELECT
                    m.id_movimentacao,
                    m.id_produto,
                    m.id_movimentacao_origem,
                    m.tipo,
                    m.motivo,
                    m.quantidade,
                    m.preco_unitario_pratico,
                    m.observacao,
                    m.data_movimentacao,

                    p.nome AS nome_produto

                FROM Movimentacao m

                JOIN Produto p
                    ON m.id_produto = p.id_produto

                WHERE m.id_movimentacao = $1;
            `;

            const respostaBD = await database.query(
                querySelectMovimentacao,
                [id_movimentacao]
            );

            if (respostaBD.rows.length === 0) {
                throw new Error(
                    `Movimentação com ID ${id_movimentacao} não encontrada.`
                );
            }

            return Movimentacao.toDTO(respostaBD.rows[0]);

        } catch (error) {

            console.error(
                `Erro ao buscar movimentação (id: ${id_movimentacao}):`,
                error
            );

            throw error;
            
        }
    }
}


export default Movimentacao;