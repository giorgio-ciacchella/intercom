import { getInvitedCustomers } from '../../src/utils';
import dataString from '../mock-data/good-mock1';
import badStructureMock from '../mock-data/bad-structure-mock';
import notInvitedMock from '../mock-data/notInvited';
import allInvited from '../mock-data/allInvited';


describe('customer application', () => {


    it('getInvitedCustomers', () => {
        const invitedCustomers: Partial<Customer>[] = getInvitedCustomers(dataString);
        expect(invitedCustomers.length).toBe(16);
        let previousId = -1;
        invitedCustomers.forEach((customer) => {
            expect(customer.user_id).toBeGreaterThan(previousId);
            previousId = customer.user_id;
        });
    });

    it('getInvitedCustomers with malformed data', () => {
        try {
            const invitedCustomers: Partial<Customer>[] = getInvitedCustomers(`
                asdflakj asdlfkaj dlfkaj
            `);
            fail();
        }
        catch (e) {
            expect(e.message).toContain(`Error occured while parsing the string`);
        }
    });

    it('getInvitedCustomers with malformed Customer object', () => {
        try {
            const invitedCustomers: Partial<Customer>[] = getInvitedCustomers(badStructureMock);
            fail();
        }
        catch (e) {
            expect(e.message).toContain(`Customer Object Malformed`);
        }
    });

    it('getInvitedCustomers with all customers not invtied', () => {
        const invitedCustomers: Partial<Customer>[] = getInvitedCustomers(notInvitedMock);
        expect(invitedCustomers.length).toBe(0);
    });

    it('getInvitedCustomers with all customers invtied', () => {
        const invitedCustomers: Partial<Customer>[] = getInvitedCustomers(allInvited);
        expect(invitedCustomers.length).toBe(16);
    });

});