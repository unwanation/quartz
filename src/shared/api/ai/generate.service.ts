import useServerStore from "@/app/stores/server.store";

export default async function generateBlocks(prompt: string) {
  useServerStore.setState({ state: "generating" });

  const response = await fetch(
    `http://localhost:8080/api/ai/parse?prompt=${prompt}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  const data = await response.json();

  useServerStore.setState({ state: "idle" });

  return await data;
}
