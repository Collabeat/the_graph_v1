import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BuyKey } from "../generated/schema"
import { BuyKey as BuyKeyEvent } from "../generated/NFT1155PatreonV1/NFT1155PatreonV1"
import { handleBuyKey } from "../src/nft-1155-patreon-v-1"
import { createBuyKeyEvent } from "./nft-1155-patreon-v-1-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let buy = "ethereum.Tuple Not implemented"
    let newBuyKeyEvent = createBuyKeyEvent(buy)
    handleBuyKey(newBuyKeyEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BuyKey created and stored", () => {
    assert.entityCount("BuyKey", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BuyKey",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "buy",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
