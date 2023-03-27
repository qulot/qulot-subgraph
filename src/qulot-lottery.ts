import {
  NewLottery,
  NewRewardRule,
  RoundClose,
  RoundDraw,
  RoundOpen,
  RoundReward,
  TicketsClaim,
  TicketsPurchase,
} from "../generated/QulotLottery/QulotLottery";
import { Lottery, RewardRule, Round, User } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

const REWARD_UNITS = ["Percent", "Fixed"];

export function handleNewLottery(event: NewLottery): void {
  const {
    lotteryId,
    verboseName,
    picture,
    numberOfItems,
    minValuePerItem,
    maxValuePerItem,
    periodDays,
    periodHourOfDays,
    maxNumberTicketsPerBuy,
    pricePerTicket,
    treasuryFeePercent,
    amountInjectNextRoundPercent,
  } = event.params;
  const lottery = new Lottery(lotteryId.toString());
  lottery.verboseName = verboseName;
  lottery.picture = picture;
  lottery.numberOfItems = numberOfItems.toI32();
  lottery.minValuePerItem = minValuePerItem.toI32();
  lottery.maxValuePerItem = maxValuePerItem.toI32();
  lottery.periodDays = periodDays.map((periodDay) => periodDay.toI32());
  lottery.periodHourOfDays = periodHourOfDays.toI32();
  lottery.maxNumberTicketsPerBuy = maxNumberTicketsPerBuy.toI32();
  lottery.pricePerTicket = pricePerTicket;
  lottery.treasuryFeePercent = treasuryFeePercent.toI32();
  lottery.amountInjectNextRoundPercent = amountInjectNextRoundPercent.toI32();

  lottery.block = event.block.number;
  lottery.timestamp = event.block.timestamp;

  lottery.save();
}

export function handleNewRewardRule(event: NewRewardRule): void {
  const { lotteryId, matchNumber, rewardUnit, rewardValue } = event.params;
  const rewardRuleId = lotteryId + ":" + matchNumber.toString();
  const rewardRule = new RewardRule(rewardRuleId);
  rewardRule.lottery = lotteryId;
  rewardRule.rewardUnit = REWARD_UNITS[rewardUnit];
  rewardRule.rewardValue = rewardValue;

  rewardRule.block = event.block.number;
  rewardRule.timestamp = event.block.timestamp;

  rewardRule.save();
}

export function handleRoundClose(event: RoundClose): void {
  const { roundId, totalAmount, totalTickets } = event.params;
  const round = Round.load(roundId.toString());
  if (round) {
    round.status = "Close";
    round.totalAmount = totalAmount;
    round.totalTickets = totalTickets;
    round.save();
  }
}

export function handleRoundDraw(event: RoundDraw): void {
  const { roundId, numbers } = event.params;
  const round = Round.load(roundId.toString());
  if (round) {
    round.status = "Draw";
    round.winningNumbers = numbers.map((num) => num.toI32());
    round.save();
  }
}

export function handleRoundOpen(event: RoundOpen): void {
  const { roundId, lotteryId, totalAmount, startTime, drawDateTime } = event.params;
  const round = new Round(roundId.toString());
  round.lottery = lotteryId;
  round.totalAmount = totalAmount;
  round.startTime = startTime;
  round.drawDateTime = drawDateTime;
  round.status = "Open";

  round.block = event.block.number;
  round.timestamp = event.block.timestamp;

  round.save();

  const lottery = Lottery.load(lotteryId);
  if (lottery) {
    lottery.lastRoundId = lottery.nextRoundId;
    lottery.nextRoundId = roundId.toString();
    lottery.save();
  }
}

export function handleRoundReward(event: RoundReward): void {
  const { roundId } = event.params;
  const round = Round.load(roundId.toString());
  if (round) {
    round.status = "Reward";
    round.save();
  }
}

export function handleTicketsPurchase(event: TicketsPurchase): void {
  const { roundId, buyer, ticketIds, amount } = event.params;

  const userId = buyer.toHex();
  let user = User.load(userId);
  if (user == null) {
    user = new User(userId);
    user.totalAmount = BigInt.zero();
    user.totalWinAmount = BigInt.zero();
    user.totalTickets = BigInt.zero();
    user.block = event.block.number;
    user.timestamp = event.block.timestamp;
    user.save();
  }
  user.totalTickets = user.totalTickets.plus(BigInt.fromI32(ticketIds.length));
  user.totalAmount = user.totalAmount.plus(amount);
  user.save();
  const round = Round.load(roundId.toString());
  if (round) {
    round.totalTickets = round.totalTickets.plus(BigInt.fromI32(ticketIds.length));
    round.totalAmount = round.totalAmount.plus(amount);
    round.save();
  }
}

export function handleTicketsClaims(event: TicketsClaim): void {
  const { claimer, amount } = event.params;
  const user = User.load(claimer.toHex());
  if (user) {
    user.totalWinAmount = user.totalWinAmount.plus(amount);
    user.save();
  }
}
