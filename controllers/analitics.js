const Order = require("../models/Order");
const moment = require("moment");
const errorHandler = require("../utils/errorHandler");

module.exports.overview = async function (req, res) {
  try {
    // getting all orders
    const allOrders = await Order.find({ id: req.user.id }).sort(1)
    // mapping all orders with dates
    const ordersMap = getOrdersMap(allOrders);

    // list of yestetday orders
    const ordersYesterday =
      ordersMap[moment().add(-1, "d").format("DD.MM.YYYY")] || [];
    // yesterday orders number
    const totalYesterdayNumber = ordersYesterday.length;
    // number of orders 
    const totalOrdersNumber = allOrders.length;
    // number of days
    const daysNumber = Object.keys(ordersMap).length;
    // numer of orders per day
    const ordersPerDay = (totalOrdersNumber / dateOrders).toFixed(0);
    // percent of orders change
    const ordersPercent = (
      (totalYesterdayNumber / ordersPerDay - 1) *
      100
    ).toFixed(2);
    // profit for all orders
    const totalProfit = calculateProfit(allOrders);
    // profit for 1 day
    const profitPerDay = totalProfit / daysNumber
    // profit for yesterday 
    const yesterdayProfit = calculateProfit(ordersYesterday)
    // percent of profit change
    const percentProfit = (
      (yesterdayProfit / profitPerDay - 1) *
      100
    ).toFixed(2);
    // profit comparison (yesterday and per day)
    const compareProfit = (yesterdayProfit - profitPerDay).toFixed(2)
    // number of orders comparison (yesterday and per day)
    const compareNumber = (totalYesterdayNumber - ordersPerDay).toFixed(2)

    res.status(200).json({
      // toFixed() returns us STRING, so we need to use + to make it number
      gain: {
        percent: Math.abs(+percentProfit),
        compare: Math.abs(+compareProfit),
        yesterday: +yesterdayProfit,
        isHigher: +percentProfit > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +totalYesterdayNumber,
        isHigher: +ordersPercent > 0
      },
    })
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.analitics = function (req, res) {};

function getOrdersMap(orders = []) {
  const dateOrders = {};

  orders.forEach((order) => {
    const date = moment(order.date).format("DD.MM.YYYY");

    if (date === moment().format("DD.MM.YYYY")) {
      return;
    }

    if (!dateOrders[date]) {
      dateOrders[date] = [];
    }

    dateOrders[date].push(order);
  });
  return dateOrders;

  // SOMETHING LIKE: 
  // ['01.01.2020': [orderObj, orderObj, orderObj]],
  // ...
}

function calculateProfit(orders = []) {
  return orders.reduce((total, order) => {
    const orderProfit = order.reduce((orderTotal, item) => {
      return (orderTotal += item.quantity * item.cost);
    }, 0);

    return (total += orderProfit);
  }, 0);
}
