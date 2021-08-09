
export type Restaurant = {
    _id: string,
    shopName: string,
    address: string,
    rating: number,
    reviewsCount: number,
    category: string,
    isOpen: boolean,
    image: string,
    tags: [string],
    ttp: string,
    location: GeoLocation,
}

export type GeoLocation = {
    longitude: number,
    latitude: number,
}