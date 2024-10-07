import { FORM_ACCESS_KEY } from "$env/static/private";


export const actions = {
	default: async ({ cookies, request }) => {

		const formData = await request.formData();

		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			phone: formData.get("phone"),
			subject: "Contact Form Submission",
			honeypot: "",
			message: formData.get("message"),
			replyTo: "@",
			accessKey: FORM_ACCESS_KEY,
		};

		fetch("https://api.staticforms.xyz/submit", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					alert("Message sent successfully!");
				} else {
					alert("Message failed to send.");
				}
			})
			.catch((error) => {
				alert(error);
			});

	}
}
