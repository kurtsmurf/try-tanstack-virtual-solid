import { createVirtualizer } from "@tanstack/solid-virtual"
import { createSignal, For } from "solid-js"


const App = () => {
  let parentRef;
  const [count, setCount] = createSignal(10);
  const rowVirtualizer = createVirtualizer(() => ({
    count: count(),
    getScrollElement: () => parentRef,
    estimateSize: () => 100,
    horizontal: true,
  }));

  return (
    <>
      <button onClick={() => setCount(prev => prev + 10)}>more</button>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: "100px",
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            width: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
            height: "100%"
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          <For each={rowVirtualizer.getVirtualItems()}>
            {(virtualItem) => (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${virtualItem.size}px`,
                  height: "100%",
                  transform: `translateX(${virtualItem.start}px)`,
                  background: `hsl(${virtualItem.index * 10}deg 50% 50%)`,
                }}
              >
                {virtualItem.index}
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  )
};

export default App;
