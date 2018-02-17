
import { fetchText, getInvitedCustomers } from './utils';
const fileURL = 'https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt';

fetchText(fileURL)
.then((data) => {
    console.log(getInvitedCustomers(data));
});

