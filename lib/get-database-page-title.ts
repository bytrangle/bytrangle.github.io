export default function getDatabasePageTitle(page: any) {
  const title = page["properties"]["Name"]["title"][0]["plain_text"]
  return title || ""
}