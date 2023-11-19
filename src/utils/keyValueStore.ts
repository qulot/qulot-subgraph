import { BigInt } from "@graphprotocol/graph-ts";
import { KeyValue } from "../../generated/schema";
import { BIGINT_ZERO } from "./constant";

export function getOrSave(key: string): KeyValue {
  let keyValue = KeyValue.load(key);
  if (!keyValue) {
    keyValue = new KeyValue(key);
    keyValue.save();
  }
  return keyValue;
}

// eslint-disable-next-line
export function getBigInt(key: string): BigInt {
  const keyValue = getOrSave(key);
  if (keyValue.value) {
    return BigInt.fromString(keyValue.value as string);
  }
  return BIGINT_ZERO;
}

// eslint-disable-next-line
export function saveBigInt(key: string, value: BigInt): void {
  const keyValue = new KeyValue(key);
  keyValue.value = value.toString();
  keyValue.save();
}
