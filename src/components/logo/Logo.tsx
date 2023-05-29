import { Box, Typography } from "@mui/material";

// function CustomComponent(props: TypographyProps<'a', { component: 'a' }>) {
//   /* ... */
// }
// // ...
// <CustomComponent component="a" />;

interface LogoProps {
	direction?: string;
	logoSize?: string;
	fontSize?: string;
	// props: BoxProps<"a", { component: "a" }>;
}
export const Logo = ({
	direction = "column",
	logoSize = "96px",
	fontSize = "96px",
}: LogoProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: direction,
				alignItems: "center",
				gap: "1rem",
			}}
		>
			<a href="/">
				<img
					src="/assets/images/logo/blatt-icon.png"
					alt="logo"
					width={logoSize}
					height="100%"
				/>
			</a>
			<Typography
				variant="h1"
				sx={{
					color: "text.primary",
					fontFamily: "roboto slab",
					fontSize: fontSize,
					fontWeight: "700",
				}}
			>
				blatt
			</Typography>
		</Box>
	);
};
