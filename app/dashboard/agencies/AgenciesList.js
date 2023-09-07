import AgenciesTable from "./AgenciesTable";

async function getAgencies() {
  const res = await fetch(`${process.env.BASEURL}Agency/GetAllAgencies`);

  return res.json();
}

export default async function AgenciesList() {
  const agencies = await getAgencies();
  const agenciesData = agencies.data;
  // console.log(agencies.data);
  return <AgenciesTable agencies={agenciesData} data={agencies} />;
}
