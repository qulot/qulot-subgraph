import { ethereum } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";
import { BIGINT_ONE, BIGINT_ZERO } from "./constant";
import { getBigInt, saveBigInt } from "./keyValueStore";

export function createNewUser(userId: string, block: ethereum.Block): User {
  const user = new User(userId);
  user.totalAmount = BIGINT_ZERO;
  user.totalWinAmount = BIGINT_ZERO;
  user.totalTickets = BIGINT_ZERO;
  user.block = block.number;
  user.timestamp = block.timestamp;
  user.save();
  saveBigInt("totalUsers", getBigInt("totalUsers").plus(BIGINT_ONE));
  return user;
}

export function getOrCreateUser(userId: string, block: ethereum.Block): User {
  let user = User.load(userId);
  if (user == null) {
    user = createNewUser(userId, block);
  }
  return user;
}
