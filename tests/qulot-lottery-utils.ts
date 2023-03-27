import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/QulotLottery/QulotLottery"

export function createAdminTokenRecoveryEvent(
  token: Address,
  amount: BigInt
): AdminTokenRecovery {
  let adminTokenRecoveryEvent = changetype<AdminTokenRecovery>(newMockEvent())

  adminTokenRecoveryEvent.parameters = new Array()

  adminTokenRecoveryEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  adminTokenRecoveryEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return adminTokenRecoveryEvent
}

export function createNewLotteryEvent(
  lotteryId: string,
  verboseName: string
): NewLottery {
  let newLotteryEvent = changetype<NewLottery>(newMockEvent())

  newLotteryEvent.parameters = new Array()

  newLotteryEvent.parameters.push(
    new ethereum.EventParam("lotteryId", ethereum.Value.fromString(lotteryId))
  )
  newLotteryEvent.parameters.push(
    new ethereum.EventParam(
      "verboseName",
      ethereum.Value.fromString(verboseName)
    )
  )

  return newLotteryEvent
}

export function createNewRandomGeneratorEvent(
  randomGeneratorAddress: Address
): NewRandomGenerator {
  let newRandomGeneratorEvent = changetype<NewRandomGenerator>(newMockEvent())

  newRandomGeneratorEvent.parameters = new Array()

  newRandomGeneratorEvent.parameters.push(
    new ethereum.EventParam(
      "randomGeneratorAddress",
      ethereum.Value.fromAddress(randomGeneratorAddress)
    )
  )

  return newRandomGeneratorEvent
}

export function createNewRewardRuleEvent(
  lotteryId: string,
  _matchNumber: BigInt,
  rewardUnit: i32,
  rewardValue: BigInt
): NewRewardRule {
  let newRewardRuleEvent = changetype<NewRewardRule>(newMockEvent())

  newRewardRuleEvent.parameters = new Array()

  newRewardRuleEvent.parameters.push(
    new ethereum.EventParam("lotteryId", ethereum.Value.fromString(lotteryId))
  )
  newRewardRuleEvent.parameters.push(
    new ethereum.EventParam(
      "_matchNumber",
      ethereum.Value.fromUnsignedBigInt(_matchNumber)
    )
  )
  newRewardRuleEvent.parameters.push(
    new ethereum.EventParam(
      "rewardUnit",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rewardUnit))
    )
  )
  newRewardRuleEvent.parameters.push(
    new ethereum.EventParam(
      "rewardValue",
      ethereum.Value.fromUnsignedBigInt(rewardValue)
    )
  )

  return newRewardRuleEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRoundCloseEvent(
  roundId: BigInt,
  endTime: BigInt
): RoundClose {
  let roundCloseEvent = changetype<RoundClose>(newMockEvent())

  roundCloseEvent.parameters = new Array()

  roundCloseEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  roundCloseEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return roundCloseEvent
}

export function createRoundDrawEvent(
  roundId: BigInt,
  numbers: Array<BigInt>
): RoundDraw {
  let roundDrawEvent = changetype<RoundDraw>(newMockEvent())

  roundDrawEvent.parameters = new Array()

  roundDrawEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  roundDrawEvent.parameters.push(
    new ethereum.EventParam(
      "numbers",
      ethereum.Value.fromUnsignedBigIntArray(numbers)
    )
  )

  return roundDrawEvent
}

export function createRoundInjectionEvent(
  roundId: BigInt,
  injectedAmount: BigInt
): RoundInjection {
  let roundInjectionEvent = changetype<RoundInjection>(newMockEvent())

  roundInjectionEvent.parameters = new Array()

  roundInjectionEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  roundInjectionEvent.parameters.push(
    new ethereum.EventParam(
      "injectedAmount",
      ethereum.Value.fromUnsignedBigInt(injectedAmount)
    )
  )

  return roundInjectionEvent
}

export function createRoundOpenEvent(
  roundId: BigInt,
  startTime: BigInt
): RoundOpen {
  let roundOpenEvent = changetype<RoundOpen>(newMockEvent())

  roundOpenEvent.parameters = new Array()

  roundOpenEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  roundOpenEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )

  return roundOpenEvent
}

export function createRoundRewardEvent(
  roundId: BigInt,
  amountTreasury: BigInt,
  amountInjectNextRound: BigInt
): RoundReward {
  let roundRewardEvent = changetype<RoundReward>(newMockEvent())

  roundRewardEvent.parameters = new Array()

  roundRewardEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  roundRewardEvent.parameters.push(
    new ethereum.EventParam(
      "amountTreasury",
      ethereum.Value.fromUnsignedBigInt(amountTreasury)
    )
  )
  roundRewardEvent.parameters.push(
    new ethereum.EventParam(
      "amountInjectNextRound",
      ethereum.Value.fromUnsignedBigInt(amountInjectNextRound)
    )
  )

  return roundRewardEvent
}

export function createTicketsClaimEvent(
  claimer: Address,
  amount: BigInt,
  numberTickets: BigInt
): TicketsClaim {
  let ticketsClaimEvent = changetype<TicketsClaim>(newMockEvent())

  ticketsClaimEvent.parameters = new Array()

  ticketsClaimEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )
  ticketsClaimEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  ticketsClaimEvent.parameters.push(
    new ethereum.EventParam(
      "numberTickets",
      ethereum.Value.fromUnsignedBigInt(numberTickets)
    )
  )

  return ticketsClaimEvent
}

export function createTicketsClamEvent(
  claimer: Address,
  roundId: BigInt,
  amount: BigInt
): TicketsClam {
  let ticketsClamEvent = changetype<TicketsClam>(newMockEvent())

  ticketsClamEvent.parameters = new Array()

  ticketsClamEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )
  ticketsClamEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  ticketsClamEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return ticketsClamEvent
}

export function createTicketsPurchaseEvent(
  buyer: Address,
  roundId: BigInt,
  ticketIds: Array<BigInt>
): TicketsPurchase {
  let ticketsPurchaseEvent = changetype<TicketsPurchase>(newMockEvent())

  ticketsPurchaseEvent.parameters = new Array()

  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam(
      "roundId",
      ethereum.Value.fromUnsignedBigInt(roundId)
    )
  )
  ticketsPurchaseEvent.parameters.push(
    new ethereum.EventParam(
      "ticketIds",
      ethereum.Value.fromUnsignedBigIntArray(ticketIds)
    )
  )

  return ticketsPurchaseEvent
}
