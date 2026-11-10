import DrawingCursor from "@/components/ui/drawing-cursor";

// The site's brand yellow (--yellow in global.css). A canvas cannot read CSS variables,
// so the value is repeated here.
const YELLOW = "#f4c430";

/** The pointer trail for the whole site: one screen-sized layer above every section. */
function SiteCursor() {
  return <DrawingCursor fullPage color={YELLOW} />;
}

export { SiteCursor };
