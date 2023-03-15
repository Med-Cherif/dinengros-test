export default function formatUserData(userData: any){
    const { address, address_facturation, ...rest } = userData
    return {
        ...rest,
        is_company: (rest.is_company === true || rest.is_company === 1) ? true : false,
        phone: rest.profile?.phone || '',
        address: {
            street_name: address?.street_name || '',
            city: address?.post_name || '',
            zip_code: address?.street_zip_code || '',
        },
        address_facturation: {
            name: address_facturation?.name || '',
            phone: address_facturation?.phone || '',
            street_name: address_facturation?.street_name || '',
            city: address_facturation?.city || '',
            zip_code: address_facturation?.zip_code || ''
        }
    }
    // {
    //     "id": 522,
    //     "first_name": "Mohamed",
    //     "last_name": "Cherif",
    //     "email": "try@gmail.com",
    //     "is_company": 1,
    //     "favories": 0,
    //     "products_discount": [],
    //     "profile": {
    //         "matricule": null,
    //         "phone": "0550913356",
    //         "company": "Try Tech",
    //         "company_number": "458795",
    //         "region": null,
    //         "user_group": {
    //             "id": 1,
    //             "name": "Standard",
    //             "code": "Standard",
    //             "description": "Standard",
    //             "created_at": "2021-07-03T02:34:41.000000Z",
    //             "updated_at": "2021-08-05T17:59:25.000000Z",
    //             "deleted": false
    //         }
    //     },
    //     "address": {
    //         "id": 507,
    //         "user_id": 522,
    //         "street_name": "Course",
    //         "street_zip_code": "07000",
    //         "post_name": "Biskra",
    //         "post_zip_code": null
    //     },
    //     "address_facturation": null,
    //     "updated_at": "4 minutes ago",
    //     "created_at": "2022-12-27 10:04:56"
    // }
}