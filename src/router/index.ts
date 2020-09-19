import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { IMetaTag } from "@/router/IMetaTag";

Vue.use(VueRouter);

const prefix = "Avalanche ";
const description = "Avalanche Explorer is an analytics tool that enables people to search the Avalanche blockchain for transactions, addresses, and other platform activities."
const metaTags: IMetaTag[] = [
  {
    name: "description",
    content: description
  },
  {
    property: "og:description",
    content: description
  }
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: false,
      title: "Avalanche Explorer: View All Activity on Avalanche",
      metaTags: metaTags
    }
  },
  {
    path: "/resources",
    name: "Resources",
    component: () => import(/* webpackChunkName: "resources" */ "../views/Resources.vue"),
    meta: {
      auth: false,
      title: prefix + "Resources",
      metaTags: metaTags
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // Scroll to top on route change
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
});

export default router
