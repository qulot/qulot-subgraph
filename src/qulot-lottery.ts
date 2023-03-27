import {
  AdminTokenRecovery as AdminTokenRecoveryEvent,
  NewLottery as NewLotteryEvent,
  NewRandomGenerator as NewRandomGeneratorEvent,
  NewRewardRule as NewRewardRuleEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RoundClose as RoundCloseEvent,
  RoundDraw as RoundDrawEvent,
  RoundInjection as RoundInjectionEvent,
  RoundOpen as RoundOpenEvent,
  RoundReward as RoundRewardEvent,
  TicketsClaim as TicketsClaimEvent,
  TicketsClam as TicketsClamEvent,
  TicketsPurchase as TicketsPurchaseEvent
} from "../generated/QulotLottery/QulotLottery"
import {
  AdminTokenRecovery,
  NewLottery,
  NewRandomGenerator,
  NewRewardRule,
  OwnershipTransferred,
  RoundClose,
  RoundDraw,
  RoundInjection,
  RoundOpen,
  RoundReward,
  TicketsClaim,
  TicketsClam,
  TicketsPurchase
} from "../generated/schema"

export function handleAdminTokenRecovery(event: AdminTokenRecoveryEvent): void {
  let entity = new AdminTokenRecovery(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewLottery(event: NewLotteryEvent): void {
  let entity = new NewLottery(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.lotteryId = event.params.lotteryId
  entity.verboseName = event.params.verboseName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewRandomGenerator(event: NewRandomGeneratorEvent): void {
  let entity = new NewRandomGenerator(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.randomGeneratorAddress = event.params.randomGeneratorAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewRewardRule(event: NewRewardRuleEvent): void {
  let entity = new NewRewardRule(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.lotteryId = event.params.lotteryId
  entity._matchNumber = event.params._matchNumber
  entity.rewardUnit = event.params.rewardUnit
  entity.rewardValue = event.params.rewardValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundClose(event: RoundCloseEvent): void {
  let entity = new RoundClose(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.endTime = event.params.endTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundDraw(event: RoundDrawEvent): void {
  let entity = new RoundDraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.numbers = event.params.numbers

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundInjection(event: RoundInjectionEvent): void {
  let entity = new RoundInjection(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.injectedAmount = event.params.injectedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundOpen(event: RoundOpenEvent): void {
  let entity = new RoundOpen(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.startTime = event.params.startTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoundReward(event: RoundRewardEvent): void {
  let entity = new RoundReward(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.roundId = event.params.roundId
  entity.amountTreasury = event.params.amountTreasury
  entity.amountInjectNextRound = event.params.amountInjectNextRound

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTicketsClaim(event: TicketsClaimEvent): void {
  let entity = new TicketsClaim(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.claimer = event.params.claimer
  entity.amount = event.params.amount
  entity.numberTickets = event.params.numberTickets

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTicketsClam(event: TicketsClamEvent): void {
  let entity = new TicketsClam(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.claimer = event.params.claimer
  entity.roundId = event.params.roundId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTicketsPurchase(event: TicketsPurchaseEvent): void {
  let entity = new TicketsPurchase(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.roundId = event.params.roundId
  entity.ticketIds = event.params.ticketIds

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
