import { createVirtualizer } from "@tanstack/solid-virtual"
import { For } from "solid-js"
import { VirtualList } from "./VirtualList";

const TanDemo = () => {
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
          height: `100vh`,
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
// 
const AltDemo
 = () => {
  return (
    <VirtualList
      data={[...new Array(1000)].map((_, index) => index)}
      overscanCount={1}
      renderRow={(index) => <p style={`height: 35px; background: hsl(${index * 10}deg 50% 50%);  margin: 0;`}>{index}</p>}
      rootHeight={400}
      rowHeight={35}
      class=""
    ></VirtualList>
  )
}

const App = () => <>
  <TanDemo/>
  <AltDemo
   />
</>

export default App;
