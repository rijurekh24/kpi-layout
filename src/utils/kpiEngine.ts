export async function fetchData(api: string): Promise<any> {
  const res = await fetch(api);
  if (!res.ok) throw new Error(`Failed to fetch ${api}`);
  return res.json();
}

export function evaluateCalculation(data: any, expression: string): any {
  try {
    return new Function("data", `return ${expression}`)(data);
  } catch (err) {
    console.error("Eval error:", err);
    return "Error";
  }
}
