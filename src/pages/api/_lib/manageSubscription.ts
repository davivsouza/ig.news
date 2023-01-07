import {query as q} from 'faunadb'
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction=false
){

  //buscando apenas a referência do user, (ref do faunadb)
  const userRef = await fauna.query(
    //usando como select, para filtrar que só queremos o valor do campo ref do users
    q.Select(
      "ref",
      q.Get(
        //fazendo um match, se o customerId é == index user_by_stripe_customer_id
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  }

  if (createAction) {
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        {data : subscriptionData}
      )
    )
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ),
        {data: subscriptionData}
      )
    )
  }
  
}