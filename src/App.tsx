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

const PrefixIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill='#7F56D9' d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z" />
    </svg>
  )
}

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12"><h2>Default</h2></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Default'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Filter'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              filter
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Disabled'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              disabled
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Selected icon'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              selectedIcon={<SelectedIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12"><h2>Default has prefix icon</h2></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Default'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Filter'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              filter
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Disabled'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              disabled
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Selected icon'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              selectedIcon={<SelectedIcon />}
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12"><h2>Multiple </h2></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Default'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Filter'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              filter
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Disabled'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              disabled
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Selected icon'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              selectedIcon={<SelectedIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12"><h2>Multiple has prefix icon</h2></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Default'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Filter'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              filter
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Disabled'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              disabled
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-100">
            <CustomSelect
              label='Selected icon'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              multiple
              placeHolder='Select a post'
              selectedIcon={<SelectedIcon />}
              prefixIcon={<PrefixIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12"><h2>Sort</h2></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
            <CustomSelect
              label='Default'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
            <CustomSelect
              label='Sort asc'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              sorting={{ sortKey: 'title', sortType: 'asc' }}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
          <CustomSelect
              label='Sort desc'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              sorting={{ sortKey: 'title', sortType: 'desc' }}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

        </div>

        <div className="row">
          <div className="col-12"><h2>Label text ellipsis</h2></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
            <CustomSelect
              label='Default'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
            <CustomSelect
              label='Ellipsis'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              ellipsisLabel
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
          <CustomSelect
              label='Multiple Ellipsis'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              ellipsisLabel
              multiple
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

        </div>

        <div className="row">
          <div className="col-12"><h2>Label text ellipsis with selected icon</h2></div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
            <CustomSelect
              label='Default'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              selectedIcon={<SelectedIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
            <CustomSelect
              label='Ellipsis'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              ellipsisLabel
              selectedIcon={<SelectedIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-100">
          <CustomSelect
              label='Multiple Ellipsis'
              hint='This is a hint text to help user.'
              options={data}
              bindLabel='title'
              bindValue='id'
              placeHolder='Select a post'
              ellipsisLabel
              multiple
              selectedIcon={<SelectedIcon />}
              onChange={(e) => handleChangeSelect(e)}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
