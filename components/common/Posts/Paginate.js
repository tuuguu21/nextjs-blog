import Link from "next/link";
const Paginate = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalPosts / postPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <nav
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px flex items-center justify-between"
        aria-label="Pagination"
      >
        {pageNumbers.map((number) => (
          <Link href="#">
            <a
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50"
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Paginate;
