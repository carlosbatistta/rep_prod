import prismaClient from "../../prisma";

interface ListAddressedStockRequest {
    product_code?: number
    storage_code?: string
    branch_code?: string
    reserve_quantity?: number
    transfer_quantity?: number
    address_code?: string
}

export class ListAddressedStockService {
    async execute(filters: ListAddressedStockRequest = {}) {
        const { product_code, storage_code, reserve_quantity, transfer_quantity, address_code } = filters

        // Construir os filtros dinamicamente
        const whereClause: any = {}
        const updateFields: any = {}

        if (product_code !== undefined) {
            whereClause.product_code = product_code
        }

        if (storage_code !== undefined) {
            whereClause.storage_code = storage_code
        }

        if (reserve_quantity !== undefined) {
            whereClause.reserve_quantity = { gt: reserve_quantity }
            updateFields.is_reserved_wms = true
        }

        if (transfer_quantity !== undefined) {
            whereClause.transf_quantity = { gt: transfer_quantity }
            updateFields.is_transfer = true
        }

        if (address_code !== undefined) {
            whereClause.address_code = address_code
        }

        // Depuração para verificar os filtros antes de aplicar
        console.log("Filtros aplicados:", JSON.stringify(whereClause, null, 2));

        // Buscar os registros com os filtros aplicados
        const stock = await prismaClient.addressed_stock.findMany({
            where: whereClause,
        });

        // Se houver campos para atualizar, atualiza os registros filtrados
        if (stock.length > 0 && Object.keys(updateFields).length > 0) {
            const idsToUpdate = stock.map((record) => record.id);

            await prismaClient.addressed_stock.updateMany({
                where: { id: { in: idsToUpdate } },
                data: updateFields,
            });
        }

        return stock;
    }
}
