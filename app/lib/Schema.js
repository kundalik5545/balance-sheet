import { z } from "zod";

export const addBankSchema = z.object({
  bankName: z.string().nonempty("Bank name required."),
});
