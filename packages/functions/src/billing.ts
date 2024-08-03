import Stripe from "stripe";
import { Resource } from "sst";
import { Util } from "@notes/core/util";
import { Billing } from "@notes/core/billing";

export const main = Util.handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = Billing.compute(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: "2024-06-20",
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });
});
