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
  const lottery = new Lottery(event.params.lotteryId);
  lottery.verboseName = event.params.verboseName;
  lottery.picture = event.params.picture;
  lottery.numberOfItems = event.params.numberOfItems.toI32();
  lottery.minValuePerItem = event.params.minValuePerItem.toI32();
  lottery.maxValuePerItem = event.params.maxValuePerItem.toI32();
  lottery.periodDays = event.params.periodDays.map<i32>((periodDay) => periodDay.toI32());
  lottery.periodHourOfDays = event.params.periodHourOfDays.toI32();
  lottery.maxNumberTicketsPerBuy = event.params.maxNumberTicketsPerBuy.toI32();
  lottery.pricePerTicket = event.params.pricePerTicket;
  lottery.treasuryFeePercent = event.params.treasuryFeePercent.toI32();
  lottery.amountInjectNextRoundPercent = event.params.amountInjectNextRoundPercent.toI32();

  lottery.block = event.block.number;
  lottery.timestamp = event.block.timestamp;

  lottery.save();
}

export function handleNewRewardRule(event: NewRewardRule): void {
  const rewardRuleId = event.params.lotteryId + ":" + event.params.matchNumber.toString();
  const rewardRule = new RewardRule(rewardRuleId);
  rewardRule.lottery = event.params.lotteryId;
  rewardRule.rewardUnit = REWARD_UNITS[event.params.rewardUnit];
  rewardRule.rewardValue = event.params.rewardValue;
  rewardRule.matchNumber = event.params.matchNumber.toI32();

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
  round.totalTickets = BigInt.zero();
  round.startTime = event.params.startTime;
  round.drawDateTime = event.params.drawDateTime;
  round.status = "Open";

  round.block = event.block.number;
  round.timestamp = event.block.timestamp;

  round.save();

  const lottery = Lottery.load(event.params.lotteryId);
  if (lottery) {
    lottery.lastRoundId = lottery.nextRoundId;
    lottery.nextRoundId = event.params.roundId.toString();
    lottery.save();
  }
}

export function handleRoundReward(event: RoundReward): void {
  const round = Round.load(event.params.roundId.toString());
  if (round) {
    round.status = "Reward";
    round.save();
  }
}

export function handleTicketsPurchase(event: TicketsPurchase): void {
  const userId = event.params.buyer.toHex();
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
  user.totalTickets = user.totalTickets.plus(BigInt.fromI32(event.params.ticketIds.length));
  user.totalAmount = user.totalAmount.plus(event.params.amount);
  user.save();
  const round = Round.load(event.params.roundId.toString());
  if (round) {
    round.totalTickets = round.totalTickets.plus(BigInt.fromI32(event.params.ticketIds.length));
    round.totalAmount = round.totalAmount.plus(event.params.amount);
    round.save();
  }
}

export function handleTicketsClaims(event: TicketsClaim): void {
  const user = User.load(event.params.claimer.toHex());
  if (user) {
    user.totalWinAmount = user.totalWinAmount.plus(event.params.amount);
    user.save();
  }
}
