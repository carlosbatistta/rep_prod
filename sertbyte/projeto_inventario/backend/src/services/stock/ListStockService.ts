import prismaClient from "../../prisma";

interface ListStockRequest {
    cost?: boolean
    storage_code?: string
    branch_code?: string
    wms_control?: boolean
    reservation?: boolean
    unbalanced?: boolean
}

export class ListStockService {
    async execute(filters: ListStockRequest = {}) {
        const { cost, storage_code, wms_control, reservation, unbalanced } = filters

        // Construir os filtros dinamicamente
        const whereClause: any = {}
        const updateFields: any = {}

        if (cost !== undefined) {
            whereClause.cost = { lte: 0 }
            updateFields.is_zero_cost = true
        }

        if (unbalanced !== undefined) {
            whereClause.unbalanced = true
            updateFields.is_unbalanced = true
        }

        if (storage_code !== undefined) {
            whereClause.storage_code = storage_code
        }

        if (wms_control === true) {
            whereClause.address_control = "1"
            whereClause.localiz_control = "S"
            updateFields.is_wms_control = true
        } else if (wms_control === false) {
            whereClause.address_control = { not: "1" }
            whereClause.localiz_control = { not: "S" }
            updateFields.is_wms_control = true
        }

        if (reservation !== undefined) {
            whereClause.reservation = { gt: 0 };
            updateFields.is_reservation = true
        }

        // Buscar os registros com os filtros aplicados
        const stock = await prismaClient.stock.findMany({
            where: whereClause,
        })

        // Se houver campos para atualizar, atualiza os registros filtrados
        if (stock.length > 0 && Object.keys(updateFields).length > 0) {
            const idsToUpdate = stock.map((record) => record.id)

            await prismaClient.stock.updateMany({
                where: { id: { in: idsToUpdate } },
                data: updateFields,
            });
        }

        return stock
    }
}
