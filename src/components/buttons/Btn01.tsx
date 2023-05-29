import { Button } from "@mui/material";
import { BtnProps } from "../../interfaces/generic";

export const Btn01 = ({ isDisable, text, cb }: BtnProps) => {
	return (
		<Button
			onClick={() => {
				// @ts-ignore
				return cb();
			}}
			variant="contained"
			color="secondary"
			size="medium"
			disabled={isDisable}
			sx={{
				marginTop: "2rem",
			}}
		>
			{text}
		</Button>
	);
};
