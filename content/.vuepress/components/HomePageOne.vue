<template>
  <div class="home-blog">
    <div class="hero" :style="{ ...bgImageStyle }">
      <div>
        <ModuleTransition>
          <img
            class="hero-img"
            v-if="recoShowModule && $frontmatter.heroImage"
            :style="heroImageStyle || {}"
            :src="$withBase($frontmatter.heroImage)"
            alt="hero"
          />
        </ModuleTransition>

        <ModuleTransition delay="0.04">
          <h1 v-if="recoShowModule && $frontmatter.heroText !== null">
            {{ $frontmatter.heroText || $title || "vuePress-theme-reco" }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <p
            v-if="recoShowModule && $frontmatter.tagline !== null"
            class="description"
          >
            {{
              $frontmatter.tagline ||
              $description ||
              "Welcome to your vuePress-theme-reco site"
            }}
          </p>
        </ModuleTransition>

        <Font>
          
        </Font>
        <p class="descText description"> 打字机占位</p>

        <a class="anchor-down" id="JanchorDown" @click="scrollFn"> </a>
      </div>
    </div>

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract
            :data="$recoHomePosts"
            @paginationChange="paginationChange"
          />
        </div>
        <div class="info-wrapper">
          <PersonalInfo />
          <h4>
            <reco-icon icon="reco-category" /> {{ $recoLocales.category }}
          </h4>
          <ul class="category-wrapper">
            <li
              class="category-item"
              v-for="(item, index) in this.$categories.list"
              :key="index"
            >
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span
                  class="post-num"
                  :style="{ backgroundColor: getOneColor() }"
                  >{{ item.pages.length }}</span
                >
              </router-link>
            </li>
          </ul>
          <hr />
          <h4 v-if="$tags.list.length !== 0">
            <reco-icon icon="reco-tag" /> {{ $recoLocales.tag }}
          </h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4
            v-if="
              $themeConfig.friendLink && $themeConfig.friendLink.length !== 0
            "
          >
            <reco-icon icon="reco-friend" /> {{ $recoLocales.friendLink }}
          </h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom />
    </ModuleTransition>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  getCurrentInstance,
  onMounted,
} from "vue-demi";
import TagList from "@theme/components/TagList";
import FriendLink from "@theme/components/FriendLink";
import NoteAbstract from "@theme/components/NoteAbstract";
import { ModuleTransition, RecoIcon } from "@vuepress-reco/core/lib/components";
import PersonalInfo from "@theme/components/PersonalInfo";
import { getOneColor } from "@theme/helpers/other";
import Font from "./Font.vue";

export default defineComponent({
  components: {
    NoteAbstract,
    TagList,
    FriendLink,
    ModuleTransition,
    PersonalInfo,
    RecoIcon,
    Font,
  },
  setup(props, ctx) {
    const instance = getCurrentInstance().proxy;

    const state = reactive({
      recoShow: false,
      heroHeight: 0,
    });

    const recoShowModule = computed(
      () => instance && instance.$parent.recoShowModule
    );

    const heroImageStyle = computed(
      () => instance.$frontmatter.heroImageStyle || {}
    );

    const bgImageStyle = computed(() => {
      const url = instance.$frontmatter.bgImage
        ? instance.$withBase(instance.$frontmatter.bgImage)
        : require("../theme/images/bg.svg");

      const initBgImageStyle = {
        textAlign: "center",
        overflow: "hidden",
        background: `url(${url}) center/cover no-repeat`,
      };

      const { bgImageStyle } = instance.$frontmatter;

      return bgImageStyle
        ? { ...initBgImageStyle, ...bgImageStyle }
        : initBgImageStyle;
    });

    onMounted(() => {
      state.heroHeight = document.querySelector(".hero").clientHeight;
      state.recoShow = true;
    });

    return {
      recoShowModule,
      heroImageStyle,
      bgImageStyle,
      ...toRefs(state),
      getOneColor,
    };
  },
  methods: {
    paginationChange(page) {
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight);
      }, 100);
    },
    getPagesByTags(tagInfo) {
      this.$router.push({ path: tagInfo.path });
    },
    scrollFn() {
      const windowH = document.getElementsByClassName("hero")[0].clientHeight; // 获取窗口高度
      document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
    },
  }
});
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;

  .hero {
    margin: $navbarHeight auto 0;
    position: relative;
    box-sizing: border-box;
    padding: 0 20px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .hero-img {
      max-width: 300px;
      margin: 0 auto 1.5rem;
    }

    h1 {
      display: block;
      margin: 0 auto 1.8rem;
      font-size: 3.5rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .home-blog-wrapper {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: $homePageWidth;

    .blog-list {
      flex: auto;
      width: 0;

      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }

    .info-wrapper {
      position: -webkit-sticky;
      position: sticky;
      top: 70px;
      overflow: hidden;
      transition: all 0.3s;
      margin-left: 15px;
      flex: 0 0 300px;
      height: auto;
      box-shadow: var(--box-shadow);
      border-radius: $borderRadius;
      box-sizing: border-box;
      padding: 0 15px;
      background: var(--background-color);

      &:hover {
        box-shadow: var(--box-shadow-hover);
      }

      h4 {
        color: var(--text-color);
      }

      .category-wrapper {
        list-style: none;
        padding-left: 0;

        .category-item {
          margin-bottom: 0.4rem;
          padding: 0.4rem 0.8rem;
          transition: all 0.5s;
          border-radius: $borderRadius;
          box-shadow: var(--box-shadow);
          background-color: var(--background-color);

          &:hover {
            transform: scale(1.04);

            a {
              color: $accentColor;
            }
          }

          a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-color);

            .post-num {
              width: 1.6rem;
              height: 1.6rem;
              text-align: center;
              line-height: 1.6rem;
              border-radius: $borderRadius;
              background: #eee;
              font-size: 13px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height: 450px;

      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem;
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;

        .personal-info-wrapper {
          display: none;
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      height: 450px;

      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;

        .personal-info-wrapper {
          display: none;
        }
      }
    }
  }
}

// 首页指引箭头
.anchor-down {
  display: block;
  margin: 12rem auto 0;
  bottom: 45px;
  width: 20px;
  height: 20px;
  font-size: 34px;
  text-align: center;
  animation: bounce-in 5s 3s infinite;
  position: absolute;
  left: 50%;
  bottom: 30%;
  margin-left: -10px;
  cursor: pointer;
}

@keyframes bounce-in {
  0% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }

  80% {
    transform: translateY(0);
  }

  to {
    transform: translateY(0);
  }
}

.anchor-down::before {
  content: '';
  width: 20px;
  height: 20px;
  display: block;
  // border-right: 3px solid var(--text-color);
  // border-top: 3px solid var(--text-color);
  border-right: 3px solid rgba(255, 255, 255, 0.8);
  border-top: 3px solid rgba(255, 255, 255, 0.8);
  transform: rotate(135deg);
  position: absolute;
  bottom: 10px;
}

.anchor-down::after {
  content: '';
  width: 20px;
  height: 20px;
  display: block;
  // border-right: 3px solid var(--text-color);
  // border-top: 3px solid var(--text-color);
  border-right: 3px solid rgba(255, 255, 255, 0.8);
  border-top: 3px solid rgba(255, 255, 255, 0.8);
  transform: rotate(135deg);
}
</style>
