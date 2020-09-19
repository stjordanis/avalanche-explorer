<template>
    <div class="home">
        <div class="everest">
            <img src="@/assets/og-image-avalanche.png" alt="Avalanche Logo">
            <h3>Avalanche is Coming</h3>
            <p class="description">Please come back on Monday, September 21st for the launch of the Avalanche Mainnet.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";


@Component({
    components: {
    }
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
@use "../main";

.home {
    margin: 0px auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.everest {
    border: 0;
    width: 70%;
    text-align: center;
    
    img {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        display: block;
        padding-top: 22px;
    }

    h3 {
        margin-top: 1.4em;
        margin-bottom: 1em;
        font-size: 64px;
        line-height: 1.16em;
        color: main.$blue;
        font-weight: 300;
    }

    .description {
        font-size: 20px;
        line-height: 1.2em;
        max-width: 900px;
        margin-bottom: .5em;
        margin-left: auto;
        margin-right: auto;
        color: main.$primary-color;
        font-weight: 400;
    }
}

@include main.device_xs {
    .everest {
        h3 {
            font-size: 36px;
        }
    }
}
</style>
