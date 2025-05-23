export const sendOk = (res, data) => {
	res.status(200).json(
		{
			'data': data,
		}
	);
};

export const sendNotFound = (res, message) => {
	res.status(404).json(
		{
			'error': message,
		}
	);
};

export const sendBadRequest = (res, message) => {
	res.status(400).json(
		{
			'error': message,
		}
	);
};

export const sendUnauthorized = (res, message) => {
	res.status(401).json(
		{
			'error': message,
		}
	);
};

export function sendMethodNotAllowed(res, message = "Method Not Allowed") {
  return res.status(405).json({ message });
}