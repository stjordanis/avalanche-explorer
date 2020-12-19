<template>
    <div class="peer_info">
        <div class="header">
            <h3 class="meta_title">AVAX Stake Distribution</h3>
            <p class="subtitle">by AvalancheGo Version</p>
        </div>
        <div class="canv_cont">
            <canvas ref="canv"></canvas>
        </div>
    </div>
</template>
<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Chart, { ChartDataSets } from 'chart.js'
import chroma from 'chroma-js'
import { IVersion } from './Metadata.vue'
import Big from 'big.js'
import { toAVAX } from '@/helper'

@Component({
    components: {},
})
export default class PeerStake extends Vue {
    @Prop() data!: IVersion[]
    @Prop() metric!: keyof IVersion

    context: null | RenderingContext = null
    chart: null | Chart = null

    @Watch('data')
    onDataChanged() {
        this.draw()
    }

    async mounted() {
        const canvas = this.$refs.canv as HTMLCanvasElement
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D
        this.chart = new Chart(this.context, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [],
            },
        })
    }

    draw() {
        const parent = this
        // bind data to chart
        if (this.chart && this.data) {
            this.chart.data.labels = this.data.map((v) => v.version)
            this.chart.data.datasets = [
                {
                    backgroundColor: chroma
                        .scale(['#4c2e56', '#ffe6e6'])
                        .colors(this.data.length),
                    data: this.data.map((v) => v[this.metric]) as number[],
                },
            ]
            this.chart.options = {
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItem, data) {
                            const label = (data['labels'] as string[])[
                                tooltipItem[0]['index'] as number
                            ]
                            return `AvalancheGo ${label}`
                        },
                        label: function (tooltipItem, data) {
                            const dataset = (data[
                                'datasets'
                            ] as Chart.ChartDataSets[])[0] as ChartDataSets

                            const datum = (dataset['data'] as number[])[
                                tooltipItem['index'] as number
                            ]

                            if (parent.totalStake === 0) {
                                return '-%'
                            }
                            const percent = Math.round(
                                (datum / parent.totalStake) * 100
                            )
                            return percent + '%'
                        },
                        afterLabel: function (tooltipItem, data) {
                            const datasets = (data[
                                'datasets'
                            ] as Chart.ChartDataSets[])[0] as ChartDataSets

                            return `(${((datasets['data'] as number[])[
                                tooltipItem['index'] as number
                            ] as number).toLocaleString()} AVAX)`
                        },
                    },
                },
            }
            this.chart.update()
        }
    }

    get totalStake(): number {
        const totalNAVAXStaked = this.$store.getters[
            'Platform/totalStake'
        ] as Big
        const totalAVAXStaked = toAVAX(parseFloat(totalNAVAXStaked.toString()))
        return totalAVAXStaked
    }
}
</script>
<style lang="scss" scoped>
.header {
    padding-bottom: 30px;
}

h3 {
    margin: 0;
    font-weight: 400;
}

.subtitle {
    margin-top: 0.2em;
    font-size: 0.875rem;
}

.peer_info {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}

.canv_cont {
    flex-grow: 1;
    width: 100%;
    max-width: 100%;
    position: relative;
}
</style>
