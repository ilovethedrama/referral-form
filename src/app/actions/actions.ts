'use server'

export const handleLeSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/testing", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      await response.json();
    } catch (errorMessage: any) {
      console.log(errorMessage);
    }
  };
