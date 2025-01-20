import { computed } from "vue";
import { defineStore } from "pinia";
import { intObjectToArray, numToTeamCol } from "@/assets/utils";
import { useOverlayDataStore } from "./socket";

export const useOrderStore = defineStore("order", () => {
  const state = useOverlayDataStore();

  const firstBan = computed(() => numToTeamCol(state.data?.progress?.first_ban));
  const firstPick = computed(() => numToTeamCol(state.data?.progress?.first_pick));

  const teams = computed(() => state.data?.teams);

  const order = computed(() => intObjectToArray(state.data?.progress?.order));

  const setScores = computed(() => state.data?.lobby?.set_scores);
  const bo = computed(() => state.data?.bo);

  const turn = computed(() => {
    if (finished.value) return "";

    const count = order.value.length;

    if (defending.value) {
      // Ban phase
      // if firstBan is 1(Blue), count 0 - Blue / 1 - Red  / 2 - Red  / 3 - Red
      // if firstBan is 2(Red),  count 1 - Red  / 2 - Blue / 3 - Blue / 4 - Red
      return (firstBan.value === "blue" ? count === 0 || count === 3 : count === 1 || count === 2)
        ? "blue"
        : "red";
    } else {
      // Pick phase
      // if firstPick is 1(Blue), count-4 even - Blue / odd - Red
      // if firstPick is 0(Red),  count-4 even - Red  / odd - Blue
      return (firstPick.value === "blue" ? (count - 4) % 2 === 0 : (count - 4) % 2 === 1)
        ? "blue"
        : "red";
    }
  });

  const defending = computed(() => order.value.length < 4);
  const playing = computed(() => {
    if (!order.value) return null;

    if (order.value.length === 4) return false;

    return !finished.value && !defending.value && order.value[order.value.length - 1]?.win === -1;
  });
  const finished = computed(() => {
    if (!setScores.value) return null;

    return setScores.value[0] === (bo.value + 1) / 2 || setScores.value[1] === (bo.value + 1) / 2;
  });

  const win = computed(() =>
    finished.value ? (setScores.value[0] > setScores.value[1] ? "red" : "blue") : null
  );

  const curmap = computed(() => state.data?.progress?.curmap);
  const unavailableMaps = computed(() => {
    const uMaps = { banned: [], red: [], blue: [], highlight: "" };

    for (let i = 0; i < order.value.length; i++) {
      const pick = order.value[i];
      if (pick.pick) {
        // picked map
        if (pick.win === -1) {
          // just have been picked
          uMaps.highlight = pick.code;
        } else {
          // there is winner
          uMaps[pick.win ? "blue" : "red"].push(pick.code);
        }
      } else {
        // banned map
        uMaps.banned.push(pick.code);
      }
    }
    return uMaps;
  });
  const tb = computed(
    () =>
      setScores.value?.[0] + setScores.value?.[1] >= bo.value ||
      (setScores.value?.[0] === (bo.value - 1) / 2 && setScores.value?.[1] === (bo.value - 1) / 2)
  );
  const lastPick = computed(() => order.value.at(-1));
  const mappool = computed(() => intObjectToArray(state.data?.mappool));
  const currentMap = computed(() => state.data?.now_playing?.osu);
  const lastPickedMap = computed(() => {
    for (let i = 0; i < mappool.value.length; i++) {
      if (mappool.value[i].code === lastPick.value?.code) {
        return mappool.value[i];
      }
    }
    return {};
  });

  return {
    firstBan,
    firstPick,
    teams,
    order,
    setScores,
    bo,
    turn,
    defending,
    playing,
    finished,
    win,
    curmap,
    unavailableMaps,
    tb,
    lastPick,
    mappool,
    currentMap,
    lastPickedMap,
  };
});
