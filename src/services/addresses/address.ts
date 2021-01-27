import { stringToBig } from '@/helper'
import { Asset } from '@/js/Asset'
import { IAssetDataOrtelius, IAssetDataAvalancheGo } from '@/js/IAsset'
import { AVAX_ID } from '@/store'
import { IBalanceX, IBalanceXDatum } from './models'
import Big from 'big.js'

// set asset metadata for convenience
export function setAssetMetadata(
    asset: Asset | IAssetDataOrtelius | IAssetDataAvalancheGo,
    balance: IBalanceX
) {
    balance.name = asset.name
    balance.denomination = asset.denomination
    balance.symbol = asset.symbol
}

// set balance data (relies on asset metadata)
export function setBalanceData(
    balanceDatum: IBalanceXDatum,
    denomination: number,
    balance: IBalanceX
) {
    balance.balance = stringToBig(balanceDatum.balance, denomination)
    balance.totalReceived = stringToBig(
        balanceDatum.totalReceived,
        denomination
    )
    balance.totalSent = stringToBig(balanceDatum.totalSent, denomination)
}

export function setUnlockedX(assets: IBalanceX[]): Big {
    const result = assets.find((asset) => asset.id === AVAX_ID)
    return result ? result.balance : Big(0)
}
