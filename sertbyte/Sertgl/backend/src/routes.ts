import { Router, type Request, type Response } from 'express';

const router = Router()

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ok: true})
})

export { router }