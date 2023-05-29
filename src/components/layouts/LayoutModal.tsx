import { Box, Grow, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ModalProps } from "../../interfaces/generic";

export const LayoutModal = ({ show, cb, children }: ModalProps) => {
	return (
		<Grow in={show}>
			<Box
				sx={{
					position: "fixed",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					top: 0,
					left: 0,
					width: "100%",
					height: "100vh",
					margin: "0 auto",
					backgroundColor: "rgba(0, 0,0,.7)",
					zIndex: 9,
				}}
			>
				<Box
					sx={{
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						width: "90%",
						maxWidth: "400px",
						backgroundImage: "radial-gradient(#FFFFFF 0%,#C4C4C4 100%)",
						padding: "1rem",
						color: "text.primary",
						borderRadius: ".75rem",
						gap: "1rem",
					}}
				>
					<Button
						sx={{
							position: "absolute",
							width: "auto",
							height: "auto",
							minWidth: "auto",
							minHeight: "auto",
							padding: "1rem",
							top: 0,
							right: 0,
							border: "none",
							backgroundColor: "inherit",
							color: "text.primary",
						}}
						onClick={() => cb(false)}
					>
						<CloseIcon />
					</Button>
					{children}
				</Box>
			</Box>
		</Grow>
	);
};
