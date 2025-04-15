import * as z from "@zod/mini";

const userSchema = {
  name: z.string(),
  age: z.optional(z.string()),
};

console.log(userSchema);
