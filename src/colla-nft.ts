import { BigInt } from '@graphprotocol/graph-ts';
import {
  CollaNFT,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from '../generated/CollaNFT/CollaNFT';
import { Token, TokenUserRegistry, User } from '../generated/schema';

export function handleTransferSingle(event: TransferSingleEvent): void {
  let token = Token.load(event.params.id.toString());
  if (!token) {
    token = new Token(event.params.id.toString());
    token.tokenId = event.params.id;
    token.createdAtTimestamp = event.block.timestamp;
    token.lastBlockNumber = event.block.number;
    token.latestPrice = new BigInt(0);

    let collabeatNftContract = CollaNFT.bind(event.address);
    token.metadataURI = collabeatNftContract.uri(event.params.id);
    token.save();
  }

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }

  let tokenUserId =
    event.params.id.toString() + '-' + event.params.to.toHexString();
  let tokenUser = TokenUserRegistry.load(tokenUserId);
  if (!tokenUser) {
    tokenUser = new TokenUserRegistry(tokenUserId);
    tokenUser.token = event.params.id.toString();
  }

  tokenUser.user = event.params.to.toHexString();
  tokenUser.save();
}
