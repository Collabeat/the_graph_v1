import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  BuyKey as BuyKeyEvent,
  RoyaltyClaimed as RoyaltyClaimedEvent,
  SellKey as SellKeyEvent,
} from '../generated/NFT1155PatreonV1/NFT1155PatreonV1';
import { Transaction, Token, Patreon, User } from '../generated/schema';

export function handleBuyKey(event: BuyKeyEvent): void {
  createTransaction(
    'buy',
    event.params.buy.user,
    event.params.buy.amount,
    event.params.buy.tokenId,
    event.block.number,
    event.transaction.hash
  );

  let tokenId = event.params.buy.tokenId.toString();
  let token = Token.load(tokenId);
  if (token) {
    token.latestPrice = event.params.buy.price;
    token.save();
  }

  let userId = event.params.buy.user.toHexString();
  let patreon = Patreon.load(`${userId}-${tokenId}`);
  if (!patreon) {
    patreon = new Patreon(`${userId}-${tokenId}`);
    patreon.subscriber = userId;
    patreon.tokenId = event.params.buy.tokenId;
  }

  patreon.totalAmount = event.params.buy.supplyPerUser;
  patreon.save();
}

export function handleSellKey(event: SellKeyEvent): void {
  createTransaction(
    'sell',
    event.params.sell.user,
    event.params.sell.amount,
    event.params.sell.tokenId,
    event.block.number,
    event.transaction.hash
  );

  let tokenId = event.params.sell.tokenId.toString();
  let token = Token.load(tokenId);
  if (token) {
    token.latestPrice = event.params.sell.price;
    token.save();
  }

  // update patreon
  let userId = event.params.sell.user.toHexString();
  let patreon = Patreon.load(`${userId}-${tokenId}`);
  if (!patreon) {
    patreon = new Patreon(`${userId}-${tokenId}`);
    patreon.subscriber = userId;
    patreon.tokenId = event.params.sell.tokenId;
  }

  patreon.totalAmount = event.params.sell.supplyPerUser;
  patreon.save();
}

export function handleRoyaltyClaimed(event: RoyaltyClaimedEvent): void {
  createTransaction(
    'royalty',
    event.params.claimant,
    event.params.amount,
    event.params.tokenId,
    event.block.number,
    event.transaction.hash
  );
}

function createTransaction(
  activity: string,
  address: Address,
  amount: BigInt,
  tokenId: BigInt,
  blockNumber: BigInt,
  txHash: Bytes
): void {
  let transaction = new Transaction(txHash.toHexString());

  transaction.activity = activity;
  transaction.address = address.toHexString();
  transaction.amount = amount;
  transaction.tokenId = tokenId;
  transaction.blockNumber = blockNumber;

  transaction.save();

  let user = User.load(address.toHexString());
  if (!user) user = new User(address.toHexString());
  user.save();
}
