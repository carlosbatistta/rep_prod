import prismaClient from "../../prisma";

export class ValidadeService {
    static async validateStockDocument(branch_code: string, storage_code: string, date_count: string, document: number) {
        const stockDocument = await prismaClient.info_stock.findFirst({
            where: {
                branch_code,
                storage_code,
                date_count
            }
        });

        if (!stockDocument) {
            throw new Error("Documento de estoque não encontrado.");
        }

        if (document !== stockDocument.document) {
            throw new Error("Documentos não correspondem.");
        }

        return stockDocument;
    }
}
