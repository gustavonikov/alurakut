import { SiteClient } from 'datocms-client'

export default async function requestsReceptor(req, res) {
    if (req.method === 'POST') {
        const client = new SiteClient(process.env.FULL_API_TOKEN)

        const communityRecord = await client.items.create({
            itemType: '975865',
            ...req.body
        })

        res.json({
            communityRecord
        })

        return
    }

    return res.status(404).json({
        status: 404,
        message: 'Not available to make a GET request yet.'
    })
}
