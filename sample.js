import { checkMessageCount } from './helper';
import credentials from '../../config/credentials';
import vendorModel from '../../models/vendorModel';
const africastalking = require('africastalking')(credentials);

const sms = africastalking.SMS;

/**
 * Send an sms by passing all necessary required arguments..
 * @param {Model} number - The Model argument will be used to find the vendor
 * @param {message} message - The message that you want to send
 * @param {toModel} toModel - This represents a model used to get customer to send an sms to
 * @param {from} from - Where the message is coming from, In this case(Vendor)
 * @param {vendorId} vendorId - Represents a vendor dbId to help in db query
 * @param {customerId} customerId - Represents customer dbId to help in db query
 */

const sendSms = async (Model, message, toModel, from, vendorId, customerId) => {
  const sender = await Model.findById(vendorId);
  const smsBalance = sender.smsCount;
  const sendTo = await toModel.findById(customerId);

  //   get service code
  const serviceCode = sender.serviceCode;

  // check sender sms count
  const smsCount = checkMessageCount(message);

  if (smsCount < smsBalance) {
    const options = {
      to: sendTo.phoneNumber,
      message: message,
      from,
      enque: true
    };

    try {
      await sms.send(options);
      let newSmsBalance = smsBalance - smsCount;
      await Model.findOneAndUpdate(
        { serviceCode },
        { $set: { smsCount: newSmsBalance } }
      );
    } catch (err) {
      console.log(err, 'error');
    }
  } else {
    console.log(`You dont have enough messages, please to up your account.`);
  }
};

/**
 * Send sms to customers to single customer or many customers from vendors dashboard
 * @param {vendorModel} number - The Model argument will be used to find the vendor
 * @param {message} message - The message that you want to send
 * @param {phoneNumbers} phoneNumbers - customer's phone number one or more
 * @param {from} from - Where the message is coming from, In this case(Vendor)
 * @param {vendorId} vendorId - Represents a vendor dbId to help in db query
 * @returns {res} res - The response returned after msg is sent successful
 */

const sendSmsToCustomer = async (
  VendorModel,
  message,
  phoneNumbers,
  from,
  vendorId,
  res
) => {
  const sender = await VendorModel.findById(vendorId);
  if (sender) {
    const smsBalance = sender.smsCount;

    //   get service code
    const serviceCode = sender.serviceCode;

    // check sender sms count
    const smsCount = checkMessageCount(message);

    let numberOfCustomers = phoneNumbers.length;
    let newSmsCount = numberOfCustomers * smsCount;

    if (smsCount < smsBalance) {
      const smsOpts = {
        to: phoneNumbers,
        message,
        from,
        enque: true
      };

      sms
        .send(smsOpts)
        .then(smsResponse => {
          let newSmsBalance = smsBalance - newSmsCount;

          vendorModel
            .findOneAndUpdate(
              { serviceCode },
              { $set: { smsCount: newSmsBalance } }
            )
            .then(() => {
              return res.status(200).json({
                status: true,
                message: smsResponse
              });
            });
        })
        .catch(err => {
          return res.status(400).json({
            success: false,
            message: `Something went wrong: ${err}`
          });
        });
    } else {
      console.log(`You dont have enough messages, please to up your account.`);
    }
  }
};

export { sendSms, sendSmsToCustomer };