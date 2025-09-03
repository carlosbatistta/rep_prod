import prismaClient from "../../prisma";

interface InventRequest {
    document: number;
    branch_code: string;
    date_count: string;
    storage_code: string,
    accuracy_quanty?: number,
    accuracy_value?: number,
    accuracy_percent?: number,
    total_stock_value?: number,
    total_inventory_value?: number,
    total_stock_quanty?: number,
    total_inventory_quanty?: number,
    difference_quanty?: number,
    difference_value?: number,

}

export class AlterInventService {
    async execute({ document, branch_code, date_count, storage_code, difference_quanty, difference_value, accuracy_percent, accuracy_quanty, accuracy_value, total_inventory_quanty, total_inventory_value, total_stock_quanty, total_stock_value }: InventRequest) {
        if (!document) {
            throw new Error("Documento obrigatório")
        }

        const invent = await prismaClient.info_invent.findFirst({
            where: {
                document: document,
                branch_code: branch_code,
                storage_code: storage_code,
                date_count: date_count,
                diference_value: difference_value,
                difference_quanty: difference_quanty,
                accuracy_percent: accuracy_percent,
                accuracy_quanty: accuracy_quanty,
                accuracy_value: accuracy_value,
                total_inventory_quanty: total_inventory_quanty,
                total_inventory_value: total_inventory_value,
                total_stock_quanty: total_stock_quanty,
                total_stock_value: total_stock_value,

            }
        });

    }


}

