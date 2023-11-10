import { expect, test } from 'vitest'

import {
  optimismAddress,
  optimismClient,
  optimismClientWithAccount,
  optimismClientWithoutChain,
} from '~test/src/opStack.js'

import { type TransactionRequestEIP1559, parseGwei } from '../../../index.js'
import { parseEther } from '../../../utils/unit/parseEther.js'
import { estimateTotalFee } from './estimateTotalFee.js'

const baseTransaction = {
  maxFeePerGas: parseGwei('100'),
  maxPriorityFeePerGas: parseGwei('1'),
  to: optimismAddress.bob,
  value: parseEther('0.1'),
} as const satisfies Omit<TransactionRequestEIP1559, 'from'>

test('default', async () => {
  const fee = await estimateTotalFee(optimismClientWithAccount, baseTransaction)
  expect(fee).toBeDefined()
})

test('minimal', async () => {
  const fee = await estimateTotalFee(optimismClientWithAccount, {})
  expect(fee).toBeDefined()
})

test('args: account', async () => {
  const fee = await estimateTotalFee(optimismClient, {
    ...baseTransaction,
    account: optimismAddress.alice,
  })
  expect(fee).toBeDefined()
})

test('args: data', async () => {
  const fee = await estimateTotalFee(optimismClientWithAccount, {
    ...baseTransaction,
    data: '0x00000000000000000000000000000000000000000000000004fefa17b7240000',
  })
  expect(fee).toBeDefined()
})

test('args: feePriceOracleAddress', async () => {
  const fee = await estimateTotalFee(optimismClientWithAccount, {
    ...baseTransaction,
    gasPriceOracleAddress: '0x420000000000000000000000000000000000000F',
  })
  expect(fee).toBeDefined()
})

test('args: nonce', async () => {
  const fee = await estimateTotalFee(optimismClientWithAccount, {
    ...baseTransaction,
    nonce: 69,
  })
  expect(fee).toBeDefined()
})

test('args: nullish chain', async () => {
  const fee = await estimateTotalFee(optimismClientWithoutChain, {
    ...baseTransaction,
    account: optimismAddress.alice,
    chain: null,
  })
  expect(fee).toBeDefined()
})
