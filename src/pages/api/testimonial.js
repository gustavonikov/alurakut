import { SiteClient } from 'datocms-client'

export default async function requestsReceptor(req, res) {
    if (req.method === 'POST') {
        const client = new SiteClient(process.env.FULL_API_TOKEN)

        const testimonialRecord = await client.items.create({
            itemType: '977525',
            ...req.body
        })

        res.json({
            testimonialRecord
        })

        return
    }

    return res.status(404).json({
        status: 404,
        message: 'Not available to make a GET request yet.'
    })
}
