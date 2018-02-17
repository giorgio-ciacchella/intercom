

interface Customer extends LatLong {
    user_id: number;
    name: string;
}

interface LatLong {
    latitude: number;
    longitude: number;
}
