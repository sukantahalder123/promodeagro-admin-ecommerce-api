import z from "zod";
import { Table } from "sst/node/table";
import { update } from "../../common/data";
import middy from "@middy/core";
import { bodyValidator } from "../util/bodyValidator";
import { errorHandler } from "../util/errorHandler";

const updateActiveSchema = z.object({
	id: z.string(),
	active: z.boolean(),
});

export const handler = middy(async (event) => {
	const { id, active } = JSON.parse(event.body);
	await update(
		Table.inventoryTable.tableName,
		{ id: id },
		{ active: active }
	);
	// await update("ProductsTableName", { id: id }, { active: active });
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "item updated successfully",
		}),
	};
})
	.use(bodyValidator(updateActiveSchema))
	.use(errorHandler());
