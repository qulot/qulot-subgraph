import {
  ModifiedLottery,
  MultiRoundsTicketsPurchase,
  NewLottery,
  NewRewardRule,
  RoundClose,
  RoundDraw,
  RoundInjection,
  RoundOpen,
  RoundReward,
  TicketsClaim,
} from "../generated/QulotLottery/QulotLottery";
import { Lottery, Order, RewardRule, Round, User } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
import { getBigInt, saveBigInt } from "./utils/keyValueStore";
import { BIGINT_ZERO } from "./utils/constant";
import { getOrCreateUser } from "./utils/user";

export function handleNewLottery(event: NewLottery): void {
  const lottery = new Lottery(event.params.lotteryId);
  lottery.verboseName = event.params.lottery.verboseName;
  lottery.picture = event.params.lottery.picture;
  lottery.numberOfItems = event.params.lottery.numberOfItems.toI32();
  lottery.minValuePerItem = event.params.lottery.minValuePerItem.toI32();
  lottery.maxValuePerItem = event.params.lottery.maxValuePerItem.toI32();
  lottery.periodDays = event.params.lottery.periodDays.map<i32>((periodDay) => periodDay.toI32());
  lottery.periodHourOfDays = event.params.lottery.periodHourOfDays.toI32();
  lottery.maxNumberTicketsPerBuy = event.params.lottery.maxNumberTicketsPerBuy.toI32();
  lottery.pricePerTicket = event.params.lottery.pricePerTicket;
  lottery.treasuryFeePercent = event.params.lottery.treasuryFeePercent.toI32();
  lottery.amountInjectNextRoundPercent = event.params.lottery.amountInjectNextRoundPercent.toI32();
  lottery.discountPercent = event.params.lottery.discountPercent.toI32();

  lottery.block = event.block.number;
  lottery.timestamp = event.block.timestamp;

  lottery.save();
}

export function handleModifiedLottery(event: ModifiedLottery): void {
  const lottery = Lottery.load(event.params.lotteryId);
  if (lottery != null) {
    lottery.verboseName = event.params.lottery.verboseName;
    lottery.picture = event.params.lottery.picture;
    lottery.numberOfItems = event.params.lottery.numberOfItems.toI32();
    lottery.minValuePerItem = event.params.lottery.minValuePerItem.toI32();
    lottery.maxValuePerItem = event.params.lottery.maxValuePerItem.toI32();
    lottery.periodDays = event.params.lottery.periodDays.map<i32>((periodDay) => periodDay.toI32());
    lottery.periodHourOfDays = event.params.lottery.periodHourOfDays.toI32();
    lottery.maxNumberTicketsPerBuy = event.params.lottery.maxNumberTicketsPerBuy.toI32();
    lottery.pricePerTicket = event.params.lottery.pricePerTicket;
    lottery.treasuryFeePercent = event.params.lottery.treasuryFeePercent.toI32();
    lottery.amountInjectNextRoundPercent = event.params.lottery.amountInjectNextRoundPercent.toI32();
    lottery.discountPercent = event.params.lottery.discountPercent.toI32();

    lottery.block = event.block.number;
    lottery.timestamp = event.block.timestamp;

    lottery.save();
  }
}

export function handleNewRewardRule(event: NewRewardRule): void {
  const rewardRuleId = event.params.lotteryId + ":" + event.params.rule.matchNumber.toString();
  const rewardRule = new RewardRule(rewardRuleId);
  rewardRule.lottery = event.params.lotteryId;
  rewardRule.rewardValue = event.params.rule.rewardValue;
  rewardRule.matchNumber = event.params.rule.matchNumber.toI32();

  rewardRule.block = event.block.number;
  rewardRule.timestamp = event.block.timestamp;

  rewardRule.save();
}

export function handleRoundClose(event: RoundClose): void {
  const round = Round.load(event.params.roundId.toString());
  if (round) {
    round.status = "Close";
    round.totalAmount = event.params.totalAmount;
    round.totalTickets = event.params.totalTickets;
    round.save();
  }
}

export function handleRoundDraw(event: RoundDraw): void {
  const round = Round.load(event.params.roundId.toString());
  if (round) {
    round.status = "Draw";
    round.winningNumbers = event.params.numbers.map<i32>((num) => num.toI32());
    round.save();
  }
}

export function handleRoundOpen(event: RoundOpen): void {
  const round = new Round(event.params.roundId.toString());
  round.lottery = event.params.lotteryId;
  round.totalAmount = event.params.totalAmount;
  round.totalTickets = BIGINT_ZERO;
  round.startTime = event.params.startTime;
  round.firstRound = event.params.firstRoundId.toString();
  round.status = "Open";
  round.block = event.block.number;
  round.timestamp = event.block.timestamp;
  round.save();

  const lottery = Lottery.load(event.params.lotteryId);
  if (lottery) {
    lottery.lastRound = lottery.nextRound;
    lottery.nextRound = event.params.roundId.toString();
    lottery.save();
  }
}

export function handleRoundReward(event: RoundReward): void {
  const round = Round.load(event.params.roundId.toString());
  if (round) {
    round.status = "Reward";
    round.endTime = event.params.endTime;
    round.save();
  }
}

export function handleRoundInjection(event: RoundInjection): void {
  const round = Round.load(event.params.roundId.toString());
  if (round) {
    round.totalAmount = round.totalAmount.plus(event.params.injectedAmount);
    round.save();

    // Update total prize
    saveBigInt("totalPrize", getBigInt("totalPrize").plus(event.params.injectedAmount));
  }
}

export function handleMultiRoundsTicketsPurchase(event: MultiRoundsTicketsPurchase): void {
  // Try load user by user id or create new
  const user = getOrCreateUser(event.params.buyer.toHex(), event.block);
  let totalOrderAmount = BigInt.zero();

  // Update total tickets, total amount for round
  for (let orderIdx = 0; orderIdx < event.params.ordersResult.length; orderIdx++) {
    const orderResult = event.params.ordersResult[orderIdx];
    const ticketIdsLength = BigInt.fromI32(orderResult.ticketIds.length);

    // Update new user summary total tickets and amount
    user.totalTickets = user.totalTickets.plus(ticketIdsLength);
    user.totalAmount = user.totalAmount.plus(orderResult.orderAmount);

    totalOrderAmount = totalOrderAmount.plus(orderResult.orderAmount);

    const round = Round.load(orderResult.roundId.toString());
    if (round) {
      round.totalTickets = round.totalTickets.plus(ticketIdsLength);
      round.totalAmount = round.totalAmount.plus(orderResult.orderAmount);
      round.save();
    }

    // Create new order for user
    const order = new Order(orderResult.orderId.toString());
    order.user = event.params.buyer.toHex();
    order.round = orderResult.roundId.toString();
    order.orderAmount = orderResult.orderAmount;
    order.ticketIds = orderResult.ticketIds;

    order.block = event.block.number;
    order.timestamp = event.block.timestamp;
    order.save();
  }

  // Save user information
  user.save();

  // Update total prize
  saveBigInt("totalPrize", getBigInt("totalPrize").plus(totalOrderAmount));
}

export function handleTicketsClaims(event: TicketsClaim): void {
  const user = User.load(event.params.claimer.toHex());
  if (user) {
    user.totalWinAmount = user.totalWinAmount.plus(event.params.amount);
    user.save();
  }
}
