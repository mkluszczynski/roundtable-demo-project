import { createCn } from "cn/config"

/** `cn` that also knows the custom `shadow-brutal*` utilities from globals.css. */
export const cn = createCn({
  extend: {
    classGroups: {
      shadow: [{ shadow: ["brutal", "brutal-sm", "brutal-lg"] }],
    },
  },
})
