import type { Request, Response } from "express";
import Movimentacao from "../model/Movimentacao.js";

class MovimentacaoController {



    static async todos(req: Request, res: Response): Promise<Response> {

        try {

            const listaMovimentacoes = await Movimentacao.listarMovimentacoes();

            return res.status(200).json(listaMovimentacoes);

        } catch (error) {

            console.error(
                `Erro ao consultar movimentação. ${error}`
            );

            return res.status(500).json({
                mensagem: "Não foi possível acessar a lista de movimentação."
            });
        }
    }



    static async um(req: Request, res: Response): Promise<Response> {

        try {

            const id_movimentacao = Number(req.params.id);

            const movimentacao = await Movimentacao.listarMovimentacao(id_movimentacao);

            return res.status(200).json(movimentacao);

        } catch (error) {

            console.error(
                `Erro ao consultar movimentação. ${error}`
            );

            if (
                error instanceof Error &&
                error.message.includes("não encontrada")
            ) {

                return res.status(404).json({
                    mensagem: error.message
                });
            }

            return res.status(500).json({
                mensagem: "Não foi possível consultar a movimentação."
            });
        }
    }
}

export default MovimentacaoController;