<script setup></script>

<template>
  <div class="master-intro-box">
    <svg class="box" width="1766" height="755" viewBox="0 0 1766 755">
      <g fill="none">
        <path
          d="M3 53C3 25.3857 25.3858 3 53 3H1713C1740.61 3 1763 25.3858 1763 53V702C1763 729.614 1740.61 752 1713 752H53C25.3857 752 3 729.614 3 702V53Z"
        />
        <path
          d="M880.5 748.5V6.5M53 752H1713C1740.61 752 1763 729.614 1763 702V53C1763 25.3858 1740.61 3 1713 3H53C25.3858 3 3 25.3857 3 53V702C3 729.614 25.3857 752 53 752Z"
          stroke="url(#paint0_linear_644_178)"
          stroke-width="5"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_644_178"
          x1="783.89"
          y1="3.00003"
          x2="982.11"
          y2="752"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CD2E3A" />
          <stop offset="1" stop-color="#0047A0" />
        </linearGradient>
      </defs>
    </svg>
    <slot></slot>
  </div>
</template>

<style scoped>
.master-intro-box {
  border-radius: 47.5px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
}

.box {
  position: absolute;
}
</style>
