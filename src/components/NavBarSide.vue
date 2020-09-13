<template>
    <div class="navbar_side">
        <v-list dense nav>
            <v-list-item to="/">Home</v-list-item>
            <v-list-item to="/tx">Transactions</v-list-item>
            <v-list-item to="/subnets">Subnets</v-list-item>
            <v-list-item to="/validators">Validators</v-list-item>
            <v-list-item to="/assets">Assets</v-list-item>
            <!-- <v-list-item to="/addresses">Addresses</v-list-item> -->
            <v-list-item to="/blockchains">Blockchains</v-list-item>
            <v-list-item href="https://cchain.explorer.avax.network/">C-Chain</v-list-item>
            <v-list-item to="/resources">Resources</v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchBarMobile from "@/components/misc/SearchBar/SearchBarMobile.vue";

@Component({
    components: {
        SearchBarMobile
    }
})
export default class NavbarSide extends Vue {
    isDrawer: boolean = false;
    isSearch: boolean = false;

    onsearch(val: string) {
        this.$router.push({ path: "/search", query: { query: val } });
    }

    get showSearch() {
        return this.$router.currentRoute.name === "Home" ? false : true;
    }

    get navColor() {
        return "#fff";
    }

    closeSearch(val: boolean) {
        this.isSearch = val;
    }
}
</script>

<style scoped lang="scss">
@use "../main";

.navbar_side {
    margin-top: 100px;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    
    background-color: main.$secondary-color;
    
    min-width: 300px;
    height: 100%;

    > .v-toolbar__content {
        padding: 0;
    }

    .v-btn {
        border: none !important;
    }
}

/* ==========================================
   toolbar
   ========================================== */

.inner {
    display: flex;
    padding: 10px 9px 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

a {
    text-decoration: none;
    font-weight: 400; /* 700 */
    white-space: nowrap;
    margin-right: 15px;
}

/* ==========================================
   sidenav
   ========================================== */

.title {
    font-size: 20px;
    padding-left: 16px;
    padding-bottom: 7px;
}

.drawer_img_container {
    height: 54px;
    display: flex;
    align-items: center;
    
    .drawer_img {
        padding-bottom: 10px;
        height: 24px;
    }    
}


button {
    font-weight: 400; /* 700 */
}

/* ==========================================
   search
   ========================================== */

.search_container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 9px 8px;
    border-bottom: 2px solid main.$gray-input;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    .v-btn {
        border: none !important;
    }
    
    .search_bar {
        width: 100%;
    }
}
</style>
