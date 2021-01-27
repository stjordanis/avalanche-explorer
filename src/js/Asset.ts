import api from '@/axios'
import { IAssetDataOrtelius } from './IAsset'
import { profanities } from '@/js/Profanities'
import Big from 'big.js'
import { stringToBig } from '@/helper'
import store from '../store'

class Asset {
    id: string
    alias: string
    chainID: string
    currentSupply: Big
    denomination: number
    name: string
    symbol: string
    // aggregate data
    volume_day: Big
    txCount_day: number
    isHistoryUpdated: boolean
    // FE metadata
    profane: boolean
    // not in indexer
    isUnknown: boolean

    constructor(assetData: IAssetDataOrtelius, isUnknown: boolean) {
        this.id = assetData.id
        this.alias = assetData.alias
        this.chainID = assetData.chainID
        // TODO: supply is genesis TX only
        this.currentSupply = Big(assetData.currentSupply).div(
            Math.pow(10, assetData.denomination)
        )
        this.denomination = assetData.denomination
        this.name = assetData.name
        this.symbol = assetData.symbol
        this.volume_day = Big(0)
        this.txCount_day = 0
        // aggregate data
        this.isHistoryUpdated = false
        // not in indexer
        this.isUnknown = isUnknown
        // FE metadata
        this.profane = false
        this.checkForProfanities(this.name)
        this.checkForProfanities(this.symbol)
    }

    // Daily Volume
    public updateVolumeHistory(): void {
        if (this.isUnknown === false) {
            const endDate = new Date()
            const startTime = Date.now() - 1000 * 60 * 60 * 24
            const startDate = new Date(startTime)

            // TODO: support service for multiple chains
            // TODO: declare interface
            api.get(
                `/x/transactions/aggregates?startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}&assetID=${
                    this.id
                }`
            ).then((res) => {
                const txCount = res.data.aggregates.transactionCount || 0
                const txVolume = res.data.aggregates.transactionVolume || '0'
                this.volume_day = stringToBig(txVolume, this.denomination)
                this.txCount_day = txCount
                this.isHistoryUpdated = true
                // TODO: remove when API implements precomputed aggregates
                store.commit('updateAssetInSubsetForAggregation', this.id)
                store.dispatch('checkAssetsSubsetAggregatesLoaded')
                // DISABLE
                // store.dispatch("checkAssetAggregatesLoaded");
            })
        }
    }

    private checkForProfanities(value: string): void {
        if (this.profane) {
            return
        }
        this.profane = profanities.screen(value)
    }
}

export { Asset }
