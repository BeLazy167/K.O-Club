"use server";
//not using this 
export async function handleAction(formData: FormData) {
  const data = {
    username: formData.get("username"),
  };
  const response = await fetch("/api/username", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
}
