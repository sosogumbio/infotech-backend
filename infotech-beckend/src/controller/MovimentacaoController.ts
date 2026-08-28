import type { Request, Response } from 'express';
import Movimentacao from '../model/Movimentacao.js';

class MovimentacaoController {
    static async listarMovimentacoes(req: Request, res: Response) {
        try {
            const movimentacoes = await Movimentacao.listarMovimentacoes();

            return res.status(200).json(movimentacoes);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar movimentações'
            });
        }
    }

    static async buscarMovimentacao(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    mensagem: 'ID da movimentação inválido'
                });
            }

            const movimentacao = await Movimentacao.buscarMovimentacao(id);

            if (!movimentacao) {
                return res.status(404).json({
                    mensagem: 'Movimentação não encontrada'
                });
            }

            return res.status(200).json(movimentacao);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar movimentação'
            });
        }
    }

    static async cadastrarMovimentacao(req: Request, res: Response) {
        try {
            const idProduto = Number(req.body.id_produto);
            const idMovimentacaoOrigem = req.body.id_movimentacao_origem == null
                ? null
                : Number(req.body.id_movimentacao_origem);
            const tipo = String(req.body.tipo ?? '').trim().toLowerCase();
            const motivo = String(req.body.motivo ?? '').trim();
            const quantidade = Number(req.body.quantidade);
            const precoUnitarioPraticado = req.body.preco_unitario_praticado == null
                ? null
                : Number(req.body.preco_unitario_praticado);
            const observacao = String(req.body.observacao ?? '').trim();

            if (isNaN(idProduto) || idProduto <= 0) {
                return res.status(400).json({
                    mensagem: 'O id do produto é obrigatório'
                });
            }

            if (!['entrada', 'saida', 'ajuste'].includes(tipo)) {
                return res.status(400).json({
                    mensagem: 'O tipo da movimentação deve ser: entrada, saída ou ajuste'
                });
            }

            if (!motivo) {
                return res.status(400).json({
                    mensagem: 'O motivo da movimentação é obrigatório'
                });
            }

            if (isNaN(quantidade) || quantidade <= 0) {
                return res.status(400).json({
                    mensagem: 'A quantidade deve ser maior que zero'
                });
            }

            if (!observacao) {
                return res.status(400).json({
                    mensagem: 'A observação da movimentação é obrigatória'
                });
            }

            let valorTotal = req.body.valor_total == null
                ? null
                : Number(req.body.valor_total);

            if (valorTotal === null && precoUnitarioPraticado !== null) {
                valorTotal = Number(precoUnitarioPraticado) * quantidade;
            }

            const movimentacao = await Movimentacao.cadastrarMovimentacao(
                idProduto,
                idMovimentacaoOrigem,
                tipo,
                motivo,
                quantidade,
                precoUnitarioPraticado,
                valorTotal,
                observacao
            );

            return res.status(201).json(movimentacao);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar movimentação'
            });
        }
    }
}

export default MovimentacaoController;
