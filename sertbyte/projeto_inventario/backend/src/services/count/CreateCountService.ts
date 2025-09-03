import prismaClient from "../../prisma";

interface CountRequest {
    status: string;
    user_name: string;
    product_code: string;
    product_desc: string;
    storage_code: string;
    branch_code: string;
    address_code?: string;
    count_quantity?: number;

}

export class CreateCountService {

    calc_status(value_stock: number, value_count: number) {
        if (value_stock === value_count) {
            return 'CONTADO'
        } else {
            return 'DIVERGENTE'
        }

    }

    async execute({ count_quantity, user_name, product_code, product_desc, storage_code, branch_code, address_code }: CountRequest) {

        let _newCount;


        const branch = await prismaClient.branch.findFirst({
            where: {
                code: branch_code,
            },
        });

        const stock = await prismaClient.stock.findFirst({
            where: {
                product_code: product_code,
            },
        })

        if (branch.address === true) {

            const invent_product = await prismaClient.invent_product.findFirst({
                where: {
                    product_code: product_code,
                    address_code: address_code,
                    branch_code: branch_code,
                    storage_code: storage_code,
                    status: 'NOVO'
                },
            })

            const invent_address = await prismaClient.invent_address.findFirst({
                where: {
                    address_code: address_code,
                    status: 'EM ANDAMENTO',
                    branch_code: branch_code,
                    storage_code: storage_code,
                    user_last_count: user_name,
                },
            })

            if (invent_address) {
                _newCount = await prismaClient.count.create({
                    data: {
                        count_quantity: count_quantity, // or any default value
                        status: 'CONTADO',
                        user_name: user_name,
                        product_code: product_code,
                        product_desc: product_desc,
                        storage_code: storage_code,
                        branch_code: branch_code,
                        address_code: address_code,
                        access_nivel: 0,
                    },
                    select: {
                        id: true,
                        count_quantity: true,
                        status: true,
                        user_name: true,
                        product_code: true,
                        product_desc: true,
                        storage_code: true,
                        branch_code: true,
                        address_code: true,
                    },
                })

                await prismaClient.invent_product.update({
                    where: {
                        id: invent_product.id,
                    },
                    data: {
                        status: 'CONTADO',
                        situation: this.calc_status(invent_product.original_quantity, _newCount.count_quantity),
                        difference_quantity: (invent_product.original_quantity - _newCount.count_quantity),
                        count_quantity: _newCount.count_quantity,
                        value_diferece: (stock.cost * (invent_product.original_quantity - _newCount.count_quantity)),
                        counted: true
                    }
                })

            }

        } else if (branch.address === false) {

            _newCount = await prismaClient.count.create({
                data: {
                    count_quantity: count_quantity, // or any default value
                    status: 'CONTADO',
                    user_name: user_name,
                    product_code: product_code,
                    product_desc: product_desc,
                    storage_code: storage_code,
                    branch_code: branch_code,
                    access_nivel: 0,
                },
                select: {
                    id: true,
                    count_quantity: true,
                    status: true,
                    user_name: true,
                    product_code: true,
                    product_desc: true,
                    storage_code: true,
                    branch_code: true,
                },
            });

            const invent_product = await prismaClient.invent_product.findFirst({
                where: {
                    product_code: product_code,
                    branch_code: branch_code,
                    storage_code: storage_code,
                },
            })

            await prismaClient.invent_product.update({
                where: {
                    id: invent_product.id,
                },
                data: {
                    status: 'CONTADO',
                    situation: this.calc_status(invent_product.original_quantity, (invent_product.count_quantity + _newCount.count_quantity)),
                    difference_quantity: (invent_product.original_quantity - _newCount.count_quantity),
                    count_quantity: invent_product.count_quantity + _newCount.count_quantity,
                    value_diferece: (stock.cost * (invent_product.original_quantity - _newCount.count_quantity)),
                    counted: true
                }
            });
        }
        return _newCount;
    }
}