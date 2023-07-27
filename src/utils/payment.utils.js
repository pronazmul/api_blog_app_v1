// Initialize Module
const PaymentUtils = {}

/**
 * @desc SSL Commerz Object Maker
 * @param {string} apiURL
 * @param {number} ammount
 * @param {string} customerName
 * @param {string} customer_email
 * @param {string} productName
 * @param {string} customer_postCode
 * @returns {JSON}
 */

PaymentUtils.sslCommerzObjectMaker = (
  apiURL,
  ammount,
  customerName = 'Mr Bilred Hossain',
  customer_email = 'bilred@gmail.com',
  productName = 'Computer',
  customer_postCode = '2216'
) => {
  const data = {
    total_amount: ammount,
    currency: 'BDT',
    tran_id: 'REF1234', // use unique tran_id for each api
    success_url: `${apiURL}/success`,
    fail_url: `${apiURL}/fail`,
    cancel_url: `${apiURL}/cancel`,
    ipn_url: `${apiURL}/ipn`,
    shipping_method: 'Courier',
    product_name: productName,
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: customerName,
    cus_email: customer_email,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: customer_postCode,
    ship_country: 'Bangladesh',
  }
  return data
}

export default PaymentUtils
