import Stripe from "stripe";
import getRawBody from "raw-body";
import Order from "../models/order";
import APIFilters from "../utils/apiFilters";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const getOrders = async (req, res) => {
  const resPerPage = 2;
  const ordersCount = await Order.countDocuments();

  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query.find().populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.query.id).populate(
    "shippingInfo user"
    );
    
    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

  res.status(200).json({
    order,
  });
};

export const updateOrder = async (req, res) => {
  let order = await Order.findById(req.query.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  order = await Order.findByIdAndUpdate(req.query.id, {
    orderStatus: req.body.orderStatus,
  });

  res.status(200).json({
    success: true,
    order,
  });
};

export const deleteOrder = async (req, res) => {
  let order = await Order.findById(req.query.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
};

export const myOrders = async (req, res) => {
  const resPerPage = 2;
  const ordersCount = await Order.find({user:req.query.userId}).countDocuments();
  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query.find({ user:req.query.userId }).populate("user shippingInfo").catch((e)=>console.log(e,'error'))
  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

export const canReview = async (req, res) => {
  const productId = req.query.productId;

  const orders = await Order.find({
    user: req?.query?.id,
    "orderItems.product": productId,
  });

  let canReview = orders?.length >= 1 ? true : false;

  res.status(200).json({
    canReview,
  });
};

export const checkoutSession = async (req, res) => {
  const body = req.body;
  const line_items = body?.items?.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: { productId: item.product },
        },
        unit_amount: item.price * 100,
      },
      tax_rates: ["txr_1NpMjlSJO1ZZV7ezneICAzZV"],
      quantity: item.quantity,
    };
  });

  const shippingInfo = body?.shippingInfo;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.API_URL}/me/orders?order_success=true`,
    cancel_url: `${process.env.API_URL}`,
    customer_email: req?.body?.user?.email,
    client_reference_id: req?.body?.user?._id,
    mode: "payment",
    metadata: { shippingInfo },
    shipping_options: [
      {
        shipping_rate: "shr_1Np8ZLSJO1ZZV7ezkJFMDsEg",
      },
    ],
    line_items,
  });

  res.status(200).json({
    url: session.url,
  });
};


async function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}
export const webhook = async (req, res) => {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };
  
      const order = await new Order(orderData);
      const orderDetails = await order.save()
      console.log(orderDetails,'order');
      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
};