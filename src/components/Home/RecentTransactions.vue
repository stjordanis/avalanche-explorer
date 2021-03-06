<template>
    <div class="recent_tx">
        <div class="header">
            <div class="left">
                <h2>Latest Transactions</h2>
                <p class="chain">
                    <span class="label">You are viewing transactions for</span>
                    <v-tooltip>
                        <template v-slot:activator="{ on }">
                            <span class="tag" v-on="on">X-Chain</span>
                        </template>
                        <span
                            >The X-Chain acts as a decentralized platform for
                            creating and trading smart digital assets. (Think X
                            for eXchanging assets.)</span
                        >
                    </v-tooltip>
                </p>
            </div>
            <div v-if="$vuetify.breakpoint.smAndUp" class="right" bottom>
                <v-btn
                    :loading="loading"
                    :text="true"
                    class="refresh ava_btn"
                    @click="updateTx"
                >
                    <fa icon="sync"></fa>
                    <span class="ava-btn-label">Refresh</span>
                </v-btn>
                <router-link to="/tx" class="view_all"
                    >View All Transactions</router-link
                >
            </div>
        </div>
        <div class="list">
            <TxHeader></TxHeader>
            <transition-group v-if="transactions.length > 0" name="fade">
                <tx-row
                    v-for="tx in transactions"
                    :key="tx.id"
                    class="recent_tx_rows"
                    :transaction="tx"
                ></tx-row>
            </transition-group>
            <div v-if="transactions.length === 0">
                <v-progress-circular
                    key="1"
                    :size="16"
                    :width="2"
                    color="#E84970"
                    indeterminate
                ></v-progress-circular>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Tooltip from '@/components/rows/Tooltip.vue'
import TxHeader from '@/components/rows/TxRow/TxHeader.vue'
import TxRow from '@/components/rows/TxRow/TxRow.vue'
import { ITransaction } from '@/js/ITransaction'

@Component({
    components: {
        Tooltip,
        TxHeader,
        TxRow,
    },
})
export default class RecentTransactions extends Vue {
    loading = false
    txNum = 25
    poller = 0

    created() {
        this.poller = window.setInterval(() => this.pollForTxUpdates(), 5000)
        /**
         * In case you need to kill the interval while developing, to apply styles live or whatever
         * window.dispatchEvent(new CustomEvent('TRANSACTION_POLLING:KILL'))
         */
        window.addEventListener(
            'TRANSACTION_POLLING:KILL',
            this.killPollingInterval.bind(this)
        )
    }

    private killPollingInterval() {
        window.clearInterval(this.poller)
    }

    destroyed() {
        this.killPollingInterval()
        window.removeEventListener(
            'TRANSACTION_POLLING:KILL',
            this.killPollingInterval.bind(this)
        )
    }

    get assetsLoaded(): boolean {
        return this.$store.state.assetsLoaded
    }

    get transactions(): ITransaction[] {
        return this.$store.state.recentTransactions
    }

    async updateTx(): Promise<void> {
        this.loading = true
        if (this.assetsLoaded) {
            // TODO: support service for multiple chains
            await this.$store.dispatch('getRecentTransactions', this.txNum)
            this.loading = false
        }
    }

    pollForTxUpdates(): void {
        this.$store.dispatch('getRecentTransactions', this.txNum)
    }
}
</script>

<style scoped lang="scss">
.refresh {
    margin-left: 16px;
}

.ava-btn-label {
    padding-left: 8px;
}

.col_1 {
    padding: 0px 30px;
}

.header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        padding-bottom: 2px;
    }

    .refresh {
        color: $primary-color;
        text-transform: none;
        border: none;
    }

    .left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex-grow: 1;
    }

    .right {
        flex-grow: 1;
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-end;
    }
}

.recent_tx_rows {
    width: 100%;
    font-size: 12px;
    border-radius: 2px;
    margin-bottom: 2px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

@include smOnly {
    .table_headers {
        display: none;
    }

    .header {
        padding-bottom: 0;

        .right {
            display: none;
        }
    }

    .list {
        padding: 0;
    }
}

@include xsOnly {
    .header {
        display: flex;
        flex-direction: column;

        .left {
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .right {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: center;
        }
    }
}
</style>
