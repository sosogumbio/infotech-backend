import type { Request, Response } from "express";
import Produto from "../model/Produto.js";

class ProdutoController {



    static async todos(req: Request, res: Response): Promise<Response> {

        try {

            const listaProdutos = await Produto.listarProdutos();

            return res.status(200).json(listaProdutos);

        } catch (error) {

            console.error(
                `Erro ao consultar produto. ${error}`
            );

            return res.status(500).json(
         "Não foi possível acessar a lista de produto."
            );
        }
    }


    static async um(req: Request, res: Response): Promise<Response> {
        try {

            const id_produto = Number(req.params.id);

            const produto = await Produto.listarProduto(id_produto);

            if (!produto) {

                return res.status(404).json(
            "Produto não encontrado."
                );
            }

            return res.status(200).json(produto);

        } catch (error) {

            console.error(
                `Erro ao consultar produto. ${error}`
            );

            return res.status(500).json(
            "Não foi possível consultar o produto."
            );
        }
    }


    static async criar(req: Request, res: Response): Promise<Response> {
        try {

            const dadosRecebidos = req.body;

            const erros: string[] = [];

            if (!dadosRecebidos.id_categoria || !Number.isInteger(Number(dadosRecebidos.id_categoria))) {
                erros.push("id_categoria é obrigatório e deve ser um número inteiro");
            }
            if (!dadosRecebidos.codigo || String(dadosRecebidos.codigo).trim() === "") {
                erros.push("codigo é obrigatório");
            }
            if (!dadosRecebidos.nome || String(dadosRecebidos.nome).trim() === "") {
                erros.push("nome é obrigatório");
            }
            if (dadosRecebidos.preco_unitario === undefined || Number(dadosRecebidos.preco_unitario) < 0) {
                erros.push("preco_unitario é obrigatório e não pode ser negativo");
            }
            if (dadosRecebidos.quantidade_disponivel !== undefined && Number(dadosRecebidos.quantidade_disponivel) < 0) {
                erros.push("quantidade_disponivel não pode ser negativa");
            }
            if (dadosRecebidos.quantidade_minima !== undefined && Number(dadosRecebidos.quantidade_minima) < 0) {
                erros.push("quantidade_minima não pode ser negativa");
            }

            if (erros.length > 0) {
                return res.status(400).json(
                 erros
                );
            }

            const produto = new Produto(
                dadosRecebidos.id_categoria,
                dadosRecebidos.codigo,
                dadosRecebidos.nome,
                dadosRecebidos.descricao,
                dadosRecebidos.preco_unitario,
                dadosRecebidos.quantidade_disponivel,
                dadosRecebidos.quantidade_minima
            );

            const resultado = await Produto.cadastrarProduto(produto);

            if (!resultado) {

                return res.status(400).json(
                 "Não foi possível cadastrar o produto."
                );
            }

            return res.status(201).json(
                "Produto cadastrado com sucesso."
            );

        } catch (error) {

            console.error(
                `Erro ao cadastrar produto. ${error}`
            );

            return res.status(500).json(
             "Não foi possível cadastrar o produto."
            );
        }
    }


    static async atualizar(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {

            const id_produto = Number(req.params.id);

            const dadosRecebidos = req.body;

            const erros: string[] = [];

            if (!dadosRecebidos.id_categoria || !Number.isInteger(Number(dadosRecebidos.id_categoria))) {
                erros.push("id_categoria é obrigatório e deve ser um número inteiro");
            }
            if (!dadosRecebidos.codigo || String(dadosRecebidos.codigo).trim() === "") {
                erros.push("codigo é obrigatório");
            }
            if (!dadosRecebidos.nome || String(dadosRecebidos.nome).trim() === "") {
                erros.push("nome é obrigatório");
            }
            if (dadosRecebidos.preco_unitario === undefined || Number(dadosRecebidos.preco_unitario) < 0) {
                erros.push("preco_unitario é obrigatório e não pode ser negativo");
            }

            if (erros.length > 0) {
                return res.status(400).json(
                erros
                );
            }

            const produto = new Produto(
                dadosRecebidos.id_categoria,
                dadosRecebidos.codigo,
                dadosRecebidos.nome,
                dadosRecebidos.descricao,
                dadosRecebidos.preco_unitario,
                dadosRecebidos.quantidade_disponivel,
                dadosRecebidos.quantidade_minima
            );

            produto.setIdProduto(id_produto);

            const resultado = await Produto.atualizarProduto(produto);

            if (!resultado) {

                return res.status(404).json(
                   "Produto não encontrado ou não foi possível atualizar."
                );
            }

            return res.status(200).json(
                "Produto atualizado com sucesso."
            );

        } catch (error) {

            console.error(
                `Erro ao atualizar produto. ${error}`
            );

            return res.status(500).json(
            "Não foi possível atualizar o produto."
            );
        }
    }



    static async deletar(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {

            const id_produto = Number(req.params.id);

            const resultado = await Produto.removerProduto(id_produto);

            if (!resultado) {

                return res.status(404).json(
                     "Produto não encontrado ou não foi possível remover."
                );
            }

            return res.status(200).json(
        "Produto removido com sucesso."
            );

        } catch (error) {

            console.error(
                `Erro ao remover produto. ${error}`
            );

            return res.status(500).json(
            "Não foi possível remover o produto."
            );
        }
    }
}

export default ProdutoController;