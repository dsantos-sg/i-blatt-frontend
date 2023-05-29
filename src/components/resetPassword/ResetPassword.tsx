import { useState, useRef, useEffect } from "react";
import { LayoutModal, Btn01 } from "../";

import { useTranslation } from "react-i18next";

import {
	ModalProps,
	ErrorSucessMessageProps,
	RegisterProps,
} from "../../interfaces/generic";

import { Box, TextField, Typography } from "@mui/material";
import { Error, HighlightOff } from "@mui/icons-material";

import { inputsValidation } from "../../utils";

export const ResetPassword = ({ show, cb }: ModalProps) => {
	const { t } = useTranslation();
	const emailRef = useRef<HTMLDivElement | null>(null);

	const errorSucessMessageDefault = {
		sucess: {
			status: false,
			msg: t("emailFound"),
		},
		error: {
			status: false,
			msg: t("emailNotFound"),
		},
		invalid: {
			status: false,
			msg: t("emailError01"),
		},
	};

	const [email, setEmail] = useState({ email: "" });
	const [isError, setIsError] = useState<ErrorSucessMessageProps>(
		errorSucessMessageDefault
	);
	const [isDisable, setIsDisable] = useState<boolean>(false);

	useEffect(() => {
		// // must code email validation!!!!!!!!!!!!!!!!!!!
		// // VALIDANTION LOGIC
		// const isEmailValid = false;
		// if (!isEmailValid) {
		// 	// setIsError({ ...isError, invalid: { ...isError.invalid, status: true } });
		// }

		setIsDisable(email.email.length === 0 ? true : false);
	}, [email]);

	const handleSubmit = () => {
		const emailValidFormat = inputsValidation(email as RegisterProps).email;
		// BACKEND CONNECTION
		const backendConnection = false;

		//if email is not valid, return error message
		if (!emailValidFormat) {
			setIsError({ ...isError, invalid: { ...isError.invalid, status: true } });
			return;
		}

		//if email is not found in db, return error message
		if (!backendConnection) {
			setIsError({ ...isError, error: { ...isError.error, status: true } });
			console.log("submit error");
		}

		//if  email is found in db, return sucess message
		if (backendConnection) {
			setIsError({ ...isError, sucess: { ...isError.sucess, status: true } });
			console.log("submit sucess");
		}
	};
	return (
		<LayoutModal show={show} cb={cb}>
			<Typography
				variant="body1"
				sx={{
					textAlign: "left",
					fontSize: "1.25rem",
					fontWeight: "400",
					width: "100%",
				}}
			>
				{!isError.sucess.status ? t("recoverPassword") : t("emailValidation")}
			</Typography>
			{/* conditional rendering upon sucessfull validation */}
			{!isError.sucess.status ? (
				<>
					<Box sx={{ width: "100%", display: "flex", position: "relative" }}>
						<TextField
							variant="filled"
							value={email.email}
							id="email"
							label="email"
							onChange={(e) => setEmail({ email: e.target.value })}
							fullWidth
							error={isError.invalid.status || isError.error.status}
							inputRef={emailRef}
							helperText={
								(isError.error.status && isError.error.msg) ||
								(isError.invalid.status && isError.invalid.msg)
							}
							sx={{
								backgroundColor: "secondary.light",
							}}
						/>
						{/* icone para limpar input */}
						{email.email.length > 0 && !isError.invalid.status && (
							<HighlightOff
								onClick={() => {
									setEmail({ email: "" });
									setIsError(errorSucessMessageDefault);
									emailRef.current?.focus();
								}}
								sx={{
									color: "action.active",
									position: "absolute",
									top: "50%",
									transform: "translateY(-50%)",
									right: "1rem",
									cursor: "pointer",
								}}
							/>
						)}
						{/* icone de erro, com funcionalidade para limpar input */}
						{isError.invalid.status && (
							<Error
								onClick={() => {
									setEmail({ email: "" });
									setIsError(errorSucessMessageDefault);
									emailRef.current?.focus();
								}}
								sx={{
									color: "error.main",
									position: "absolute",
									top: "50%",
									transform: "translateY(-50%)",
									right: "1rem",
									cursor: "pointer",
								}}
							/>
						)}
					</Box>
					<Btn01 isDisable={isDisable} cb={handleSubmit} text={t("confirm")} />
				</>
			) : (
				<Typography
					variant="body1"
					sx={{
						textAlign: "left",
						fontSize: "1rem",
						fontWeight: "400",
						width: "100%",
					}}
				>
					{t("emailFound")}
				</Typography>
			)}
		</LayoutModal>
	);
};
