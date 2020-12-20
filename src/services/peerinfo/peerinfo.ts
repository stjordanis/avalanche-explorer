import { IVersion } from './models'
import { toAVAX } from '@/helper'

function removePrefix(s: string): string {
    return s.includes('avalanche/') ? s.split('avalanche/')[1] : s
}

export function mapPeerInfo(info: string): IVersion[] {
    let peerInfo: IVersion[] = info
        .split('peerinfo')
        .filter((x) => !!x)
        .map((y) => {
            return y
                .slice(1, -1)
                .split(',')
                .reduce((acc, curr) => {
                    return {
                        ...acc,
                        [curr.split('=')[0]]: curr.split('=')[1],
                    }
                }, {})
        })
        .map((z: any) => {
            return {
                version: removePrefix(z.version.slice(1, -1)),
                nodeCount: parseInt(z.nodeCount),
                stakeAmount: toAVAX(z.stakeAmount),
            }
        })

    const offline = peerInfo.find((i) => i.version === 'offline') as IVersion

    peerInfo = peerInfo
        .filter((i) => i.version !== 'offline')
        .sort((a, b) =>
            a.version.localeCompare(b.version, undefined, { numeric: true })
        )
        .reverse()
    peerInfo.push(offline)

    return peerInfo
}
