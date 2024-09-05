import './App.css';
import CustomSelect from './components/CustomSelect';
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
};

const handleChangeSelect = (e: any) => {
  console.log(e)
}

const SelectedIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6667 5L7.50001 14.1667L3.33334 10" stroke="#7F56D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: Infinity,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="App">
      <div>
        <CustomSelect options={data} bindLabel='title' bindValue='id' placeHolder='placeholder' filter prefixIcon={<SelectedIcon />} onChange={(e) => handleChangeSelect(e)} />
      </div>
      <div style={{ marginTop: '25px' }}>
        <CustomSelect options={data} bindLabel='title' bindValue='id' placeHolder='placeholder' multiple filter selectedIcon={<SelectedIcon />} onChange={(e) => handleChangeSelect(e)} />

      </div>
    </div>
  );
}

export default App;
