import prismaClient from "../../prisma";

interface ListProductFilters {
    cost?: number; // Filtro por custo
    storage_code?: string; // Filtro por armazenamento (por exemplo, branch_code ou outra relação)
}

export class ListProductService {
    async execute(filters: ListProductFilters = {}) {
        const { cost, storage_code } = filters;

        // Construir os filtros dinamicamente
        const whereClause: any = {};

        if (cost !== undefined) {
            whereClause.cost = {
                lte: cost, // Exemplo: Custo menor ao valor
            };
        }

        if (storage_code) {
            whereClause.branch_code = storage_code; // Relacionado ao código do branch ou armazenamento
        }

        // Executar a consulta com filtros dinâmicos
        const products = await prismaClient.product.findMany({
            where: whereClause,

        });

        console.log(cost, storage_code)

        return products;
    }
}
