import DatabaseModel from '../DatabaseModel.js';

class Categoria {
    static async listarCategorias() {
        const resultado = await DatabaseModel.query(`
            SELECT
                id_categoria,
                nome
            FROM categoria
            ORDER BY id_categoria
        `);

        return resultado.rows;
    }

    static async buscarCategoria(id: number) {
        const resultado = await DatabaseModel.query(`
            SELECT
                id_categoria,
                nome
            FROM categoria
            WHERE id_categoria = $1
        `, [id]);

        return resultado.rows[0];
    }

    static async cadastrarCategoria(nome: string) {
        const resultado = await DatabaseModel.query(`
            INSERT INTO categoria (
                nome
            )
            VALUES ($1)
            RETURNING *
        `, [nome.trim()]);

        return resultado.rows[0];
    }
}

export default Categoria;
