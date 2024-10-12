export default function SearchBar() {
  return (
    <div className=" flex flex-col sm:flex-row items-center p-2">
      <input
        type="text"
        placeholder="Pesquisar..."
        className=" text-gray-900 border border-gray-300 dark:border-gray-700 rounded p-2 dark:bg-gray-800 dark:text-white w-full sm:w-auto"
      />
      <button className="mt-2 sm:mt-0 sm:ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full sm:w-auto">
        Buscar
      </button>
    </div>
  );
}
