import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BuyKey,
  RoyaltyClaimed,
  SellKey
} from "../generated/NFT1155PatreonV1/NFT1155PatreonV1"

export function createBuyKeyEvent(buy: ethereum.Tuple): BuyKey {
  let buyKeyEvent = changetype<BuyKey>(newMockEvent())

  buyKeyEvent.parameters = new Array()

  buyKeyEvent.parameters.push(
    new ethereum.EventParam("buy", ethereum.Value.fromTuple(buy))
  )

  return buyKeyEvent
}

export function createRoyaltyClaimedEvent(
  claimant: Address,
  tokenId: BigInt,
  amount: BigInt
): RoyaltyClaimed {
  let royaltyClaimedEvent = changetype<RoyaltyClaimed>(newMockEvent())

  royaltyClaimedEvent.parameters = new Array()

  royaltyClaimedEvent.parameters.push(
    new ethereum.EventParam("claimant", ethereum.Value.fromAddress(claimant))
  )
  royaltyClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  royaltyClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return royaltyClaimedEvent
}

export function createSellKeyEvent(sell: ethereum.Tuple): SellKey {
  let sellKeyEvent = changetype<SellKey>(newMockEvent())

  sellKeyEvent.parameters = new Array()

  sellKeyEvent.parameters.push(
    new ethereum.EventParam("sell", ethereum.Value.fromTuple(sell))
  )

  return sellKeyEvent
}
