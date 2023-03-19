import { createVirtualizer } from "@tanstack/solid-virtual"
import { For } from "solid-js"

const App = () => {
  let parentRef;

  const rowVirtualizer = createVirtualizer({
    count: 1000,
    getScrollElement: () => parentRef,
    estimateSize: () => 35,
  });

  return (
    <>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
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
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                Row {virtualItem.index}
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  )
};

export default App;
