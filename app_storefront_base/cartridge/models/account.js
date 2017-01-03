'use strict';

var helper = require('~/cartridge/scripts/dwHelpers');

/**
 * Creates a plain object that contains profile information
 * @param {Object} profile - current customer's profile
 * @returns {Object} an object that contains information about the current customer's profile
 */
function getProfile(profile) {
    var result;
    if (profile) {
        result = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phone: profile.phone,
            password: '********'
        };
    } else {
        result = null;
    }
    return result;
}

/**
 * Creates a plain object that contains order history
 * @param {Object} orderModel - current customer's recent order history
 * @returns {Object} an object that contains information about the current customer's recent order
 */
function getOrderHistory(orderModel) {
    var result;
    if (orderModel) {
        var items = orderModel.items;
        var firstItem = helper.first(items);
        var firstItemImage = firstItem.product.getImage('small', 0);
        result = {
            orderNumber: orderModel.orderNumber,
            creationDate: orderModel.creationDate,
            orderStatus: orderModel.orderStatus.displayValue.toLowerCase(),
            orderShippedTo: {
                firstName: orderModel.shipping.shippingAddress.firstName,
                lastName: orderModel.shipping.shippingAddress.lastName
            },
            orderTotal: orderModel.totals.grandTotal,
            totalOrderItems: orderModel.productQuantityTotal,
            firstItem: {
                src: firstItemImage.URL.relative().toString(),
                alt: firstItemImage.alt,
                title: firstItemImage.title
            }
        };
    } else {
        result = null;
    }
    return result;
}

/**
 * Creates a plain object that contains payment instrument information
 * @param {Object} wallet - current customer's wallet
 * @returns {Object} object that contains info about the current customer's payment instrument
 */
function getPayment(wallet) {
    if (wallet) {
        var paymentInstruments = wallet.paymentInstruments;
        var paymentInstrument = helper.first(paymentInstruments);

        if (paymentInstrument) {
            return {
                maskedCreditCardNumber: paymentInstrument.maskedCreditCardNumber,
                creditCardType: paymentInstrument.creditCardType,
                creditCardExpirationMonth: paymentInstrument.creditCardExpirationMonth,
                creditCardExpirationYear: paymentInstrument.creditCardExpirationYear
            };
        }
    }
    return null;
}

/**
 * Account class that represents the current customer's profile dashboard
 * @param {dw.customer.Customer} currentCustomer - Current customer
 * @param {Object} addressModel - The current customer's preferred address
 * @param {Object} orderModel - The current customer's order history
 * @constructor
 */
function account(currentCustomer, addressModel, orderModel) {
    this.profile = getProfile(currentCustomer.profile);
    this.preferredAddress = addressModel;
    this.orderHistory = getOrderHistory(orderModel);
    this.payment = getPayment(currentCustomer.wallet);
}

module.exports = account;
