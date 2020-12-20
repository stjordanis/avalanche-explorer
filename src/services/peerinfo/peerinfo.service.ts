import {
    orteliusURL,
    DEFAULT_NETWORK_ID,
} from '@/store/modules/network/network'
import { avalancheGoURL } from '@/avalanche_go_api'
import { resolveResponseText } from '@/services/helpers'

const apiNodeURL = avalancheGoURL.split('/ext/P')[0]
const PEERINFO_BASE_URL = process.env.VUE_APP_PEERINFO_BASE_URL

export function getPeerInfo() {
    // API endpoint is inconsistent
    return DEFAULT_NETWORK_ID === 1
        ? fetch(`${orteliusURL}${PEERINFO_BASE_URL}`).then(resolveResponseText) // Mainnet https://explorerapi.avax.network/validators
        : fetch(`${apiNodeURL}${PEERINFO_BASE_URL}`).then(resolveResponseText) // Fuji https://api.avax-test.network/validators
}
