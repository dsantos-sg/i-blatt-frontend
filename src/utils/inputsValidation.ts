import { RegisterProps } from "../interfaces/generic";

export const inputsValidation = (validation: RegisterProps) => {
	let count = 0;

	const validationResult = {
		userName: true,
		email: true,
		password: true,
		passwordConfirm: true,
		nativeLanguage: true,
	};

	if (validation?.userName?.length < 3) validationResult.userName = false;

	if (validation?.password?.length < 5) {
		validationResult.password = false;
	} else {
		count += /[a-z]/.test(validation?.password) ? 1 : 0;
		count += /[A-Z]/.test(validation?.password) ? 1 : 0;
		count += /\d/.test(validation?.password) ? 1 : 0;
		count += /[^A-Za-z0-9]/.test(validation?.password) ? 1 : 0;
		if (count < 4) {
			validationResult.password = false;
		}
	}

	if (!validation?.email?.includes("@") || !validation?.email?.includes(".")) {
		validationResult.email = false;
	}

	if (
		validation?.passwordConfirm?.length !== validation?.password?.length ||
		!validation?.password?.includes(validation?.passwordConfirm)
	) {
		validationResult.passwordConfirm = false;
	}
	if (validation?.nativeLanguage?.length < 1)
		validationResult.nativeLanguage = false;

	console.log(validationResult);
	return validationResult;
};
