import { create } from "zustand";
import { subscribeWithSelector, persist } from "zustand/middleware";

export default create(
  subscribeWithSelector(
    persist(
      (set) => ({
        blocksCount: 5,

        level: 1,

        bestScore:
          JSON.parse(localStorage.getItem("gameStorage"))?.state.bestScore || 1,

        phase: "ready",
        start: () =>
          set((state) => {
            if (state.phase === "ready")
              return { phase: "playing", startTime: Date.now() };
            return {};
          }),
        restart: () =>
          set((state) => {
            if (state.phase === "playing") return { phase: "ready" };
            else if (state.phase === "ended") {
              return {
                phase: "ready",
                blocksCount: (state.blocksCount += 2),
                level: (state.level += 1),
                bestScore:
                  state.level > state.bestScore ? state.level : state.bestScore,
              };
            }
            return {};
          }),
        end: () =>
          set((state) => {
            if (state.phase === "playing")
              return {
                phase: "ended",
                endTime: Date.now(),
              };
            return {};
          }),

        forwardTouch: false,
        forwardTouchStart: () => set(() => ({ forwardTouch: true })),
        forwardTouchEnd: () => set(() => ({ forwardTouch: false })),

        backwardTouch: false,
        backwardTouchStart: () => set(() => ({ backwardTouch: true })),
        backwardTouchEnd: () => set(() => ({ backwardTouch: false })),

        leftwardTouch: false,
        leftwardTouchStart: () => set(() => ({ leftwardTouch: true })),
        leftwardTouchEnd: () => set(() => ({ leftwardTouch: false })),

        rightwardTouch: false,
        rightwardTouchStart: () => set(() => ({ rightwardTouch: true })),
        rightwardTouchEnd: () => set(() => ({ rightwardTouch: false })),

        jumpTouch: false,
        jumpTouchStart: () => set(() => ({ jumpTouch: true })),
        jumpTouchEnd: () => set(() => ({ jumpTouch: false })),

        animationName: "idle",
        setAnimationName: (animationName) => set(() => ({ animationName })),

        character: false,
        setCharacter: () => set((state) => ({ character: !state.character })),

        sound: false,
        setSound: () => set((state) => ({ sound: !state.sound })),
      }),
      {
        name: "gameStorage",
        partialize: (state) => ({
          bestScore: state.bestScore,
        }),
      },
    ),
  ),
);
