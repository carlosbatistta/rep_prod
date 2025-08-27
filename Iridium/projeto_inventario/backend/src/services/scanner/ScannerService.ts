import { connectToSqlServer } from "../../database/sqlServer";
import prismaClient from "../../prisma";

interface ScannerRequest {
    branch_code: string;
    storage_code: string;
    document: number
}

export class ScannerService {
    async execute({ branch_code, storage_code, document }: ScannerRequest): Promise<any> {
        const branch = await prismaClient.branch.findFirst({
            where: {
                code: branch_code,
            }
        })
        if (branch.address) {

        }
    }
}