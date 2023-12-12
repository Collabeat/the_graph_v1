import { BigInt } from '@graphprotocol/graph-ts';
import {
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from '../generated/CollaNFT/CollaNFT';
import { Token } from '../generated/schema';

export function handleTransferSingle(event: TransferSingleEvent): void {
  let token = Token.load(event.params.id.toString());
  if (!token) {
    token = new Token(event.params.id.toString());
    token.tokenId = event.params.id;
    token.createdAtTimestamp = event.block.timestamp;
    token.lastBlockNumber = event.block.number;
    token.latestPrice = new BigInt(0);
  }

  token.owner = event.params.to.toHexString();
  token.save();
}
