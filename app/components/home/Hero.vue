<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <AppHeroFrame page="home">
    <v-container class="home-hero">
      <v-row align="center">
        <v-col cols="12" md="7">
          <h1 class="type-display home-hero__title">
            {{ site.tagline }}
          </h1>
          <p class="type-lead text-muted-ink mt-6">
            {{ site.valueProposition }}
          </p>
          <div class="d-flex flex-wrap align-center ga-4 mt-8">
            <v-btn to="/book" color="secondary" size="x-large">
              Book a consultation
            </v-btn>
            <v-btn to="/services" variant="outlined" size="x-large">
              Explore our services
            </v-btn>
          </div>
          <a :href="site.brochure.url" target="_blank" rel="noopener" class="home-hero__brochure mt-6">
            <v-icon icon="mdi-book-open-page-variant-outline" size="20" />
            View our company overview
            <span class="d-sr-only">(PDF, opens in a new tab)</span>
          </a>
        </v-col>

        <v-col cols="12" md="5">
          <div class="signpost" aria-hidden="true">
            <!-- Hand-lettered note scribbled beside the sign. Decorative only. -->
            <svg class="signpost__doodle" viewBox="0 0 320 220" focusable="false">
              <defs>
                <path id="doodle-curve" d="M 14 112 C 60 40, 150 22, 236 58" />
                <!-- Roughens the edges so the strokes look drawn with a marker. -->
                <filter id="doodle-rough" x="-5%" y="-5%" width="110%" height="110%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
              </defs>
              <g filter="url(#doodle-rough)">
                <text class="signpost__doodle-text">
                  <textPath href="#doodle-curve">creative</textPath>
                </text>
                <!-- A loose underline flourish, then an arrow looping down to the sign. -->
                <path class="signpost__doodle-line" pathLength="1" d="M 52 104 C 100 74, 170 62, 224 80" />
                <path class="signpost__doodle-line signpost__doodle-line--arrow" pathLength="1" d="M 246 70 C 292 82, 304 128, 276 150 C 258 164, 238 150, 252 136 C 266 124, 288 150, 270 196" />
                <path class="signpost__doodle-line signpost__doodle-line--head" pathLength="1" d="M 254 180 L 270 198 L 284 176" />
              </g>
            </svg>
            <div class="signpost__pole" />
            <div class="signpost__blade">
              25th Ave
            </div>
            <div class="signpost__blade signpost__blade--amber">
              Your business
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AppHeroFrame>
</template>

<style scoped>
.home-hero {
  padding-block: clamp(32px, 7vw, 88px) clamp(56px, 9vw, 112px);
}

.home-hero__title {
  max-width: 11ch;
}

.home-hero__brochure {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgb(var(--v-theme-secondary));
  font-weight: 700;
  text-underline-offset: 4px;
}

/* The street sign is the brand's one decorative moment. */
.signpost {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-block: 28px 96px;
}

.signpost__pole {
  position: absolute;
  inset-block: 0;
  left: 50%;
  width: 16px;
  transform: translateX(-50%);
  background: #8f8f8f;
}

.signpost__blade {
  position: relative;
  width: calc(100% - 12px);
  max-width: 420px;
  padding: 14px 12px 8px;
  border: 4px solid rgb(var(--v-theme-on-primary));
  border-radius: 0px;
  outline: 6px solid rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-size: clamp(3rem, 7vw, 4.75rem);
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
}

.signpost__blade--amber {
  width: 82%;
  margin-top: 8px;
  border-color: rgb(var(--v-theme-on-secondary));
  outline-color: rgb(var(--v-theme-secondary));
  background: rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-on-secondary));
  font-size: clamp(1.75rem, 3.6vw, 2.5rem);
}

/* Sits above and to the left of the sign, outside the layout, tilted like a quick note. */
.signpost__doodle {
  position: absolute;
  z-index: 1;
  top: clamp(-150px, -11vw, -96px);
  left: clamp(-120px, -6vw, -40px);
  width: clamp(200px, 22vw, 290px);
  overflow: visible;
  transform: rotate(-8deg);
  pointer-events: none;
}

.signpost__doodle-text {
  fill: rgb(var(--v-theme-secondary));
  font-family: 'Caveat Brush', 'Comic Sans MS', cursive;
  font-size: 66px;
  letter-spacing: 1px;
}

.signpost__doodle-line {
  fill: none;
  stroke: rgb(var(--v-theme-secondary));
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.signpost__doodle-line:first-of-type {
  stroke-width: 3;
  opacity: 0.85;
}

/* Draw the strokes in, one after another, as if by hand. */
@media (prefers-reduced-motion: no-preference) {
  .signpost__doodle-text {
    animation: doodle-fade 0.6s ease-out 0.3s both;
  }

  .signpost__doodle-line {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: doodle-draw 0.5s ease-in-out 0.8s forwards;
  }

  .signpost__doodle-line--arrow {
    animation-duration: 0.8s;
    animation-delay: 1.2s;
  }

  .signpost__doodle-line--head {
    animation-duration: 0.25s;
    animation-delay: 2s;
  }
}

@keyframes doodle-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes doodle-fade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

/* Stacked under the text on small screens: keep the note inside the screen edge. */
@media (max-width: 959px) {
  .signpost {
    margin-top: 72px;
  }

  .signpost__doodle {
    top: -84px;
    left: -4px;
    width: 200px;
  }
}
</style>
