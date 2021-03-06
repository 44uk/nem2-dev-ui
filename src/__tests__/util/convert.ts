import {
  convertHexToNum,
  convertHexToUInt64,
  convertNumToHex,
  convertNumToUInt64,
  convertUInt64ToHex,
  convertUInt64ToNum,
  decodeAddress,
  encodeAddress,
  decodeHexToRaw,
  encodeRawToHex,
  convertIdentifierToNamespaceId,
  convertIdentifierToNamespaceHex,
  convertIdentifierToMosaicId,
  convertIdentifierToMosaicHex,
  nemTimestampToDatetimeString,
  datetimeStringToNemTimestamp,
  createAddressFromIdentifier,
} from "util/convert"
import { NamespaceId, MosaicId, Address, NetworkType } from "nem2-sdk"

test("Hex to Num", () => {
  expect(convertHexToNum("0000000000000000")).toBe("0")
  // expect(convertHexToNum("FFFFFFFFFFFFFFFF")).toBe("18446744073709551615")
})

test("Hex to Uint64", () => {
  expect(convertHexToUInt64("0000000000000000")).toEqual("[0,0]")
  expect(convertHexToUInt64("FFFFFFFFFFFFFFFF")).toEqual("[4294967295,4294967295]")
})

test("Num to Hex", () => {
  expect(convertNumToHex("4294967295")).toBe("FFFFFFFF")
  expect(convertNumToHex(Number.MAX_SAFE_INTEGER.toString())).toBe("1FFFFFFFFFFFFF")
  // expect(convertNumToHex("18446744073709551615")).toBe("ffffffffffffffff")
})

test("Num to UInt64", () => {
  expect(convertNumToUInt64("4294967295")).toEqual("[4294967295,0]")
  expect(convertNumToUInt64(Number.MAX_SAFE_INTEGER.toString())).toEqual("[4294967295,2097151]")
  // expect(convertNumToUInt64(18446744073709551615)).toEqual({ lower: 4294967295, higher: 4294967295 })
})

test("Uint64 to Hex", () => {
  expect(convertUInt64ToHex("[         0,         0]")).toBe("0000000000000000")
  expect(convertUInt64ToHex("[4294967295,4294967295]")).toBe("FFFFFFFFFFFFFFFF")
})

test("Uint64 to Num", () => {
  expect(convertUInt64ToNum("[         0,         0]")).toBe(0)
  expect(convertUInt64ToNum("[4294967295,   2097151]")).toBe(Number.MAX_SAFE_INTEGER)
  // expect(convertUInt64ToNum("[4294967295,4294967295]")).toBe()
})

test("decode Address", () => {
  expect(decodeAddress("SA5RSU7NHSA333LU6LA3WK6MQMSANL4IAV34LDI6"))
    .toBe("903B1953ED3C81BDED74F2C1BB2BCC832406AF880577C58D1E")
})

test("encode Address", () => {
  expect(encodeAddress("903B1953ED3C81BDED74F2C1BB2BCC832406AF880577C58D1E"))
    .toBe("SA5RSU7NHSA333LU6LA3WK6MQMSANL4IAV34LDI6")
})

test("decode Hex to Raw", () => {
  expect(decodeHexToRaw("474F4F44204C55434B21")).toBe("GOOD LUCK!")
})

test("encode Raw to Hex", () => {
  expect(encodeRawToHex("GOOD LUCK!")).toBe("474F4F44204C55434B21")
})

test("convertIdentifierToNamespaceId", () => {
  const id = new NamespaceId("cat.currency").id
  expect(convertIdentifierToNamespaceId("cat.currency").id).toEqual(id)
  expect(convertIdentifierToNamespaceId("[3294802500, 2243684972]").id).toEqual(id)
  expect(convertIdentifierToNamespaceId("3294802500, 2243684972").id).toEqual(id)
  expect(convertIdentifierToNamespaceId("85BBEA6CC462B244").id).toEqual(id)
  expect(() => convertIdentifierToNamespaceId("__INVALID_STRING__")).toThrowError()
})

test("convertIdentifierToNamespaceHex", () => {
  const hex ="85BBEA6CC462B244"
  expect(convertIdentifierToNamespaceHex("cat.currency")).toEqual(hex)
  expect(convertIdentifierToNamespaceHex("[3294802500, 2243684972]")).toEqual(hex)
  expect(convertIdentifierToNamespaceHex("3294802500, 2243684972")).toEqual(hex)
  expect(convertIdentifierToNamespaceHex("85BBEA6CC462B244")).toEqual(hex)
  expect(convertIdentifierToNamespaceHex("__INVALID_STRING__")).toEqual("")
})

test("convertIdentifierToMosaicId", () => {
  const id = new MosaicId("0069AE078A2E51A9").id
  expect(convertIdentifierToMosaicId("0069AE078A2E51A9").id).toEqual(id)
  expect(convertIdentifierToMosaicId("[2318291369,6925831]").id).toEqual(id)
  expect(() => convertIdentifierToMosaicId("__INVALID_STRING__")).toThrowError()
})

test("convertIdentifierToMosaicHex", () => {
  const hex = new MosaicId("0069AE078A2E51A9").toHex()
  expect(convertIdentifierToMosaicHex("0069AE078A2E51A9")).toEqual(hex)
  expect(convertIdentifierToMosaicHex("[2318291369,6925831]")).toEqual(hex)
  expect(convertIdentifierToMosaicHex("__INVALID_STRING__")).toEqual("")
})

test("datetimeStringToNemTimestamp", () => {
  expect(datetimeStringToNemTimestamp("2016-04-01T00:00:00.000Z")).toEqual("0")
  expect(datetimeStringToNemTimestamp("2019-09-27T06:38:19.000Z")).toEqual("110097499")
})

test("nemTimestampToDatetimeString", () => {
  expect(nemTimestampToDatetimeString("0")).toEqual("2016-04-01T00:00:00.000Z")
  expect(nemTimestampToDatetimeString("110097499")).toEqual("2019-09-27T06:38:19.000Z")
})

test("createAddressFromIdentifier ", () => {
  expect(createAddressFromIdentifier(
    "17D8D0269775AEC007506E14FD37EB08DE215251900BAB71B8F94B2D5FB8E078",
    NetworkType.TEST_NET
  )).toBeInstanceOf(Address)
  expect(createAddressFromIdentifier(
    "17d8d0269775aec007506e14fd37eb08de215251900bab71b8f94b2d5fb8e078",
    NetworkType.TEST_NET
  )).toBeInstanceOf(Address)
  expect(createAddressFromIdentifier(
    "TBNSUW-IT6WAZ-5K4VBU-E3P4XF-WI6F5Q-UJCFB5-5QXV"
  )).toBeInstanceOf(Address)
  expect(createAddressFromIdentifier(
    "tbnsuw-it6waz-5k4vbu-e3p4xf-wi6f5q-ujcfb5-5qxv"
  )).toBeInstanceOf(Address)
  expect(createAddressFromIdentifier(
    "TBNSUWIT6WAZ5K4VBUE3P4XFWI6F5QUJCFB55QXV"
  )).toBeInstanceOf(Address)
  expect(createAddressFromIdentifier(
    "INVALIDPUBLICKEYSTRING000000000000000000000000000000000000000000",
    NetworkType.TEST_NET
  )).toEqual(null)
  expect(createAddressFromIdentifier(
    "ZBNSUWIT6WAZ5K4VBUE3P4XFWI6F5QUJCFB55QXV"
  )).toEqual(null)
})
