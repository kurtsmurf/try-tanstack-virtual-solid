import { createVirtualizer } from "@tanstack/solid-virtual"
import { For } from "solid-js"
import { VirtualList } from "./VirtualList";


const TanDemo = () => {
  let parentRef;

  const rowVirtualizer = createVirtualizer({
    count: 1000,
    getScrollElement: () => parentRef,
    estimateSize: () => 100,
    horizontal: true,
  });

  return (
    <>
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
  {/* <AltDemo
   /> */}
</>

export default App;
