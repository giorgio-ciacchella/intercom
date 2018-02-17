
import * as request from 'request-promise-native';

export function fetchText(url: string): Promise<any> {
    return request(url);
}

function toRadian(value: number): number {
    return value * 3.14 / 180;
}

function toCustomer(customer) {
    const allowedKeys = ['name', 'user_id', 'latitude', 'longitude']
    Object.keys(customer).forEach((key) => {
        if(allowedKeys.indexOf(key) === -1 || !customer.user_id || !customer.name || !customer.latitude || !customer.longitude) {
            throw new Error('Customer Object Malformed');
        }
        if(key !== 'name') {
            customer[key] = Number(customer[key]);
        }
    });
}

function calculateDistance(c1: Customer, office: LatLong): number {
    const earthRadium = 6371; // km
    const lat1 = toRadian(Number(c1.latitude));
    const lat2 = toRadian(office.latitude);
    const long2 = toRadian(office.longitude);
    const long1 = toRadian(Number(c1.longitude));
    return earthRadium * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(Math.abs(long1 - long2)));

}

export function getInvitedCustomers(data: string): Partial<Customer>[] {
    const allCustomers: Customer[] = data.split('\n')
        .map(cusomterString =>  {
            let parsedJson;
            try {
                parsedJson = JSON.parse(cusomterString);
                toCustomer(parsedJson);
                return parsedJson;
            } catch (e) {
                throw new Error(`Error occured while parsing the string : ${e.message} `);
            }
        });

    const acceptedCustomers: Customer[] = [];
    const office: LatLong = {
        latitude: 53.339428,
        longitude: -6.257664
    };
    allCustomers.forEach((customer, index) => {
        if(calculateDistance(customer, office) <= 100) {
            delete customer.latitude;
            delete customer.longitude;
            acceptedCustomers.push(customer);
        }
    });
    return acceptedCustomers.sort((c1, c2) => {
        return c1.user_id - c2.user_id;
    });
}
